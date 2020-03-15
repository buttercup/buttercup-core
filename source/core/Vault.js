const EventEmitter = require("eventemitter3");
const { getDefaultFormat } = require("../io/formatRouter.js");
const { findGroupByID, findGroupsByTitle } = require("../search/groups.js");
const { findEntriesByProperty, findEntryByID } = require("../search/entries.js");

class Vault extends EventEmitter {
    _dataset = {};

    get id() {
        return this._dataset.id;
    }

    constructor(Format = getDefaultFormat()) {
        super();
        this.format = new Format(this._dataset);
        this.format.on("commandsExecuted", () => {
            this.emit("vaultUpdated");
        });
        this.format.initialise();
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

    getGroups() {
        // @todo groups
        return [];
    }
}
