const Entry = require("./Entry.js");
const facadeFieldFactories = require("./entryFacadeFields.js");

/**
 * Entry facade for data input
 * @typedef {Object} EntryFacade
 * @property {String} type - The type of the facade
 * @property {Array.<EntryFacadeField>} fields - An array of fields
 */

function applyFieldDescriptor(entry, descriptor) {
    setEntryValue(entry, descriptor.field, descriptor.property, descriptor.value);
}

function consumeEntryFacade(entry, facade) {
    const facadeType = getEntryFacadeType(entry);
    if (facade && facade.type) {
        if (facade.type !== facadeType) {
            throw new Error(`Failed consuming entry data: Expected type "${facadeType}" but received "${facade.type}"`);
        }
        (facade.fields || []).forEach(field => applyFieldDescriptor(entry, field));
    } else {
        throw new Error("Failed consuming entry data: Invalid item passed as a facade");
    }
}

/**
 * Create a data/input facade for an Entry instance
 * @param {Entry} entry The Entry instance
 * @returns {EntryFacade} A newly created facade
 */
function createEntryFacade(entry) {
    if (entry instanceof Entry !== true) {
        throw new Error("Failed creating entry facade: Provided item is not an Entry");
    }
    const facadeType = getEntryFacadeType(entry);
    const createFields = facadeFieldFactories[facadeType];
    if (!createFields) {
        throw new Error(`Failed creating entry facade: No factory found for type "${facadeType}"`);
    }
    return {
        type: facadeType,
        fields: createFields(entry)
    };
}

function getEntryFacadeType(entry) {
    return entry.getAttribute(Entry.Attributes.FacadeType) || "login";
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
    consumeEntryFacade,
    createEntryFacade
};
