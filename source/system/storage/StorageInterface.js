"use strict";

class StorageInterface {

    getAllKeys() {
        return Promise.resolve([]);
    }

    getValue(/* name */) {
        return Promise.resolve(null);
    }

    removeKey(/* name */) {
        return Promise.resolve();
    }

    setValue(/* name, value */) {
        return Promise.resolve();
    }

}

module.exports = StorageInterface;
