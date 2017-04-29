"use strict";

class StorageInterface {

    getAllKeys() {
        return Promise.resolve([]);
    }

    getValue(/* name */) {
        return Promise.resolve(null);
    }

    setValue(/* name, value */) {
        return Promise.resolve();
    }

}

module.exports = StorageInterface;
