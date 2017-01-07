"use strict";

var Westley = require("./Westley.js"),
    Inigo = require("./InigoGenerator.js"),
    Flattener = require("./Flattener.js"),
    Group = require("./Group.js"),
    Entry = require("./Entry.js"),
    GroupCollectionDecorator = require("../decorators/GroupCollection.js"),
    EntryCollectionDecorator = require("../decorators/EntryCollection.js"),
    ArchiveComparator = require("./ArchiveComparator.js");

var signing = require("../tools/signing.js"),
    rawSearching = require("../tools/searching-raw.js"),
    encoding = require("../tools/encoding.js"),
    createDebug = require("../tools/debug.js");

const debug = createDebug("archive");

/**
 * Buttercup Archive
 * @class Archive
 * @mixes GroupCollection
 * @mixes EntryCollection
 */
class Archive {

    constructor() {
        debug("new archive");
        // create Westley instance
        this._westley = new Westley();
        // comment created date
        var date = new Date(),
            ts = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        this._getWestley().execute(
            Inigo.create(Inigo.Command.Comment)
                .addArgument('Buttercup archive created (' + ts + ')')
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

    set readOnly(ro) { // eslint-disable-line
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
     * Create a new group
     * @param {string=} title The title for the group
     * @returns {Group} The newly created group
     * @memberof Archive
     */
    createGroup(title) {
        debug("new group");
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
        debug("delete attribute");
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
        debug("discard shared groups");
        this._sharedGroups = [];
        return this;
    }

    /**
     * Remove all entries and groups from the trash (permanent)
     * @throws {Error} Throws if there is no trash group
     */
    emptyTrash() {
        debug("empty trash");
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
        return (thisID === remoteID);
    }

    /**
     * Get the value of an attribute
     * @param {String} attributeName The attribute to get
     * @returns {undefined|String} The value of the attribute or undefined if not set
     * @memberof Archive
     */
    getAttribute(attributeName) {
        debug("fetch attribute");
        let dataset = this._getWestley().getDataset();
        if (dataset.attributes && dataset.attributes.hasOwnProperty(attributeName)) {
            return dataset.attributes[attributeName];
        }
        return undefined;
    }

    /**
     * Find an entry by its ID
     * @param {String} entryID The entry's ID
     * @returns {Entry|null} The found entry or null
     * @memberof Archive
     */
    getEntryByID(entryID) {
        debug("fetch entry by ID");
        var westley = this._getWestley(),
            entryRaw = rawSearching.findEntryByID(westley.getDataset().groups, entryID);
        return (entryRaw === null) ? null : new Entry(this, entryRaw);
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
        debug("fetch group by ID");
        var westley = this._getWestley(),
            groupRaw = rawSearching.findGroupByID(westley.getDataset().groups, groupID);
        return (groupRaw === null) ? null : new Group(this, groupRaw);
    }

    /**
     * Get all groups (root) in the archive
     * @returns {Group[]} An array of Groups
     * @memberof Archive
     */
    getGroups() {
        debug("get groups");
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
        return [...history];
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
        debug("fetch trash group");
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
        debug("flatten (check)");
        var flattener = new Flattener(this._getWestley());
        if (flattener.canBeFlattened()) {
            debug("flatten (valid)");
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
        debug("set attribute");
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
        debug("to object");
        return {
            archiveID: this.getID(),
            format: this.getFormat(),
            groups: this.getGroups().map(group => group.toObject(groupOutputFlags))
        };
    }

    /**
     * Generate an archive ID
     * @protected
     * @memberof Archive
     */
    _generateID() {
        debug("generate new ID");
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
    debug("create archive (defaults)");
    var archive = new Archive(),
        generalGroup = archive.createGroup("General"),
        trashGroup = archive
            .createGroup("Trash")
                .setAttribute(Group.Attributes.Role, "trash");
    return archive;
};

module.exports = Archive;
