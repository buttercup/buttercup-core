"use strict";

const EntryProperty = {
    Password:                     "password",
    Title:                        "title",
    Username:                     "username"
};

/**
 * Entry facade data field
 * @typedef {Object} EntryFacadeField
 * @property {String} title - The user-friendly title of the field
 * @property {String} field - The type of data to map back to on the Entry instance (property/meta/attribute)
 * @property {String} property - The property name within the field type of the Entry instance
 * @property {String} value - The value of the property (read/write)
 * @property {Boolean} secret - Wether or not the value should be hidden while viewing (masked)
 * @property {Boolean} multiline - Whether the value should be edited as a multiline value or not
 * @property {Object|Boolean} formatting - Vendor formatting options object, or false if no formatting necessary
 */

function createFieldDescriptor(
        entry, title, entryPropertyType, entryPropertyName,
        { multiline = false, secret = false, formatting = false } = {}
    ) {
    const value = getEntryValue(entry, entryPropertyType, entryPropertyName);
    return {
        title,
        field: entryPropertyType,
        property: entryPropertyName,
        value,
        secret,
        multiline,
        formatting
    };
}

function getEntryValue(entry, property, name) {
    switch (property) {
        case "property":
            return entry.getProperty(name);
        case "meta":
            return entry.getMeta(name);
        case "attribute":
            return entry.getAttribute(name);
        default:
            throw new Error(`Cannot retrieve value: Unknown property type: ${property}`);
    }
}

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
    createFieldDescriptor,
    getEntryValue,
    getValidProperties,
    isValidProperty
};
