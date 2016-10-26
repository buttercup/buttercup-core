"use strict";

var Westley = require("./Westley.js"),
    Inigo = require("./InigoGenerator.js"),
    Flattener = require("./Flattener.js"),
    Group = require("./Group.js"),
    Entry = require("./Entry.js");

var signing = require("../tools/signing.js"),
    rawSearching = require("../tools/searching-raw.js"),
    instanceSearching = require("../tools/searching-instance.js");

/**
 * Find entries by searching properties/meta
 * @param {Archive} archive
 * @param {string} check Information to check (property/meta)
 * @param {string} key The key (property/meta-value) to search with
 * @param {RegExp|string} value The value to search for
 * @returns {Array.<Entry>} An array of found entries
 * @private
 * @static
 * @memberof Archive
 */
function findEntriesByCheck(archive, check, key, value) {
    return instanceSearching.findEntriesByCheck(
        archive.getGroups(),
        function(entry) {
            var itemValue = (check === "property") ?
                entry.getProperty(key) || "" :
                entry.getMeta(key) || "";
            if (value instanceof RegExp) {
                return value.test(itemValue);
            } else {
                return itemValue.indexOf(value) >= 0;
            }
        }
    );
}

/**
 * Buttercup Archive
 * @class Archive
 */
class Archive {

    constructor() {
        var date = new Date(),
            ts = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        this._westley = new Westley();
        this._getWestley().execute(
            Inigo.create(Inigo.Command.Comment)
                .addArgument('Buttercup archive created (' + ts + ')')
                .generateCommand()
        );
        this._getWestley().execute(
            Inigo.create(Inigo.Command.Format)
                .addArgument(signing.getFormat())
                .generateCommand()
        );
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
     * Find entries that match a certain meta property
     * @param {string} metaName The meta property to search for
     * @param {RegExp|string} value The value to search for
     * @returns {Array.<Entry>} An array of found entries
     * @memberof Archive
     */
    findEntriesByMeta(metaName, value) {
        return findEntriesByCheck(this, "meta", metaName, value);
    }

    /**
     * Find all entries that match a certain property
     * @param {string} property The property to search with
     * @param {RegExp|string} value The value to search for
     * @returns {Array.<Entry>} An array of found extries
     * @memberof Archive
     */
    findEntriesByProperty(property, value) {
        return findEntriesByCheck(this, "property", property, value);
    }

    /**
     * Find all groups within the archive that match a title
     * @param {RegExp|string} title The title to search for, either a string (contained within
     *  a target group's title) or a RegExp to test against the title.
     * @returns {Array.<Group>} An array of found groups
     * @memberof Archive
     */
    findGroupsByTitle(title) {
        return instanceSearching.findGroupsByCheck(
            this.getGroups(),
            function(group) {
                if (title instanceof RegExp) {
                    return title.test(group.getTitle());
                } else {
                    return group.getTitle().indexOf(title) >= 0;
                }
            }
        );
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
        return (westley.getDataset().groups || []).map(function(rawGroup) {
            return new Group(archive, rawGroup);
        });
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
