function applyFieldDescriptor(entry, descriptor) {
    setEntryValue(entry, descriptor.field, descriptor.name, descriptor.value);
}

function createFieldDescriptor(entry, title, entryPropertyType, entryPropertyName, protected = false) {
    const value = getEntryValue(entry, entryPropertyType, entryPropertyName);
    return {
        title,
        field: entryPropertyType,
        property: entryPropertyName,
        value,
        protected
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

function setEntryValue(entry, property, name, value) {
    switch (property) {
        case "property":
            return entry.setProperty(name, value);
        case "meta":
            return entry.setMeta(name, value);
        case "attribute":
            return entry.setAttribute(name, value);
        default:
            throw new Error(`Cannot set value: Unknown property type: ${property}`);
    }
}

module.exports = {
    applyFieldDescriptor,
    createFieldDescriptor
};
