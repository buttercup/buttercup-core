const ArchiveMember = require("./ArchiveMember.js");
const Inigo = require("./Inigo.js");
const encoding = require("./tools/encoding.js");
const { findEntryByID, findGroupContainingEntryID } = require("./tools/rawVaultSearch.js");
const { getEntryURLs } = require("./tools/entry.js");

/**
 * @typedef {Object} EntryHistoryItem
 * @property {String} type - The type of history item
 * @property {String=} origin - The origin group ID for a moved-entry
 * @property {String=} destination - The destination group ID for a moved-entry
 * @property {String=} property - The property/attribute name of the change
 * @property {String=} value - The value that was changed (resulting)
 */

/**
 * Entry class implementation
 * Entries form the low-level data structures used in Buttercup, and
 * are intended to represent logical collections of properties, like
 * a login for a website.
 * @augments ArchiveMember
 */
class Entry extends ArchiveMember {
    /**
     * Get the instance type
     * @type {String}
     * @readonly
     */
    get type() {
        return "Entry";
    }

    /**
     * Delete the entry - either trashes the entry, or removes it completely.
     * If the entry is in the trash already, it is removed (including if there is no
     *    trash group). If the entry is in a normal group and a trash group exists, it
     *  is moved there instead of being deleted.
     * @param {Boolean=} skipTrash Skip the trash and force-delete the entry
     * @memberof Entry
     * @see moveToGroup
     * @see Archive.getTrashGroup
     * @returns {Boolean} Whether or not the item was deleted
     */
    delete(skipTrash = false) {
        const trashGroup = this._getArchive().getTrashGroup();
        const parentGroup = this.getGroup();
        const canTrash = trashGroup && parentGroup && !parentGroup.isTrash() && !parentGroup.isInTrash();
        if (canTrash && !skipTrash) {
            // trash it
            this.moveToGroup(trashGroup);
            return false;
        }
        // delete it
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteEntry)
                .addArgument(this.id)
                .generateCommand()
        );
        this._getWestley().pad();
        delete this._westley;
        delete this._remoteObject;
        return true;
    }

    /**
     * Delete an attribute
     * @param {String} attr The attribute name
     * @throws {Error} Throws if the attribute doesn't exist, or cannot be deleted
     * @memberof Entry
     * @returns {Entry} Self
     */
    deleteAttribute(attr) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteEntryAttribute)
                .addArgument(this.id)
                .addArgument(attr)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Delete a meta item
     * @throws {Error} Throws if property doesn't exist, or cannot be deleted
     * @param {String} property The meta property to delete
     * @memberof Entry
     * @returns {Entry} Self
     * @deprecated Meta will be removed in version 3
     */
    deleteMeta(property) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteEntryMeta)
                .addArgument(this.id)
                .addArgument(property)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Delete a property
     * @throws {Error} Throws if property doesn't exist, or cannot be deleted
     * @param {String} property The property to delete
     * @memberof Entry
     * @returns {Entry} Self
     */
    deleteProperty(property) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.DeleteEntryProperty)
                .addArgument(this.id)
                .addArgument(property)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

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
    getAttribute(attributeName) {
        const attributes = this._getRemoteObject().attributes || {};
        if (typeof attributeName === "undefined") {
            // No property, return entire object
            return Object.assign({}, attributes);
        }
        return attributes.hasOwnProperty(attributeName) ? attributes[attributeName] : undefined;
    }

    /**
     * Get all attributes
     * @returns {Object} Attributes object
     * @memberof Entry
     * @deprecated Will be removed in version 3 - use `getAttribute()` instead
     */
    getAttributes() {
        const attributes = this._getRemoteObject().attributes || {};
        return Object.assign({}, attributes);
    }

    /**
     * Get the containing group for the entry
     * @returns {Group|null} The parent group
     * @memberof Entry
     * @deprecated Will throw for no group in version 3
     */
    getGroup() {
        // @todo move to a new searching library
        const parentInfo = findGroupContainingEntryID(this._getWestley().dataset.groups || [], this.id);
        if (parentInfo && parentInfo.group) {
            // require Group here due to circular references:
            const Group = require("./Group.js");
            return new Group(this._getArchive(), parentInfo.group);
        }
        return null;
    }

    /**
     * Get the history of the entry
     * @returns {Array.<EntryHistoryItem>}
     * @memberof Entry
     */
    getHistory() {
        return this._getRemoteObject().history || [];
    }

    /**
     * Get a meta value
     * If no meta name is specified, an object with all meta keys and their
     * values is returned.
     * @param {String=} property The name of the meta property
     * @returns {String|undefined|Object} The meta value or an object
     *  containing all meta keys and values if no meta name specified
     * @memberof Entry
     * @deprecated Meta will be removed in version 3
     */
    getMeta(property) {
        const meta = this._getRemoteObject().properties || {};
        if (typeof property === "undefined") {
            // No property, return entire object
            return Object.assign({}, properties);
        }
        // Find the first meta key that matches the requested one regardless of case:
        const metaKey = Object.keys(meta).find(key => key.toLowerCase() === property.toLowerCase());
        return metaKey ? meta[metaKey] : undefined;
    }

    /**
     * Get a property value
     * If no property name is specified, an object with all properties and their
     * values is returned.
     * @param {String=} property The name of the property to fetch
     * @returns {String|undefined|Object} The property value or an object with all
     *  values if no property specified
     * @memberof Entry
     */
    getProperty(property) {
        const raw = this._getRemoteObject().properties;
        if (typeof property === "undefined") {
            return Object.assign({}, raw);
        }
        return raw.hasOwnProperty(property) ? raw[property] : undefined;
    }

    /**
     * Get property values via RegExp expressions.
     * If no property expression is specified, it returns the empty behavior of
     * {@see Entry.getProperty}.
     * @param {RegExp|String} propertyExpression
     * @returns {Object} A key-value object of the matching properties
     * @memberof Entry
     */
    getProperties(propertyExpression) {
        if (typeof propertyExpression === "undefined") {
            return this.getProperty();
        }
        const raw = this._getRemoteObject().properties;
        const isRexp = propertyExpression instanceof RegExp;
        return Object.keys(raw).reduce((aggr, key) => {
            const matches = isRexp ? propertyExpression.test(key) : propertyExpression === key;
            return matches ? Object.assign(aggr, { [key]: raw[key] }) : aggr;
        }, {});
    }

    /**
     * Get an array of URLs from the Entry
     * Returns an array of detected URL values in the Entry's properties. The
     * types of URLs can be configured by providing a preference:
     *  - "general" - General URLs (of any type, preferring "URL" named props)
     *  - "login" - Prefer URLs whose key has "login" in it
     *  - "icon" - Return only icon-like URLs
     *  - "any" - Return all found URLs
     * @param {String=} urlTypePreference The URL type preference
     * @returns {Array.<String>} An array of URLs
     * @memberof Entry
     */
    getURLs(urlTypePreference) {
        return getEntryURLs(this.getProperty(), urlTypePreference);
    }

    /**
     * Check if the entry is in the trash
     * @returns {Boolean} Whether or not the entry is in the trash
     * @memberof Entry
     */
    isInTrash() {
        return this.getGroup().isInTrash() || this.getGroup().isTrash();
    }

    /**
     * Move the entry to another group
     * @params {Group} group The target group
     * @returns {Entry} Returns self
     * @param {Group} group The target group
     * @memberof Entry
     */
    moveToGroup(group) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.MoveEntry)
                .addArgument(this.id)
                .addArgument(group.id)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Set an attribute on the entry
     * @param {String} attributeName The name of the attribute
     * @param {String} value The value to set
     * @returns {Entry} Returns self
     * @memberof Entry
     */
    setAttribute(attributeName, value) {
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetEntryAttribute)
                .addArgument(this.id)
                .addArgument(attributeName)
                .addArgument(value)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Set a meta value on the entry
     * @param {String} prop The meta name
     * @param {String=} val The value to set
     * @returns {Entry} Returns self
     * @memberof Entry
     * @deprecated Meta will be removed in version 3
     */
    setMeta(prop, val) {
        const meta = this._getRemoteObject().properties || {};
        // Try to find a key that matches the requested property, even in a different case. If it
        // exists, use that to set instead:
        const metaKey = Object.keys(meta).find(key => key.toLowerCase() === prop.toLowerCase()) || prop;
        const value = val || "";
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetEntryMeta)
                .addArgument(this.id)
                .addArgument(metaKey)
                .addArgument(value)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Set a property on the entry
     * @param {String} prop The property name
     * @param {String=} val The property value
     * @returns {Entry} Returns self
     * @memberof Entry
     */
    setProperty(prop, val) {
        const value = val || "";
        this._getWestley().execute(
            Inigo.create(Inigo.Command.SetEntryProperty)
                .addArgument(this.id)
                .addArgument(prop)
                .addArgument(value)
                .generateCommand()
        );
        this._getWestley().pad();
        return this;
    }

    /**
     * Export entry to object
     * @returns {Object} The entry in object-form
     * @memberof Entry
     */
    toObject() {
        const properties = {};
        const attributes = {};
        const remoteProperties = this._getRemoteObject().properties || {};
        const remoteAttrs = this._getRemoteObject().attributes || {};
        for (let propertyName in remoteProperties) {
            if (remoteProperties.hasOwnProperty(propertyName)) {
                properties[propertyName] = remoteProperties[propertyName];
            }
        }
        for (let attrName in remoteAttrs) {
            if (remoteAttrs.hasOwnProperty(attrName)) {
                attributes[attrName] = remoteAttrs[attrName];
            }
        }
        return {
            attributes,
            id: this.id,
            properties
        };
    }

    /**
     * toString override
     * @returns {String} The string representation of the Entry
     * @memberof Entry
     */
    toString() {
        return JSON.stringify(this.toObject());
    }
}

Entry.Attributes = Object.freeze({
    FacadeType: "BC_ENTRY_FACADE_TYPE",
    FieldTypePrefix: "BC_ENTRY_FIELD_TYPE:"
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
    var entry = findEntryByID(westley.dataset.groups, id);
    return new Entry(archive, entry);
};

module.exports = Entry;
