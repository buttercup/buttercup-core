const Archive = require("./Archive.js");
const Inigo = require("./InigoGenerator.js");
const Comparator = require("./ArchiveComparator.js");
const { getQueue } = require("./Queue.js");

/**
 * Extract the command portion of a history item
 * @returns {String} The valid command or an empty string if invalid
 * @param {String} fullCommand The command to process
 * @private
 * @static
 * @memberof Workspace
 */
function getCommandType(fullCommand) {
    return fullCommand && fullCommand.length >= 3 ? fullCommand.substr(0, 3) : "";
}

/**
 * Shared workspace item
 * @typedef {Object} WorkspaceItem
 * @property {Archive} archive - An archive instance
 * @property {String} password - The master password
 * @property {TextDatasource} datasource - A datasource instance
 */

/**
 * Check if an item is writeable
 * @param {WorkspaceItem} item The item to check
 * @returns {Boolean} True if the item is writeable
 * @private
 * @static
 * @memberof Workspace
 */
function itemIsWriteable(item) {
    return item && item.saveable && item.archive && item.archive.readOnly === false;
}

/**
 * Strip destructive commands from a history collection
 * @param {Array.<String>} history The history
 * @returns {Array.<String>} The history minus any destructive commands
 * @private
 * @static
 * @memberof Workspace
 */
function stripDestructiveCommands(history) {
    let destructiveSlugs = Object.keys(Inigo.Command)
        .map(key => Inigo.Command[key])
        .filter(command => command.d)
        .map(command => command.s);
    return history.filter(function(command) {
        return destructiveSlugs.indexOf(getCommandType(command)) < 0;
    });
}

/**
 * Workspace
 * @class Workspace
 */
class Workspace {
    constructor() {
        this._archives = [];
    }

    get isSaving() {
        try {
            const saveChannel = this.saveChannel;
            return saveChannel.isRunning;
        } catch (err) {
            return false;
        }
    }

    /**
     * The primary archive item
     * @type {WorkspaceItem}
     * @memberof Workspace
     * @instance
     * @public
     * @name primary
     */
    get primary() {
        return this._archives[0] ? this._archives[0] : null;
    }

    get saveChannel() {
        const topicID = this.primary.archive.getID();
        return getQueue().channel(`workspace:${topicID}`);
    }

    /**
     * Add a shared archive item
     * @param {Archive} archive The archive instance
     * @param {TextDatasource} datasource The datasource instance
     * @param {Credentials} masterCredentials The master credentials (password)
     * @param {Boolean=} saveable Whether the archive is remotely saveable or not (default: true)
     * @returns {Workspace} Self
     */
    addSharedArchive(archive, datasource, masterCredentials, saveable) {
        saveable = saveable === undefined ? true : saveable;
        if (this._archives.length <= 0) {
            this._archives[0] = null;
        }
        this._archives.push({
            archive: archive,
            datasource: datasource,
            credentials: masterCredentials,
            saveable: saveable
        });
        return this;
    }

    /**
     * Get all archive items
     * @returns {Array.<WorkspaceItem>} All of the items
     */
    getAllItems() {
        return [].concat(this._archives);
    }

    /**
     * Get all the saveable items
     * @returns {Array.<WorkspaceItem>} All of the saveable items
     */
    getSaveableItems() {
        return this._archives.filter(function(item) {
            return item && item.saveable;
        });
    }

    /**
     * Imbue the primary archive with shared groups from all of the other archives
     * @throws {Error} Throws if the primary archive is not set
     * @returns {Workspace} Self
     */
    imbue() {
        let items = this.getAllItems(),
            // take the primary off the front
            primary = items.shift();
        if (!primary) {
            throw new Error("No primary archive");
        }
        const primaryArchive = primary.archive;
        // clear first
        primaryArchive.discardSharedGroups();
        items.forEach(function(item) {
            item.archive
                .getGroups()
                .filter(group => group.isShared())
                .forEach(function(group) {
                    // mark as foreign
                    group._getRemoteObject()._foreign = true;
                    // add each shared group
                    primaryArchive.sharedGroups.push(group);
                });
        });
        return this;
    }

    /**
     * Detect whether the local archives (in memory) differ from their remote copies
     * Fetches the remote copies from their datasources and detects differences between
     * them and their local counterparts. Does not change/update the local items.
     * @returns {Promise.<Boolean>} A promise that resolves with a boolean - true if
     *      there are differences, false if there is not
     */
    localDiffersFromRemote() {
        return Promise.all(
            this.getSaveableItems().map(function(item) {
                return item.datasource.load(item.credentials).then(function(loadedItem) {
                    var comparator = new Comparator(item.archive, loadedItem);
                    return comparator.archivesDiffer();
                });
            })
        ).then(function(differences) {
            return differences.some(differs => differs);
        });
    }

    /**
     * Merge an item from its remote counterpart
     * Detects differences between a local and a remote item, and merges the
     * two copies together.
     * @param {WorkspaceItem} item The local item
     * @returns {Promise.<Archive>} A promise that resolves with the newly merged archive -
     *      This archive is automatically saved over the original local copy.
     */
    mergeItemFromRemote(item) {
        if (!itemIsWriteable(item)) {
            throw new Error("Archive not writeable");
        }
        return item.datasource.load(item.credentials).then(function(stagedArchive) {
            const comparator = new Comparator(item.archive, stagedArchive);
            const differences = comparator.calculateDifferences();
            // only strip if there are multiple updates
            const stripDestructive = differences.secondary.length > 0;
            const newHistoryMain = stripDestructive
                ? stripDestructiveCommands(differences.original)
                : differences.original;
            const newHistoryStaged = stripDestructive
                ? stripDestructiveCommands(differences.secondary)
                : differences.secondary;
            const base = differences.common;
            const newArchive = new Archive();
            newArchive._getWestley().clear();
            // merge all history and execute on new archive
            base
                .concat(newHistoryStaged)
                .concat(newHistoryMain)
                .forEach(function(command) {
                    newArchive._getWestley().execute(command);
                });
            item.archive = newArchive;
            return newArchive;
        });
    }

    /**
     * Merge all saveable remote copies into their local counterparts
     * @see mergeItemFromRemote
     * @see embue
     * @returns {Promise.<Archive[]>} A promise that resolves with an array of merged Archives
     */
    mergeSaveablesFromRemote() {
        return Promise.all(
            this.getSaveableItems().map(item => {
                return this.mergeItemFromRemote(item);
            })
        ).then(archives => {
            this.imbue();
            return archives;
        });
    }

    /**
     * Save all saveable archives to their remotes
     * @returns {Promise} A promise that resolves when all saveable archives have been saved
     */
    save() {
        return this.saveChannel.enqueue(
            () =>
                Promise.all(
                    this.getSaveableItems().map(function(item) {
                        return item.datasource.save(item.archive, item.credentials);
                    })
                ),
            /* priority */ undefined,
            /* stack */ "saving"
        );
    }

    /**
     * Set the primary archive
     * @param {Archive} archive The Archive instance
     * @param {TextDatasource} datasource The datasource instance
     * @param {Credentials} masterCredentials The master password
     * @returns {Workspace} Self
     */
    setPrimaryArchive(archive, datasource, masterCredentials) {
        this._archives[0] = {
            archive: archive,
            datasource: datasource,
            credentials: masterCredentials,
            saveable: true
        };
        return this;
    }
}

module.exports = Workspace;
