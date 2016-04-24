(function(module) {

    "use strict";

    var Inigo = require("./InigoGenerator.js"),
        ManagedEntry = require("./ManagedEntry.js"),
        encoding = require("../tools/encoding.js"),
        searching = require("../tools/searching-raw.js");

    /**
     * Managed group class
     * @class ManagedGroup
     * @param {Archive} archive The archive instance
     * @param {Object} remoteObj The remote object reference
     */
    var ManagedGroup = function(archive, remoteObj) {
        this._archive = archive;
        this._westley = archive._getWestley();
        this._remoteObject = remoteObj;
    };

    /**
     * Create a new entry with a title
     * @param {string=} title
     * @returns {ManagedEntry} The new entry
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.createEntry = function(title) {
        var managedEntry = ManagedEntry.createNew(this._getArchive(), this.getID());
        if (title) {
            managedEntry.setProperty("title", title);
        }
        return managedEntry;
    };

    /**
     * Create a child group
     * @param {string=} title Optionally set a title
     * @returns {ManagedGroup} The new child group
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.createGroup = function(title) {
        var group = ManagedGroup.createNew(this._getArchive(), this.getID());
        if (title) {
            group.setTitle(title);
        }
        return group;
    };

    /**
     * Delete the group
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.delete = function() {
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
    };

    /**
     * Delete an attribute
     * @param {string} attr The name of the attribute
     * @returns {ManagedGroup} Returns self
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.deleteAttribute = function(attr) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteGroupAttribute)
                .addArgument(this.getID())
                .addArgument(attr)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    };

    /**
     * Get an attribute
     * @param {string} attributeName The name of the attribute
     * @returns {string|undefined} Returns the attribute or undefined if not found
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.getAttribute = function(attributeName) {
        var raw = this._getRemoteObject();
        return raw.attributes && raw.attributes.hasOwnProperty(attributeName) ?
            raw.attributes[attributeName] : undefined;
    };

    /**
     * Get the entries within the group
     * @returns {Array.<ManagedEntry>}
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.getEntries = function() {
        var archive = this._getArchive();
        return (this._getRemoteObject().entries || []).map(function(rawEntry) {
            return new ManagedEntry(archive, rawEntry);
        });
    };

    /**
     * Get the groups within the group
     * @returns {Array.<ManagedGroup>}
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.getGroups = function() {
        var archive = this._getArchive();
        return (this._getRemoteObject().groups || []).map(function(rawGroup) {
            return new ManagedGroup(archive, rawGroup);
        });
    };

    /**
     * Get the group ID
     * @returns {string}
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.getID = function() {
        return this._getRemoteObject().id;
    };

    /**
     * Get the group title
     * @returns {string}
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.getTitle = function() {
        return this._getRemoteObject().title || "";
    };

    /**
     * Check if the current group is used for trash
     * @returns {boolean}
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.isTrash = function() {
        return this.getAttribute(ManagedGroup.Attributes.Role) === "trash";
    };

    /**
     * Move the group into another
     * @param {ManagedGroup} group The target group (new parent)
     * @returns {ManagedGroup} Returns self
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.moveToGroup = function(group) {
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
    };

    /**
     * Set an attribute
     * @param {string} attributeName The name of the attribute
     * @param {string} value The value to set
     * @returns {ManagedGroup} Returns self
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.setAttribute = function(attributeName, value) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetGroupAttribute)
                .addArgument(this.getID())
                .addArgument(attributeName)
                .addArgument(value)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    };

    /**
     * Set the group title
     * @param {string} title The title of the group
     * @returns {ManagedGroup} Returns self
     */
    ManagedGroup.prototype.setTitle = function(title) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetGroupTitle)
                .addArgument(this.getID())
                .addArgument(title)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    };

    /**
     * Export group to object
     * @returns {Object}
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.toObject = function() {
        // @todo use object cloning
        var attributes = {},
            groupAttributes = this._remoteObject.attributes || {};
        for (var attrKey in groupAttributes) {
            if (groupAttributes.hasOwnProperty(attrKey)) {
                attributes[attrKey] = groupAttributes[attrKey];
            }
        }
        return {
            id: this.getID(),
            title: this.getTitle(),
            attributes: attributes,
            entries: this
                .getEntries()
                .map((entry) => entry.toObject())
        };
    };

    /**
     * Export the group to a JSON string
     * @returns {string} The group (and entries) in JSON string format
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype.toString = function() {
        return JSON.stringify(this.toObject());
    };

    /**
     * Get the archive instance reference
     * @protected
     * @returns {Archive}
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype._getArchive = function() {
        return this._archive;
    };

    /**
     * Get the remotely-managed object (group)
     * @protected
     * @returns {Object}
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype._getRemoteObject = function() {
        return this._remoteObject;
    };

    /**
     * Get the delta managing instance for the archive
     * @protected
     * @returns {Westley}
     * @memberof ManagedGroup
     */
    ManagedGroup.prototype._getWestley = function() {
        return this._westley;
    };

    ManagedGroup.Attributes = Object.freeze({
        Role:        "bc_group_role"
    });

    /**
     * Create a new ManagedGroup with a delta-manager and parent group ID
     * @static
     * @memberof ManagedGroup
     * @param {Archive} archive
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

})(module);
