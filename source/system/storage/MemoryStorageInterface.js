"use strict";

const StorageInterface = require("./StorageInterface.js");

class MemoryStorageInterface extends StorageInterface {

    constructor() {
        super();
        this._store = {};
    }

    getValue(name) {
        const value = this._store.hasOwnProperty(name) ?
            this._store[name] :
            null;
        return Promise.resolve(value);
    }

    setValue(name, value) {
        this._store[name] = value;
        return Promise.resolve();
    }

}

module.exports = MemoryStorageInterface;
