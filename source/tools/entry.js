"use strict";

const EntryProperty = {
    Password:                     "password",
    Title:                        "title",
    Username:                     "username"
};

function getValidProperties() {
    var props = [];
    for (var keyName in EntryProperty) {
        if (EntryProperty.hasOwnProperty(keyName)) {
            props.push(EntryProperty[keyName]);
        }
    }
    return props;
}

function isValidProperty(name) {
    for (var keyName in EntryProperty) {
        if (EntryProperty.hasOwnProperty(keyName)) {
            if (EntryProperty[keyName] === name) {
                return true;
            }
        }
    }
    return false;
}

module.exports = {
    getValidProperties,
    isValidProperty
};
