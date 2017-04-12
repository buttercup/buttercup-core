"use strict";

class StorageInterface {

    getValue(/* name */) {
        return Promise.resolve(null);
    }

    setValue(/* name, value */) {
        return Promise.resolve();
    }

}

module.exports = StorageInterface;
