/**
 * Storage Interface (stub only)
 * @see MemoryStorageInterface
 * @memberof module:Buttercup
 */
class StorageInterface {
    /**
     * Get all keys as an array
     * @memberof StorageInterface
     */
    getAllKeys() {
        return Promise.resolve([]);
    }

    /**
     * Get a value for a key
     * @memberof StorageInterface
     */
    getValue(/* name */) {
        return Promise.resolve(null);
    }

    /**
     * Remove a value for a key
     * @memberof StorageInterface
     */
    removeKey(/* name */) {
        return Promise.resolve();
    }

    /**
     * Set a value for a key
     * @memberof StorageInterface
     */
    setValue(/* name, value */) {
        return Promise.resolve();
    }
}

module.exports = StorageInterface;
