(function(module) {

    "use strict";

    var Westley = require("__buttercup/classes/Westley.js"),
        Inigo = require("__buttercup/classes/InigoGenerator.js"),
        Flattener = require("__buttercup/classes/Flattener.js"),
        ManagedGroup = require("__buttercup/classes/ManagedGroup.js"),
        ManagedEntry = require("__buttercup/classes/ManagedEntry.js");

    var signing = require("__buttercup/tools/signing.js"),
        rawSearching = require("__buttercup/tools/searching-raw.js"),
        instanceSearching = require("__buttercup/tools/searching-instance.js");

    /**
     * The base Buttercup Archive class
     * @class Archive
     */
    var Archive = function() {
        this._westley = new Westley();
        this._getWestley().execute(
            Inigo.create(Inigo.Command.Comment)
                .addArgument('Buttercup archive created (todo: date)')
                .generateCommand()
        );
        this._getWestley().execute(
            Inigo.create(Inigo.Command.Format)
                .addArgument(signing.getFormat())
                .generateCommand()
        );
    };

    /**
     * Create a new group
     * @param {string=} title The title for the group
     * @returns {ManagedGroup}
     * @memberof Archive
     */
    Archive.prototype.createGroup = function(title) {
        var managedGroup = ManagedGroup.createNew(this);
        if (title) {
            managedGroup.setTitle(title);
        }
        return managedGroup;
    };

    /**
     * Find all entries that match a certain property
     * @param {string} property The property to search with
     * @param {RegExp|string} value The value to search for
     * @returns {Array.<ManagedEntry>}
     * @memberof Archive
     */
    Archive.prototype.findEntriesByProperty = function(property, value) {
        return instanceSearching.findEntriesByCheck(
            this.getGroups(),
            function(entry) {
                var propValue = entry.getProperty(property) || "";
                if (value instanceof RegExp) {
                    return value.test(propValue);
                } else {
                    return propValue.indexOf(value) >= 0;
                }
            }
        );
    };

    /**
     * Find all groups within the archive that match a title
     * @param {RegExp|string} title The title to search for, either a string (contained within
     *  a target group's title) or a RegExp to test against the title.
     * @returns {Array.<managedGroup>}
     * @memberof Archive
     */
    Archive.prototype.findGroupsByTitle = function(title) {
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
    };

    /**
     * Find an entry by its ID
     * @param {String} The entry's ID
     * @returns {ManagedEntry|null}
     * @memberof Archive
     */
    Archive.prototype.getEntryByID = function(entryID) {
        var westley = this._getWestley();
        var entryRaw = rawSearching.findEntryByID(westley.getDataset().groups, entryID);
        return (entryRaw === null) ? null : new ManagedEntry(this, entryRaw);
    };

    /**
     * Find a group by its ID
     * @param {String} The group's ID
     * @returns {ManagedGroup|null}
     * @memberof Archive
     */
    Archive.prototype.getGroupByID = function(groupID) {
        var westley = this._getWestley();
        var groupRaw = rawSearching.findGroupByID(westley.getDataset().groups, groupID);
        return (groupRaw === null) ? null : new ManagedGroup(this, groupRaw);
    };

    /**
     * Whether or not this archive has a group with the given title.
     * @param {String} The group's title
     * @returns {true|false}
     */
    Archive.prototype.containsGroupWithTitle = function(groupTitle) {
        var westley = this._getWestley();
        var groupRaw = rawSearching.findGroupByTitle(westley.getDataset().groups, groupTitle);
        return (groupRaw === null) ? false : true;
    };

    /**
     * Get all groups (root) in the archive
     * @returns {ManagedGroups[]} An array of ManagedGroups
     * @memberof Archive
     */
    Archive.prototype.getGroups = function() {
        var archive = this,
            westley = this._getWestley();
        return (westley.getDataset().groups || []).map(function(rawGroup) {
            return new ManagedGroup(archive, rawGroup);
        });
    };

    /**
     * Get the trash group
     * @returns {ManagedGroup|null}
     * @memberof Archive
     */
    Archive.prototype.getTrashGroup = function() {
        var groups = this.getGroups();
        for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
            if (groups[i].isTrash()) {
                return groups[i];
            }
        }
        return null;
    };

    /**
     * Perform archive optimisations
     * @memberof Archive
     */
    Archive.prototype.optimise = function() {
        var flattener = new Flattener(this._getWestley());
        if (flattener.canBeFlattened()) {
            flattener.flatten();
        }
    };

    /**
     * Get the underlying Westley instance
     * @protected
     * @returns {Westley}
     * @memberof Archive
     */
    Archive.prototype._getWestley = function() {
        return this._westley;
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
            trashGroup = archive
                .createGroup("Trash")
                    .setAttribute(ManagedGroup.Attributes.Role, "trash");
        return archive;
    };

    module.exports = Archive;

})(module);
