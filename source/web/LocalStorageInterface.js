const StorageInterface = require("../node/storage/StorageInterface.js");

function getStorage() {
    return window.localStorage;
}

/**
 * Interface for localStorage
 * @augments StorageInterface
 */
class LocalStorageInterface extends StorageInterface {
    constructor() {
        super();
        this._storage = getStorage();
    }

    get storage() {
        return this._storage;
    }

    /**
     * Get all keys from storage
     * @returns {Promise.<Array.<String>>} A promise that resolves with an array of keys
     */
    getAllKeys() {
        return Promise.resolve(Object.keys(this.storage));
    }

    /**
     * Get the value of a key
     * @param {String} name The key name
     * @returns {Promise.<String>} A promise that resolves with the value
     */
    getValue(name) {
        const value = this.storage.getItem(name);
        return Promise.resolve(value);
    }

    /**
     * Remove a key
     * @param {String} name The key name
     * @returns {Promise} A promise that resolves when the removal has completed
     */
    removeKey(name) {
        this.storage.removeItem(name);
        return Promise.resolve();
    }

    /**
     * Set the value for a key
     * @param {String} name The key name
     * @param {String} value The value to set
     * @returns {Promise} A promise that resolves when the value is set
     */
    setValue(name, value) {
        this.storage.setItem(name, value);
        return Promise.resolve();
    }
}

module.exports = LocalStorageInterface;
