import StorageInterface from "../storage/StorageInterface";

function getStorage(): Storage {
    return window.localStorage;
}

/**
 * Interface for localStorage
 * @augments StorageInterface
 */
export default class LocalStorageInterface extends StorageInterface {
    _storage: Storage = getStorage();

    get storage() {
        return this._storage;
    }

    /**
     * Get all keys from storage
     * @returns A promise that resolves with an array of keys
     */
    getAllKeys() {
        return Promise.resolve(Object.keys(this.storage));
    }

    /**
     * Get the value of a key
     * @param name The key name
     * @returns A promise that resolves with the value
     */
    getValue(name: string): Promise<string> {
        const value = this.storage.getItem(name);
        return Promise.resolve(value);
    }

    /**
     * Remove a key
     * @param name The key name
     * @returns A promise that resolves when the removal has completed
     */
    removeKey(name: string): Promise<void> {
        this.storage.removeItem(name);
        return Promise.resolve();
    }

    /**
     * Set the value for a key
     * @param name The key name
     * @param value The value to set
     * @returns A promise that resolves when the value is set
     */
    setValue(name: string, value: string): Promise<void> {
        this.storage.setItem(name, value);
        return Promise.resolve();
    }
}
