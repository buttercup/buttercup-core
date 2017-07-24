"use strict";

var Inigo = require("./InigoGenerator.js"),
    encoding = require("../tools/encoding.js"),
    searching = require("../tools/searching-raw.js"),
    entryTools = require("../tools/entry.js"),
    createDebug = require("../tools/debug.js");

const debug = createDebug("entry");

/**
 * Managed entry class
 * @class Entry
 * @param {Archive} archive The main archive instance
 * @param {Object} remoteObj The remote object reference
 */
var Entry = function(archive, remoteObj) {
    debug("new entry");
    this._archive = archive;
    this._westley = archive._getWestley();
    this._remoteObject = remoteObj;
};

/**
 * Delete the entry - either trashes the entry, or removes it completely.
 * If the entry is in the trash already, it is removed (including if there is no
 *    trash group). If the entry is in a normal group and a trash group exists, it
 *  is moved there instead of being deleted.
 * @memberof Entry
 * @see moveToGroup
 * @see Archive.getTrashGroup
 * @returns {Boolean} Whether or not the item was deleted
 */
Entry.prototype.delete = function() {
    debug("delete entry");
    var trashGroup = this._getArchive().getTrashGroup(),
        parentGroup = this.getGroup(),
        canTrash = (trashGroup && parentGroup) &&
            (!parentGroup.isTrash() && !parentGroup.isInTrash());
    if (canTrash) {
        debug("move to trash (delete)");
        // trash it
        this.moveToGroup(trashGroup);
        return false;
    }
    debug("delete permanently");
    // delete it
    this._getWestley().execute(
        Inigo.create(Inigo.Command.DeleteEntry)
            .addArgument(this.getID())
            .generateCommand()
    );
    this._getWestley().pad();
    delete this._westley;
    delete this._remoteObject;
    return true;
};

/**
 * Delete an attribute
 * @param {String} attr The attribute name
 * @throws {Error} Throws if the attribute doesn't exist, or cannot be deleted
 * @memberof Entry
 * @returns {Entry} Self
 */
Entry.prototype.deleteAttribute = function(attr) {
    debug("delete attribute");
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
 * @throws {Error} Throws if property doesn't exist, or cannot be deleted
 * @param {String} property The meta property to delete
 * @memberof Entry
 * @returns {Entry} Self
 */
Entry.prototype.deleteMeta = function(property) {
    debug("delete meta");
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
 * If no attribute name is specified, an object with all attributes and their
 * values is returned.
 * @param {String=} attributeName The name of the attribute to fetch
 * @returns {String|undefined|Object} The attribute value or an object
 *  containing all attribute keys and their values if no attribute name
 *  is provided
 * @memberof Entry
 */
Entry.prototype.getAttribute = function(attributeName) {
    debug("fetch attribute");
    const attributes = this._getRemoteObject().attributes || {};
    if (typeof attributeName === "undefined") {
        // No property, return entire object
        return Object.assign({}, attributes);
    }
    return attributes.hasOwnProperty(attributeName) ?
        attributes[attributeName] : undefined;
};

/**
 * Get the containing group for the entry
 * @returns {Group|null} The parent group
 * @memberof Entry
 */
Entry.prototype.getGroup = function() {
    debug("fetch parent group");
    // @todo move to a new searching library
    var parentInfo = searching.findGroupContainingEntryID(
            this._getWestley().getDataset().groups || [],
            this.getID()
        );
    if (parentInfo && parentInfo.group) {
        // require Group here due to circular references:
        var Group = require("./Group.js");
        return new Group(this._getArchive(), parentInfo.group);
    }
    return null;
};

/**
 * Get the entry ID
 * @returns {String} The entry's ID
 * @memberof Entry
 */
Entry.prototype.getID = function() {
    return this._getRemoteObject().id;
};

/**
 * Get a meta value
 * If no meta name is specified, an object with all meta keys and their
 * values is returned.
 * @param {String=} property The name of the meta property
 * @returns {String|undefined|Object} The meta value or an object
 *  containing all meta keys and values if no meta name specified
 * @memberof Entry
 */
Entry.prototype.getMeta = function(property) {
    debug("fetch meta");
    const meta = this._getRemoteObject().meta || {};
    if (typeof property === "undefined") {
        // No property, return entire object
        return Object.assign({}, meta);
    }
    // Find the first meta key that matches the requested one regardless of case:
    const metaKey = Object.keys(meta).find(key =>
        key.toLowerCase() === property.toLowerCase()
    );
    return metaKey ?
        meta[metaKey] :
        undefined;
};

/**
 * Get a property value
 * If no property name is specified, an object with all properties and their
 * values is returned.
 * @param {String=} property The name of the property to fetch
 * @returns {String|undefined|Object} The property value or an object with all
 *  values if no property specified
 * @memberof Entry
 */
Entry.prototype.getProperty = function(property) {
    debug("fetch property");
    var raw = this._getRemoteObject();
    if (typeof property === "undefined") {
        return entryTools.getValidProperties().reduce((props, propName) => {
            return Object.assign(props, {
                [propName]: raw[propName]
            });
        }, {});
    }
    return raw.hasOwnProperty(property) && entryTools.isValidProperty(property) ?
        raw[property] : undefined;
};

/**
 * Check if the entry is in the trash
 * @returns {Boolean} Whether or not the entry is in the trash
 * @memberof Entry
 */
Entry.prototype.isInTrash = function() {
    debug("check if in trash");
    return this.getGroup().isInTrash() || this.getGroup().isTrash();
};

/**
 * Move the entry to another group
 * @params {Group} group The target group
 * @returns {Entry} Returns self
 * @param {Group} group The target group
 * @memberof Entry
 */
Entry.prototype.moveToGroup = function(group) {
    debug("move to group");
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
 * @returns {Entry} Returns self
 * @memberof Entry
 */
Entry.prototype.setAttribute = function(attributeName, value) {
    debug("set attribute");
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
 * @param {String=} value The value to set
 * @returns {Entry} Returns self
 * @memberof Entry
 */
Entry.prototype.setMeta = function(prop, value) {
    debug("set meta");
    const meta = this._getRemoteObject().meta || {};
    // Try to find a key that matches the requested property, even in a different case. If it
    // exists, use that to set instead:
    const metaKey = Object.keys(meta).find(key => key.toLowerCase() === prop.toLowerCase()) || prop;
    value = value || "";
    this._getWestley().execute(
        Inigo.create(Inigo.Command.SetEntryMeta)
            .addArgument(this.getID())
            .addArgument(metaKey)
            .addArgument(value)
            .generateCommand()
    );
    this._getWestley().pad();
    return this;
};

/**
 * Set a property on the entry
 * @param {String} prop The property name
 * @param {String=} value The property value
 * @returns {Entry} Returns self
 * @memberof Entry
 */
Entry.prototype.setProperty = function(prop, value) {
    debug("set property");
    value = value || "";
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
 * @returns {Object} The entry in object-form
 * @memberof Entry
 */
Entry.prototype.toObject = function() {
    debug("to object");
    var properties = {},
        meta = {},
        attributes = {},
        remoteMeta = this._getRemoteObject().meta || {},
        remoteAttrs = this._getRemoteObject().attributes || {},
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
    for (var attrName in remoteAttrs) {
        if (remoteAttrs.hasOwnProperty(attrName)) {
            attributes[attrName] = remoteAttrs[attrName];
        }
    }
    return {
        attributes: attributes,
        id: this.getID(),
        meta: meta,
        properties: properties
    };
};

/**
 * toString override
 * @returns {String} The string representation of the Entry
 * @memberof Entry
 */
Entry.prototype.toString = function() {
    debug("to string");
    return JSON.stringify(this.toObject());
};

/**
 * Get the archive reference
 * @returns {Archive} The Archive reference
 * @memberof Entry
 */
Entry.prototype._getArchive = function() {
    return this._archive;
};

/**
 * Get the remote object that mirrors the data represented here
 * @returns {Object} The remote object (in-memory copy)
 * @memberof Entry
 */
Entry.prototype._getRemoteObject = function() {
    return this._remoteObject;
};

/**
 * Get the Westley reference
 * @returns {Westley} The internal Westley reference
 * @memberof Entry
 */
Entry.prototype._getWestley = function() {
    return this._westley;
};

Entry.Attributes = Object.freeze({
    FacadeType:            "BC_ENTRY_FACADE_TYPE"
});

/**
 * Create a new entry
 * @param {Archive} archive The archive
 * @param {string} groupID The ID of the target group
 * @returns {Entry} The new entry
 * @static
 * @memberof Entry
 * @throws {Error} Throws if the target group doesn't exist
 * @throws {Error} Throws if the target group is the trash group,
 *      or if the target group is in the trash
 */
Entry.createNew = function(archive, groupID) {
    debug("create entry");
    // check if group is trash/in-trash
    var group = archive.findGroupByID(groupID);
    if (!group) {
        throw new Error(`Failed creating entry: no group found for ID: ${groupID}`);
    } else if (group.isTrash() || group.isInTrash()) {
        throw new Error("Failed creating entry: cannot create within Trash group");
    }
    // generate a unique identifier for the new Entry
    var id = encoding.getUniqueID(),
        westley = archive._getWestley();
    westley.execute(
        Inigo.create(Inigo.Command.CreateEntry)
            .addArgument(groupID)
            .addArgument(id)
            .generateCommand()
    );
    // get the raw dataset for the new entry
    var entry = searching.findEntryByID(westley.getDataset().groups, id);
    return new Entry(archive, entry);
};

module.exports = Entry;
