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
            throw new Error(`Unknown property type: ${property}`);
    }
}

module.exports = {
    createFieldDescriptor
};
