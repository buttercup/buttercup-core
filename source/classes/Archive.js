"use strict";

var Westley = require("./Westley.js"),
    Inigo = require("./InigoGenerator.js"),
    Flattener = require("./Flattener.js"),
    Group = require("./Group.js"),
    Entry = require("./Entry.js"),
    GroupCollectionDecorator = require("../decorators/GroupCollection.js"),
    EntryCollectionDecorator = require("../decorators/EntryCollection.js");

var signing = require("../tools/signing.js"),
    rawSearching = require("../tools/searching-raw.js");

/**
 * Buttercup Archive
 * @class Archive
 * @mixes GroupCollection
 * @mixes EntryCollection
 */
class Archive {

    constructor() {
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
     * Get the value of an attribute
     * @param {String} attributeName The attribute to get
     * @returns {undefined|String} The value of the attribute or undefined if not set
     * @memberof Archive
     */
    getAttribute(attributeName) {
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
        var archive = this,
            westley = this._getWestley();
        return (westley.getDataset().groups || [])
            .map(function(rawGroup) {
                return new Group(archive, rawGroup);
            })
            .concat(this.sharedGroups);
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
 * Create an Archive with the default template
 * @returns {Archive} The new archive
 * @memberof Archive
 * @static
 */
Archive.createWithDefaults = function() {
    var archive = new Archive(),
        generalGroup = archive.createGroup("General"),
        trashGroup = archive
            .createGroup("Trash")
                .setAttribute(Group.Attributes.Role, "trash");
    return archive;
};

module.exports = Archive;
