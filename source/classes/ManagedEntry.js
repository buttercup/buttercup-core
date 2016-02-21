(function(module) {

    "use strict";

    var Inigo = require("__buttercup/classes/InigoGenerator.js"),
        encoding = require("__buttercup/tools/encoding.js"),
        searching = require("__buttercup/tools/searching.js"),
        entryTools = require("__buttercup/tools/entry.js");

    var __displayTypes = {
        "default": {
            "title": "Title",
            "username": "Username",
            "password": "Password"
        },
        "credit-card": {
            "title": "Name on card",
            "username": "Card number",
            "password": "CVV"
        }
    };

    /**
     * Managed entry class
     * @class ManagedEntry
     * @param {Archive} archive The main archive instance
     * @param {Object} remoteObj The remote object reference
     */
    var ManagedEntry = function(archive, remoteObj) {
        this._archive = archive;
        this._westley = archive._getWestley();
        this._remoteObject = remoteObj;
    };

    /**
     * Delete the entry - either trashes the entry, or removes it completely.
     * If the entry is in the trash already, it is removed (including if there is no
      *    trash group). If the entry is in a normal group and a trash group exists, it
     *  is moved there instead of being deleted.
     * @memberof ManagedEntry
     * @see moveToGroup
     * @see Archive.getTrashGroup
     */
    ManagedEntry.prototype.delete = function() {
        var trashGroup = this._getArchive().getTrashGroup(),
            parentGroup = this.getGroup();
        if (trashGroup && parentGroup && !parentGroup.isTrash()) {
            // trash it
            this.moveToGroup(trashGroup);
        } else {
            this._getWestley().execute(
                Inigo.create(Inigo.Command.DeleteEntry)
                    .addArgument(this.getID())
                    .generateCommand()
            );
            this._getWestley().pad();
            delete this._westley;
            delete this._remoteObject;
        }
    };

    /**
     * Delete an attribute
     * @param {string} attr The attribute name
     * @throws {Error} Throws if the attribute doesn't exist, or cannot be deleted
     * @returns {ManagedEntry}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.deleteAttribute = function(attr) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteEntryAttribute)
                .addArgument(this.getID())
                .addArgument(attr)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    };

    /**
     * Delete a meta item
     * @param {string} property The property name
     * @throws {Error} Throws if property doesn't exist, or cannot be deleted
     * @returns {ManagedEntry}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.deleteMeta = function(property) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteEntryMeta)
                .addArgument(this.getID())
                .addArgument(property)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    };

    /**
     * Get an attribute
     * @params {String} attributeName The name of the attribute
     * @returns {String|undefined}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.getAttribute = function(attributeName) {
        var raw = this._getRemoteObject();
        return raw.attributes && raw.attributes.hasOwnProperty(attributeName) ?
            raw.attributes[attributeName] : undefined;
    };

    /**
     * @typedef DisplayInfo
     * @property {string} title The text to replace "title"
     * @property {string} username The text to replace "username"
     * @property {string} password The text to replace "password"
     */

    /**
     * Get the display information for the entry
     * @returns {DisplayInfo|undefined}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.getDisplayInfo = function() {
        var displayType = this.getAttribute(ManagedEntry.Attributes.DisplayType) || "default";
        return __displayTypes[displayType];
    };

    /**
     * Get the containing group for the entry
     * @returns {ManagedGroup|null}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.getGroup = function() {
        // @todo move to a new searching library
        var parentInfo = searching.findGroupContainingEntryID(
                this._getWestley().getDataset().groups || [],
                this.getID()
            );
        if (parentInfo && parentInfo.group) {
            // require ManagedGroup here due to circular references:
            var ManagedGroup = require("__buttercup/classes/ManagedGroup.js");
            return new ManagedGroup(this._getArchive(), parentInfo.group);
        }
        return null;
    };

    /**
     * Get the entry ID
     * @returns {String}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.getID = function() {
        return this._getRemoteObject().id;
    };

    /**
     * Get a meta value
     * @params {String} property The name of the meta property
     * @returns {String|undefined}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.getMeta = function(property) {
        var raw = this._getRemoteObject();
        return raw.meta && raw.meta.hasOwnProperty(property) ?
            raw.meta[property] : undefined;
    };

    /**
     * Get a property value
     * @params {String} property The name of the meta property
     * @returns {String|undefined}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.getProperty = function(property) {
        var raw = this._getRemoteObject();
        return raw.hasOwnProperty(property) && entryTools.isValidProperty(property) ?
            raw[property] : undefined;
    };

    /**
     * Move the entry to another group
     * @params {ManagedGroup} group The target group
     * @returns {ManagedEntry} Returns self
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.moveToGroup = function(group) {
        var targetID = group.getID();
        this._getWestley().execute(
            Inigo.create(Inigo.Command.MoveEntry)
                .addArgument(this.getID())
                .addArgument(targetID)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    };

    /**
     * Set an attribute on the entry
     * @param {String} attributeName The name of the attribute
     * @param {String} value The value to set
     * @returns {ManagedEntry} Returns self
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.setAttribute = function(attributeName, value) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetEntryAttribute)
                .addArgument(this.getID())
                .addArgument(attributeName)
                .addArgument(value)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    };

    /**
     * Set a meta value on the entry
     * @param {String} prop The meta name
     * @param {String} value The value to set
     * @returns {ManagedEntry} Returns self
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.setMeta = function(prop, value) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetEntryMeta)
                .addArgument(this.getID())
                .addArgument(prop)
                .addArgument(value)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    };

    /**
     * Set a property on the entry
     * @param {String} prop The property name
     * @param {String} value The property value
     * @returns {ManagedEntry} Returns self
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.setProperty = function(prop, value) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetEntryProperty)
                .addArgument(this.getID())
                .addArgument(prop)
                .addArgument(value)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    };

    /**
     * Export entry to object
     * @returns {Object}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.toObject = function() {
        var properties = {},
            meta = {},
            remoteMeta = this._getRemoteObject().meta || {},
            _this = this;
        entryTools.getValidProperties().forEach(function(propName) {
            var val = _this.getProperty(propName);
            if (val !== undefined) {
                properties[propName] = val;
            }
        });
        for (var metaName in remoteMeta) {
            if (remoteMeta.hasOwnProperty(metaName)) {
                meta[metaName] = remoteMeta[metaName];
            }
        }
        return {
            id: this.getID(),
            properties: properties,
            meta: meta
        };
    };

    /**
     * toString override
     * @returns {string}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype.toString = function() {
        return JSON.stringify(this.toObject());
    };

    /**
     * Get the archive reference
     * @returns {Archive}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype._getArchive = function() {
        return this._archive;
    };

    /**
     * Get the remote object that mirrors the data represented here
     * @returns {Object}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype._getRemoteObject = function() {
        return this._remoteObject;
    };

    /**
     * Get the Westley reference
     * @returns {Westley}
     * @memberof ManagedEntry
     */
    ManagedEntry.prototype._getWestley = function() {
        return this._westley;
    };

    ManagedEntry.Attributes = Object.freeze({
        DisplayType:        "bc_entry_display_type",
        Icon:                "bc_entry_icon"
    });

    /**
     * Create a new entry
     * @param {Archive} archive The archive
     * @param {string} groupID The ID of the target group
     * @returns {ManagedEntry}
     * @static
     * @memberof ManagedEntry
     */
    ManagedEntry.createNew = function(archive, groupID) {
        var id = encoding.getUniqueID(),
            westley = archive._getWestley();
        westley.execute(
            Inigo.create(Inigo.Command.CreateEntry)
                .addArgument(groupID)
                .addArgument(id)
                .generateCommand()
        );
        var entry = searching.findEntryByID(westley.getDataset().groups, id);
        return new ManagedEntry(archive, entry);
    };

    module.exports = ManagedEntry;

})(module);
