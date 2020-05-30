const StorageInterface = require("./StorageInterface.js");

/**
 * Storage interface for memory storage
 * @augments StorageInterface
 * @memberof module:Buttercup
 */
class MemoryStorageInterface extends StorageInterface {
    /**
     * Constructor for the memory storage
     */
    constructor() {
        super();
        this._store = {};
    }

    /**
     * Get all keys from storage
     * @returns {Promise.<Array.<String>>} A promise that resolves with an array of keys
     * @memberof MemoryStorageInterface
     */
    getAllKeys() {
        return Promise.resolve(Object.keys(this._store));
    }

    /**
     * Get the value of a key
     * @param {String} name The key name
     * @returns {Promise.<String>} A promise that resolves with the value
     * @memberof MemoryStorageInterface
     */
    getValue(name) {
        const value = this._store.hasOwnProperty(name) ? this._store[name] : null;
        return Promise.resolve(value);
    }

    /**
     * Remove a key
     * @param {String} name The key name
     * @returns {Promise} A promise that resolves when the removal has completed
     * @memberof MemoryStorageInterface
     */
    removeKey(name) {
        this._store[name] = undefined;
        delete this._store[name];
        return Promise.resolve();
    }

    /**
     * Set the value for a key
     * @param {String} name The key name
     * @param {String} value The value to set
     * @returns {Promise} A promise that resolves when the value is set
     * @memberof MemoryStorageInterface
     */
    setValue(name, value) {
        this._store[name] = value;
        return Promise.resolve();
    }
}

module.exports = MemoryStorageInterface;
