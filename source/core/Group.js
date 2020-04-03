const VaultItem = require("./VaultItem.js");
const Entry = require("./Entry.js");
const { generateUUID } = require("../tools/uuid.js");
const { moveGroupBetweenVaults } = require("../tools/sharing.js");
const { findGroupByID, findGroupsByTitle } = require("../search/groups.js");
const { findEntriesByProperty, findEntryByID } = require("../search/entries.js");

class Group extends VaultItem {
    static Attribute = Object.freeze({
        Role: "bc_group_role"
    });

    static createNew(vault, parentID = "0") {
        if (parentID !== "0") {
            // check if group is trash/in-trash
            const group = vault.findGroupByID(parentID);
            if (!group) {
                throw new Error(`Failed creating group: no group found for ID: ${parentID}`);
            } else if (group.isTrash() || group.isInTrash()) {
                throw new Error("Failed creating group: cannot create within Trash group");
            }
        }
        const id = generateUUID();
        vault.format.createGroup(parentID, id);
        return vault.findGroupByID(id);
    }

    get type() {
        return "Group";
    }

    /**
     * Create a new entry with a title
     * @param {String=} title The title of the new entry
     * @returns {Entry} The new entry
     * @memberof Group
     */
    createEntry(title) {
        const entry = Entry.createNew(this.vault, this.id);
        if (title) {
            entry.setProperty("title", title);
        }
        return entry;
    }

    /**
     * Create a child group
     * @param {string=} title Optionally set a title
     * @returns {Group} The new child group
     * @memberof Group
     */
    createGroup(title) {
        const group = Group.createNew(this.vault, this.id);
        if (title) {
            group.setTitle(title);
        }
        return group;
    }

    /**
     * Delete the group
     * If there is a trash group available, the group is moved there. If the group
     * is already in the trash, it is deleted permanently.
     * @param {Boolean=} skipTrash Skip the trash
     * @returns {Boolean} True when deleted, false when moved to trash
     * @memberof Group
     */
    delete(skipTrash = false) {
        if (this.isTrash()) {
            throw new Error("Trash group cannot be deleted");
        }
        const trashGroup = this.vault.getTrashGroup();
        const hasTrash = trashGroup !== null;
        const inTrash = this.isInTrash();
        if (!inTrash && hasTrash && !skipTrash) {
            // Not in trash, and a trash group exists, so move it there
            this.moveTo(trashGroup);
            return false;
        }
        // No trash or already in trash, so just delete
        this.vault.format.deleteGroup(this.id);
        this.__cleanUp();
        return true;
    }

    /**
     * Delete an attribute
     * @param {String} attr The name of the attribute
     * @returns {Group} Returns self
     * @memberof Group
     */
    deleteAttribute(attr) {
        this.vault.format.deleteGroupAttribute(this.id, attr);
        return this;
    }

    /**
     * Find an entry by its ID
     * @param {String} id The ID to search for
     * @returns {null|Entry} Null if not found, or the Entry instance
     * @memberof Group
     */
    findEntryByID(id) {
        return findEntryByID([this], id);
    }

    /**
     * Find all entries that match a certain property
     * @name findEntriesByProperty
     * @param {RegExp|String} property The property to search with
     * @param {RegExp|String} value The value to search for
     * @returns {Array.<Entry>} An array of found extries
     * @memberof Group
     */
    findEntriesByProperty(property, value) {
        return findEntriesByProperty([this], property, value);
    }

    /**
     * Find a group by its ID
     * @param {String} id The group ID to search for
     * @returns {Group|null} The group or null if not found
     * @memberof Group
     */
    findGroupByID(id) {
        return findGroupByID([this], id);
    }

    /**
     * Find groups by their title
     * @name findGroupsByTitle
     * @param {String|RegExp} title The group title
     * @returns {Array.<Group>} An array of groups
     * @memberof Group
     */
    findGroupsByTitle(title) {
        return findGroupsByTitle([this], title);
    }

    /**
     * Get an attribute
     * @param {String=} attribute The name of the attribute. If none provided
     *  the entire attributes object is returned.
     * @returns {String|undefined|Object} Returns the attribute or undefined if not found.
     *  If no attribute name is provided an object containing all attributes is returned.
     * @memberof Group
     */
    getAttribute(attribute) {
        const attributes = this._source.attributes || {};
        if (typeof attribute === "undefined") {
            return Object.assign({}, attributes);
        }
        return attributes.hasOwnProperty(attribute) ? attributes[attribute] : undefined;
    }

    /**
     * Get the entries within the group
     * @returns {Array.<Entry>} An array of entries
     * @memberof Group
     */
    getEntries() {
        return (this._source.entries || []).map(rawEntry => new Entry(this.vault, rawEntry));
    }

    /**
     * Get the groups within the group
     * @returns {Array.<Group>} An array of child groups
     * @memberof Group
     */
    getGroups() {
        return (this._source.groups || []).map(raw => new Group(this.vault, raw));
    }

    /**
     * Get the parent group
     * @returns {Group|null} Returns the parent group instance or null if the parent
     *  is the archive
     * @throws {Error} Throws if no parent could be found (detached)
     * @memberof Group
     */
    getParentGroup() {
        const topmostGroupIDs = this.vault.getGroups().map(group => group.id);
        if (topmostGroupIDs.indexOf(this.id) >= 0) {
            // parent is vault
            return null;
        }
        const parentInfo = findGroupContainingGroupID(archive._getWestley().dataset, this.id);
        if (parentInfo) {
            return new Group(archive, parentInfo.group);
        }
        throw new Error("No parent group: group is detacted");
    }

    /**
     * Get the group title
     * @returns {String} The title of the group
     * @memberof Group
     */
    getTitle() {
        return this._source.title || "";
    }

    /**
     * Check if the group is in the trash
     * @returns {Boolean} Whether or not the group is within the trash group
     * @memberof Group
     */
    isInTrash() {
        const trash = this.vault.getTrashGroup();
        if (trash) {
            const thisGroup = trash.findGroupByID(this.id);
            return thisGroup !== null;
        }
        return false;
    }

    /**
     * Check if the group is used for trash
     * @returns {Boolean} Whether or not the group is the trash group
     * @memberof Group
     */
    isTrash() {
        return this.getAttribute(Group.Attribute.Role) === "trash";
    }

    /**
     * Move the group to another group or archive
     * @param {Group|Vault} target The destination Group or Vault instance
     * @returns {Group} Self
     * @memberof Group
     */
    moveTo(target) {
        if (this.isTrash()) {
            throw new Error("Trash group cannot be moved");
        }
        let targetVault, targetGroupID;
        if (target.type === "Group") {
            // moving to a group
            targetVault = target.vault;
            targetGroupID = target.id;
        } else if (target.type === "Archive") {
            // moving to an archive
            targetVault = target;
            targetGroupID = "0";
        } else {
            throw new Error(`Unknown remote type: ${target.type}`);
        }
        if (this.vault.readOnly) {
            throw new Error("Cannot move group: origin archive is read-only");
        }
        if (targetVault.readOnly) {
            throw new Error("Cannot move group: target archive is read-only");
        }
        if (this.vault.id === targetVault.id) {
            // target is local, so create commands here
            this.vault.format.moveGroup(this.id, targetGroupID);
        } else {
            // target is in another archive, so move there
            moveGroupBetweenVaults(this, target);
        }
        return this;
    }

    /**
     * Set an attribute
     * @param {string} attribute The name of the attribute
     * @param {string} value The value to set
     * @returns {Group} Returns self
     * @memberof Group
     */
    setAttribute(attribute, value) {
        this.vault.format.setGroupAttribute(this.id, attribute, value);
        return this;
    }

    /**
     * Set the group title
     * @param {String} title The title of the group
     * @returns {Group} Returns self
     */
    setTitle(title) {
        this.vault.format.setGroupTitle(this.id, title);
        return this;
    }
}

module.exports = Group;
