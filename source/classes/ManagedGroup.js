"use strict";

var Inigo = require("./InigoGenerator.js"),
    ManagedEntry = require("./ManagedEntry.js"),
    encoding = require("../tools/encoding.js"),
    searching = require("../tools/searching-raw.js");

class ManagedGroup {

    /**
     * Managed group class
     * @class ManagedGroup
     * @param {Archive} archive The archive instance
     * @param {Object} remoteObj The remote object reference
     */
    constructor(archive, remoteObj) {
        this._archive = archive;
        this._westley = archive._getWestley();
        this._remoteObject = remoteObj;
    }

    /**
     * Create a new entry with a title
     * @param {string=} title
     * @returns {ManagedEntry} The new entry
     * @memberof ManagedGroup
     */
    createEntry(title) {
        var managedEntry = ManagedEntry.createNew(this._getArchive(), this.getID());
        if (title) {
            managedEntry.setProperty("title", title);
        }
        return managedEntry;
    }

    /**
     * Create a child group
     * @param {string=} title Optionally set a title
     * @returns {ManagedGroup} The new child group
     * @memberof ManagedGroup
     */
    createGroup(title) {
        var group = ManagedGroup.createNew(this._getArchive(), this.getID());
        if (title) {
            group.setTitle(title);
        }
        return group;
    }

    /**
     * Delete the group
     * @memberof ManagedGroup
     */
    delete() {
        if (this.isTrash()) {
            throw new Error("Trash group cannot be deleted");
        }
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteGroup)
                .addArgument(this.getID())
                .generateCommand()
        );
        this._getWestley().pad();
        delete this._westley;
        delete this._remoteObject;
    }

    /**
     * Delete an attribute
     * @param {string} attr The name of the attribute
     * @returns {ManagedGroup} Returns self
     * @memberof ManagedGroup
     */
    deleteAttribute(attr) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteGroupAttribute)
                .addArgument(this.getID())
                .addArgument(attr)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Get an attribute
     * @param {string} attributeName The name of the attribute
     * @returns {string|undefined} Returns the attribute or undefined if not found
     * @memberof ManagedGroup
     */
    getAttribute(attributeName) {
        var raw = this._getRemoteObject();
        return raw.attributes && raw.attributes.hasOwnProperty(attributeName) ?
            raw.attributes[attributeName] : undefined;
    }

    /**
     * Get the entries within the group
     * @returns {Array.<ManagedEntry>}
     * @memberof ManagedGroup
     */
    getEntries() {
        var archive = this._getArchive();
        return (this._getRemoteObject().entries || []).map(function(rawEntry) {
            return new ManagedEntry(archive, rawEntry);
        });
    }

    /**
     * Get a child group (deep) by its ID
     * @param {String} groupID The ID of the group to get
     * @returns {ManagedGroup|null} The found group or null
     * @memberof ManagedGroup
     */
    getGroupByID(groupID) {
        let groupRaw = searching
            .findGroupByID((this._getRemoteObject().groups || []), groupID);
        return (groupRaw === null) ? null : new ManagedGroup(this._getArchive(), groupRaw);
    }

    /**
     * Get the groups within the group
     * @returns {Array.<ManagedGroup>} An array of child groups
     * @memberof ManagedGroup
     */
    getGroups() {
        var archive = this._getArchive();
        return (this._getRemoteObject().groups || []).map(function(rawGroup) {
            return new ManagedGroup(archive, rawGroup);
        });
    }

    /**
     * Get the group ID
     * @returns {string} The ID of the group
     * @memberof ManagedGroup
     */
    getID() {
        return this._getRemoteObject().id;
    }

    /**
     * Get the group title
     * @returns {string} The title of the group
     * @memberof ManagedGroup
     */
    getTitle() {
        return this._getRemoteObject().title || "";
    }

    /**
     * Check if the group is in the trash
     * @returns {Boolean} Whether or not the group is within the trash group
     */
    isInTrash() {
        let trash = this._getArchive().getTrashGroup();
        if (trash) {
            let thisGroup = trash.getGroupByID(this.getID());
            return (thisGroup !== null);
        }
        return false;
    }

    /**
     * Check if the group is used for trash
     * @returns {Boolean} Whether or not the group is the trash group
     * @memberof ManagedGroup
     */
    isTrash() {
        return this.getAttribute(ManagedGroup.Attributes.Role) === "trash";
    }

    /**
     * Move the group into another
     * @param {ManagedGroup} group The target group (new parent)
     * @returns {ManagedGroup} Returns self
     * @memberof ManagedGroup
     */
    moveToGroup(group) {
        if (this.isTrash()) {
            throw new Error("Trash group cannot be moved");
        }
        var targetID = group.getID();
        this._getWestley().execute(
            Inigo.create(Inigo.Command.MoveGroup)
                .addArgument(this.getID())
                .addArgument(targetID)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Set an attribute
     * @param {string} attributeName The name of the attribute
     * @param {string} value The value to set
     * @returns {ManagedGroup} Returns self
     * @memberof ManagedGroup
     */
    setAttribute(attributeName, value) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetGroupAttribute)
                .addArgument(this.getID())
                .addArgument(attributeName)
                .addArgument(value)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Set the group title
     * @param {string} title The title of the group
     * @returns {ManagedGroup} Returns self
     */
    setTitle(title) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetGroupTitle)
                .addArgument(this.getID())
                .addArgument(title)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Export group to object
     * @param {Number} outputFlags Bitwise options for outputting entries and child groups
     * @returns {Object} The group, in raw object form
     * @memberof ManagedGroup
     * @example
     *      // output defaults (entries and sub groups)
     *      group.toObject()
     * @example
     *      // output only entries
     *      group.toObject(ManagedGroup.OutputFlag.Entries)
     * @example
     *      // output only the group info
     *      group.toObject(ManagedGroup.OutputFlag.OnlyGroup)
     */
    toObject(outputFlags) {
        outputFlags = (outputFlags === undefined) ?
            (ManagedGroup.OutputFlag.Entries | ManagedGroup.OutputFlag.Groups) :
            outputFlags;
        // @todo use object cloning
        var attributes = {},
            groupAttributes = this._remoteObject.attributes || {};
        for (var attrKey in groupAttributes) {
            if (groupAttributes.hasOwnProperty(attrKey)) {
                attributes[attrKey] = groupAttributes[attrKey];
            }
        }
        let output = {
            id: this.getID(),
            title: this.getTitle(),
            attributes: attributes
        };
        if (outputFlags & ManagedGroup.OutputFlag.Entries) {
            output.entries = this
                .getEntries()
                .map(entry => entry.toObject());
        }
        if (outputFlags & ManagedGroup.OutputFlag.Groups) {
            output.groups = this
                .getGroups()
                .map(group => group.toObject(outputFlags))
        }
        return output;
    }

    /**
     * Export the group to a JSON string
     * @param {Number} outputFlags Output configuration flags to pass to `toObject`
     * @returns {string} The group (and entries) in JSON string format
     * @memberof ManagedGroup
     * @see toObject
     */
    toString(outputFlags) {
        return JSON.stringify(this.toObject(outputFlags));
    }

    /**
     * Get the archive instance reference
     * @protected
     * @returns {Archive}
     * @memberof ManagedGroup
     */
    _getArchive() {
        return this._archive;
    }

    /**
     * Get the remotely-managed object (group)
     * @protected
     * @returns {Object} The object instance for the group
     * @memberof ManagedGroup
     */
    _getRemoteObject() {
        return this._remoteObject;
    }

    /**
     * Get the delta managing instance for the archive
     * @protected
     * @returns {Westley} The internal Westley object
     * @memberof ManagedGroup
     */
    _getWestley() {
        return this._westley;
    }

}

ManagedGroup.Attributes = Object.freeze({
    Role:        "bc_group_role"
});

/**
 * Bitwise output flags for `toObject` and `toString`
 * @see toObject
 * @see toString
 * @memberof ManagedGroup
 * @static
 * @name OutputFlag
 */
ManagedGroup.OutputFlag = Object.freeze({
    OnlyGroup:  0,
    Entries:    1,
    Groups:     2
});

/**
 * Create a new ManagedGroup with a delta-manager and parent group ID
 * @static
 * @memberof ManagedGroup
 * @param {Archive} archive The archive to create the group in
 * @param {string=} parentID The parent group ID (default is root)
 * @returns {ManagedGroup} A new group
 */
ManagedGroup.createNew = function(archive, parentID) {
    parentID = parentID || "0";
    var id = encoding.getUniqueID(),
        westley = archive._getWestley();
    westley.execute(
        Inigo.create(Inigo.Command.CreateGroup)
            .addArgument(parentID)
            .addArgument(id)
            .generateCommand()
    );
    var group = searching.findGroupByID(westley.getDataset().groups, id);
    return new ManagedGroup(archive, group);
};

module.exports = ManagedGroup;
