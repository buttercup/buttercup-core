const { getQueue } = require("./Queue.js");
const Archive = require("./Archive.js");
const Comparator = require("./ArchiveComparator.js");

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
 * Strip destructive commands from a history collection
 * @param {Array.<String>} history The history
 * @returns {Array.<String>} The history minus any destructive commands
 * @private
 * @static
 * @memberof Workspace
 */
function stripDestructiveCommands(history) {
    const destructiveSlugs = Object.keys(Inigo.Command)
        .map(key => Inigo.Command[key])
        .filter(command => command.d)
        .map(command => command.s);
    return history.filter(function(command) {
        return destructiveSlugs.indexOf(getCommandType(command)) < 0;
    });
}

class Workspace {
    constructor() {
        this._archive = null;
        this._datasource = null;
        this._masterCredentials = null;
    }

    /**
     * The archive instance
     * @type {Archive}
     * @memberof Workspace
     */
    get archive() {
        return this._archive;
    }

    /**
     * The datasource instance for the archive
     * @type {TextDatasource}
     * @memberof Workspace
     */
    get datasource() {
        return this._datasource;
    }

    /**
     * The master credentials for the archive
     * @type {Credentials}
     * @memberof Workspace
     */
    get masterCredentials() {
        return this._masterCredentials;
    }

    /**
     * The save channel for queuing save actions
     * @type {Channel}
     * @memberof Workspace
     */
    get saveChannel() {
        const topicID = this.archive.getID();
        return getQueue().channel(`workspace:${topicID}`);
    }

    /**
     * Detect whether the local archives (in memory) differ from their remote copies
     * Fetches the remote copies from their datasources and detects differences between
     * them and their local counterparts. Does not change/update the local items.
     * @returns {Promise.<Boolean>} A promise that resolves with a boolean - true if
     *      there are differences, false if there is not
     * @memberof Workspace
     */
    localDiffersFromRemote() {
        return this.datasource
            .load(this.masterCredentials)
            .then(history => Archive.createFromHistory(history))
            .then(function(loadedItem) {
                const comparator = new Comparator(this.archive, loadedItem);
                return comparator.archivesDiffer();
            });
    }

    /**
     * Merge remote contents
     * Detects differences between a local and a remote item, and merges the
     * two copies together.
     * @returns {Promise.<Archive>} A promise that resolves with the newly merged archive -
     *      This archive is automatically saved over the original local copy.
     * @memberof Workspace
     */
    mergeFromRemote() {
        return this.datasource.load(this.masterCredentials).then(function(stagedArchive) {
            const comparator = new Comparator(this.archive, stagedArchive);
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
            base.concat(newHistoryStaged)
                .concat(newHistoryMain)
                .forEach(function(command) {
                    newArchive._getWestley().execute(command);
                });
            this._archive = newArchive;
            return newArchive;
        });
    }

    /**
     * Save the archive to the remote
     * @returns {Promise} A promise that resolves when saving has completed
     * @memberof Workspace
     */
    save() {
        return this.saveChannel.enqueue(
            () => this.datasource.save(this.archive.getHistory(), this.masterCredentials),
            /* priority */ undefined,
            /* stack */ "saving"
        );
    }

    /**
     * Set the archive and its accompanying data on the workspace
     * @param {Archive} archive The archive instance
     * @param {TextDatasource} datasource The datasource for the archive
     * @param {*} masterCredentials The master credentials for the archive
     * @memberof Workspace
     */
    setArchive(archive, datasource, masterCredentials) {
        this._archive = archive;
        this._datasource = datasource;
        this._masterCredentials = masterCredentials;
    }

    /**
     * Update the master password of the archive
     * @param {Credentials} masterCredentials The new credentials
     * @memberof Workspace
     */
    updatePrimaryCredentials(masterCredentials) {
        this._masterCredentials = masterCredentials;
    }
}

module.exports = Workspace;
