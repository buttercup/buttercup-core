const AsyncEventEmitter = require("./events/AsyncEventEmitter.js");
const Westley = require("./Westley.js");
const Inigo = require("./InigoGenerator.js");
const Flattener = require("./Flattener.js");
const Group = require("./Group.js");
const Entry = require("./Entry.js");
const GroupCollectionDecorator = require("./decorators/GroupCollection.js");
const EntryCollectionDecorator = require("./decorators/EntryCollection.js");
const ArchiveComparator = require("./ArchiveComparator.js");

const signing = require("./tools/signing.js");
const rawSearching = require("./tools/searching-raw.js");
const encoding = require("./tools/encoding.js");

/**
 * Buttercup Archive
 * @class Archive
 * @mixes GroupCollection
 * @mixes EntryCollection
 */
class Archive extends AsyncEventEmitter {
    constructor() {
        super();
        // create Westley instance
        this._westley = new Westley();
        this._westley.on("commandExecuted", () => {
            this.emit("archiveUpdated");
        });
        // comment created date
        var date = new Date(),
            ts = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        this._getWestley().execute(
            Inigo.create(Inigo.Command.Comment)
                .addArgument("Buttercup archive created (" + ts + ")")
                .generateCommand()
        );
        // set format
        this._getWestley().execute(
            Inigo.create(Inigo.Command.Format)
                .addArgument(signing.getFormat())
                .generateCommand()
        );
        // set ID
        this._generateID();
        // shared groups
        this._sharedGroups = [];
        // add group searching
        GroupCollectionDecorator.decorate(this);
        // add entry searching
        EntryCollectionDecorator.decorate(this);
    }

    /**
     * Whether the archive is read only or not
     * @property {Boolean} readOnly
     * @memberof Archive
     * @instance
     * @readonly
     */
    get readOnly() {
        return this._getWestley().readOnly;
    }

    set readOnly(ro) {
        // eslint-disable-line
        throw new Error("readOnly is read-only");
    }

    /**
     * An array of shared groups
     * @property {Array.<Group>} sharedGroups
     * @instance
     */
    get sharedGroups() {
        return this._sharedGroups;
    }

    /**
     * Get the instance type
     * @type {String}
     */
    get type() {
        return "Archive";
    }

    /**
     * Create a new group
     * @param {string=} title The title for the group
     * @returns {Group} The newly created group
     * @memberof Archive
     */
    createGroup(title) {
        var group = Group.createNew(this);
        if (title) {
            group.setTitle(title);
        }
        return group;
    }

    /**
     * Delete an attribute
     * @param {String} attributeName The name of the attribute to delete
     * @returns {Archive} Self
     */
    deleteAttribute(attributeName) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteArchiveAttribute)
                .addArgument(attributeName)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Clear the shared groups array
     * @returns {Archive} Self
     */
    discardSharedGroups() {
        this._sharedGroups = [];
        return this;
    }

    /**
     * Remove all entries and groups from the trash (permanent)
     * @throws {Error} Throws if there is no trash group
     */
    emptyTrash() {
        let trash = this.getTrashGroup();
        if (!trash) {
            throw new Error("No trash group found");
        }
        trash.getGroups().forEach(function(group) {
            group.delete(/* skip trash */ true);
        });
        trash.getEntries().forEach(function(entry) {
            entry.delete();
        });
    }

    /**
     * Check if the archive is equal to another (by ID)
     * @param {Archive} archive Another archive instance
     * @returns {Boolean} True if they are equal
     * @memberof Archive;
     */
    equals(archive) {
        let thisID = this.getID(),
            remoteID = archive.getID();
        return thisID === remoteID;
    }

    /**
     * Get the value of an attribute
     * @param {String} attributeName The attribute to get
     * @returns {undefined|String} The value of the attribute or undefined if not set
     * @memberof Archive
     */
    getAttribute(attributeName) {
        const dataset = this._getWestley().getDataset();
        if (dataset.attributes && dataset.attributes.hasOwnProperty(attributeName)) {
            return dataset.attributes[attributeName];
        }
        return undefined;
    }

    /**
     * Get all attributes
     * @returns {Object} Attributes object
     */
    getAttributes() {
        const dataset = this._getWestley().getDataset();
        return Object.assign({}, dataset.attributes || {});
    }

    /**
     * Find an entry by its ID
     * @param {String} entryID The entry's ID
     * @returns {Entry|null} The found entry or null
     * @memberof Archive
     */
    getEntryByID(entryID) {
        var westley = this._getWestley(),
            entryRaw = rawSearching.findEntryByID(westley.getDataset().groups, entryID);
        return entryRaw === null ? null : new Entry(this, entryRaw);
    }

    /**
     * Get the archive format
     * @returns {string} The format of the archive
     * @memberof Archive
     */
    getFormat() {
        return this._getWestley().getDataset().format;
    }

    /**
     * Find a group by its ID
     * @param {String} groupID The group's ID
     * @returns {Group|null} The group with the provided ID
     * @memberof Archive
     * @deprecated To be removed
     * @see findGroupByID
     */
    getGroupByID(groupID) {
        var westley = this._getWestley(),
            groupRaw = rawSearching.findGroupByID(westley.getDataset().groups, groupID);
        return groupRaw === null ? null : new Group(this, groupRaw);
    }

    /**
     * Get all groups (root) in the archive
     * @returns {Group[]} An array of Groups
     * @memberof Archive
     */
    getGroups() {
        var archive = this,
            westley = this._getWestley();
        return (westley.getDataset().groups || [])
            .map(function(rawGroup) {
                return new Group(archive, rawGroup);
            })
            .concat(this.sharedGroups);
    }

    /**
     * Get the command array (history)
     * Returned object can be quite large.
     * @returns {Array.<String>} The command array
     */
    getHistory() {
        let history = this._getWestley().getHistory();
        return [].concat(history);
    }

    /**
     * Get the archive ID
     * @returns {String} The ID or an empty string if not set
     */
    getID() {
        return this._getWestley().getDataset().archiveID || "";
    }

    /**
     * Get the trash group
     * @returns {Group|null} The trash group if found, null otherwise
     * @memberof Archive
     */
    getTrashGroup() {
        var groups = this.getGroups();
        for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
            if (groups[i].isTrash()) {
                return groups[i];
            }
        }
        return null;
    }

    /**
     * Perform archive optimisations
     * @memberof Archive
     * @returns {Archive} Self
     */
    optimise() {
        var flattener = new Flattener(this._getWestley());
        if (flattener.canBeFlattened()) {
            flattener.flatten();
        }
        return this;
    }

    /**
     * Set an attribute on the archive
     * @param {String} attributeName The attribute to set
     * @param {String} value The value to set for the attribute
     * @returns {Archive} Self
     */
    setAttribute(attributeName, value) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetArchiveAttribute)
                .addArgument(attributeName)
                .addArgument(value)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Convert the archive to an object
     * @param {Number} groupOutputFlags Bitwise flags for `Group.toObject`
     * @returns {Object} The archive in object form
     * @see Group.toObject
     */
    toObject(groupOutputFlags) {
        return {
            archiveID: this.getID(),
            format: this.getFormat(),
            attributes: this.getAttributes(),
            groups: this.getGroups().map(group => group.toObject(groupOutputFlags))
        };
    }

    /**
     * Generate an archive ID
     * @protected
     * @memberof Archive
     */
    _generateID() {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.ArchiveID)
                .addArgument(encoding.getUniqueID())
                .generateCommand(),
            false // prepend to history
        );
    }

    /**
     * Get the underlying Westley instance
     * @protected
     * @returns {Westley} The Westley instance
     * @memberof Archive
     */
    _getWestley() {
        return this._westley;
    }
}

/**
 * Create a new archive instance from a list of commands (history)
 * @param {Array.<String>} history The command list
 * @returns {Archive} The archive instance
 * @static
 * @memberof Archive
 */
Archive.createFromHistory = function(history) {
    var archive = new Archive(),
        westley = archive._getWestley();
    westley.clear();
    history.forEach(westley.execute.bind(westley));
    if (archive.getID() === "") {
        // generate a new ID
        archive._generateID();
    }
    return archive;
};

/**
 * Create an Archive with the default template
 * @returns {Archive} The new archive
 * @memberof Archive
 * @static
 */
Archive.createWithDefaults = function() {
    var archive = new Archive(),
        generalGroup = archive.createGroup("General"),
        trashGroup = archive.createGroup("Trash").setAttribute(Group.Attributes.Role, "trash");
    return archive;
};

module.exports = Archive;
