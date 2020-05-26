const EventEmitter = require("eventemitter3");
const { getDefaultFormat } = require("../io/formatRouter.js");
const { findGroupByID, findGroupsByTitle } = require("../search/groups.js");
const { findEntriesByProperty, findEntryByID } = require("../search/entries.js");
const Group = require("./Group.js");

class Vault extends EventEmitter {
    /**
     * Create a new archive instance from a list of commands (history)
     * @param {Array.<String>} history The command list
     * @param {VaultFormat=} format Optional vault format override
     * @returns {Vault} The vault instance
     * @static
     * @memberof Vault
     */
    static createFromHistory(history, format = getDefaultFormat()) {
        const vault = new Vault(format);
        vault.format.erase();
        vault.format.execute(history);
        vault.format.dirty = false;
        if (!vault.id) {
            vault.format.generateID();
        }
        return vault;
    }

    /**
     * Create a Vault with the default template
     * @returns {Vault} The new vault
     * @memberof Vault
     * @static
     */
    static createWithDefaults() {
        const vault = new Vault();
        vault.createGroup("General");
        vault.createGroup("Trash").setAttribute(Group.Attribute.Role, "trash");
        return vault;
    }

    _dataset = {};

    get id() {
        return this._dataset.id;
    }

    get readOnly() {
        return this.format.readOnly;
    }

    get type() {
        return "Vault";
    }

    /**
     * Create a new Vault instance
     * @param {VaultFormat=} Format Optional vault format specification.
     *  Will use the default system format (recommended) if not
     *  specified.
     */
    constructor(Format = getDefaultFormat()) {
        super();
        this.format = new Format(this._dataset);
        this.format.on("commandsExecuted", () => {
            this.emit("vaultUpdated");
        });
        this.format.initialise();
    }

    /**
     * Create a new group
     * @param {String=} title The title for the group
     * @returns {Group} The newly created group
     * @memberof Vault
     */
    createGroup(title) {
        const group = Group.createNew(this);
        if (title) {
            group.setTitle(title);
        }
        return group;
    }

    /**
     * Delete an attribute
     * @param {String} attribute The name of the attribute to delete
     * @returns {Vault} Self
     * @memberof Vault
     */
    deleteAttribute(attribute) {
        this.format.deleteVaultAttribute(attribute);
        return this;
    }

    /**
     * Remove all entries and groups from the trash (permanent)
     * - does nothing if no trash group
     * @returns {Vault} Self
     * @memberof Vault
     */
    emptyTrash() {
        const trash = this.getTrashGroup();
        if (!trash) return;
        trash.getGroups().forEach(group => {
            group.delete(/* skip trash */ true);
        });
        trash.getEntries().forEach(entry => {
            entry.delete(/* skip trash */ true);
        });
        return this;
    }

    /**
     * Find an entry by its ID
     * @param {String} id The ID to search for
     * @returns {null|Entry} Null if not found, or the Entry instance
     * @memberof Vault
     */
    findEntryByID(id) {
        return findEntryByID(this.getGroups(), id);
    }

    /**
     * Find all entries that match a certain property
     * @name findEntriesByProperty
     * @param {RegExp|String} property The property to search with
     * @param {RegExp|String} value The value to search for
     * @returns {Array.<Entry>} An array of found extries
     * @memberof Vault
     */
    findEntriesByProperty(property, value) {
        return findEntriesByProperty(this.getGroups(), property, value);
    }

    /**
     * Find a group by its ID
     * @param {String} id The group ID to search for
     * @returns {Group|null} The group or null if not found
     * @memberof Vault
     */
    findGroupByID(id) {
        return findGroupByID(this.getGroups(), id);
    }

    /**
     * Find groups by their title
     * @name findGroupsByTitle
     * @param {String|RegExp} title The group title
     * @returns {Array.<Group>} An array of groups
     * @memberof Vault
     */
    findGroupsByTitle(title) {
        return findGroupsByTitle(this.getGroups(), title);
    }

    /**
     * Get the value of an attribute
     * @param {String=} attributeName The attribute to get
     * @returns {undefined|String|Object} The value of the attribute or undefined if not
     *  set. Returns an object if no attribute name is given.
     * @memberof Vault
     */
    getAttribute(attributeName) {
        const dataset = this._dataset;
        if (!attributeName) {
            return Object.assign({}, dataset.attributes || {});
        }
        if (dataset.attributes && dataset.attributes.hasOwnProperty(attributeName)) {
            return dataset.attributes[attributeName];
        }
        return undefined;
    }

    /**
     * Get the top-level groups in the vault
     * @returns {Array.<Group>}
     * @memberof Vault
     */
    getGroups() {
        return (this._dataset.groups || []).map(rawGroup => new Group(this, rawGroup));
    }

    /**
     * Get the trash group
     * @returns {Group|null} The trash group or null if it doesn't
     *  exist
     * @memberof Vault
     */
    getTrashGroup() {
        const trashGroup = this.getGroups().find(group => group.isTrash());
        return trashGroup || null;
    }

    /**
     * Set an attribute on the vault
     * @param {String} attribute The attribute to set
     * @param {String} value The value to set for the attribute
     * @returns {Vault} Self
     * @memberof Vault
     */
    setAttribute(attribute, value) {
        this.format.setVaultAttribute(attribute, value);
        return this;
    }
}

module.exports = Vault;
