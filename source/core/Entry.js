const VaultItem = require("./VaultItem.js");
// const { generateUUID } = require("../tools/uuid.js");
const { getEntryURLs } = require("../tools/entry.js");
const { findEntryByID, findGroupContainingEntryID } = require("../tools/rawVaultSearch.js");

class Entry extends VaultItem {
    /**
     * Get the instance type
     * @type {String}
     * @readonly
     * @memberof Entry
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
     * @see moveToGroup
     * @see Vault.getTrashGroup
     * @returns {Boolean} Whether or not the item was deleted
     * @memberof Entry
     */
    delete(skipTrash = false) {
        const trashGroup = this.vault.getTrashGroup();
        const parentGroup = this.getGroup();
        const canTrash = trashGroup && parentGroup && !parentGroup.isTrash() && !parentGroup.isInTrash();
        if (canTrash && !skipTrash) {
            // trash it
            this.moveToGroup(trashGroup);
            return false;
        }
        // delete it
        this.vault.format.deleteEntry(this.id);
        this._cleanUp();
        return true;
    }

    /**
     * Delete an attribute
     * @param {String} attribute The attribute name
     * @throws {Error} Throws if the attribute doesn't exist, or cannot be deleted
     * @memberof Entry
     * @returns {Entry} Self
     */
    deleteAttribute(attribute) {
        this.vault.format.deleteEntryAttribute(this.id, attribute);
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
        this.vault.format.deleteEntryProperty(this.id, property);
        return this;
    }

    /**
     * Get an attribute
     * If no attribute name is specified, an object with all attributes and their
     * values is returned.
     * @param {String=} attribute The name of the attribute to fetch
     * @returns {String|undefined|Object} The attribute value or an object
     *  containing all attribute keys and their values if no attribute name
     *  is provided
     * @memberof Entry
     */
    getAttribute(attribute) {
        const attributes = this._source.attributes || {};
        if (typeof attribute === "undefined") {
            // No property, return entire object
            return Object.assign({}, attributes);
        }
        return attributes.hasOwnProperty(attribute) ? attributes[attribute] : undefined;
    }

    /**
     * Get the containing group for the entry
     * @returns {Group|null} The parent group
     * @memberof Entry
     * @throws {Error} Throws if no parent group found
     */
    getGroup() {
        const parentInfo = findGroupContainingEntryID(this.vault._dataset.groups || [], this.id);
        if (!parentInfo || !parentInfo.group) {
            throw new Error(`No parent group found for entry: ${this.id}`);
        }
        // require Group here due to circular references:
        const Group = require("./Group.js");
        return new Group(this.vault, parentInfo.group);
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
        const raw = this._source.properties;
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
        const raw = this._source.properties;
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
        this.vault.format.moveEntry(this.id, group.id);
        return this;
    }

    /**
     * Set an attribute on the entry
     * @param {String} attribute The name of the attribute
     * @param {String} value The value to set
     * @returns {Entry} Returns self
     * @memberof Entry
     */
    setAttribute(attribute, value) {
        this.vault.format.setEntryAttribute(this.id, attribute, value);
        return this;
    }

    /**
     * Set a property on the entry
     * @param {String} property The property name
     * @param {String=} value The property value
     * @returns {Entry} Returns self
     * @memberof Entry
     */
    setProperty(property, value) {
        this.vault.format.setEntryProperty(this.id, property, value);
        return this;
    }
}

module.exports = Entry;
