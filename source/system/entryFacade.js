const Entry = require("./Entry.js");
const facadeFieldFactories = require("./entryFacadeFields.js");
const { createFieldDescriptor } = require("../tools/entry.js");

function addMetaFieldsNonDestructive(entry, fields) {
    const exists = metaName => fields.find(item => item.field === "meta" && item.property === metaName);
    const meta = entry.toObject().meta || {};
    return [
        ...fields,
        ...Object.keys(meta)
            .filter(name => !exists(name))
            .map(name => createFieldDescriptor(
                entry,  // Entry instance
                name,   // Title
                "meta", // Type
                name    // Property name
            ))
    ];
}

/**
 * Entry facade for data input
 * @typedef {Object} EntryFacade
 * @property {String} type - The type of the facade
 * @property {Array.<EntryFacadeField>} fields - An array of fields
 */

/**
 * Apply a facade field descriptor to an entry
 * Takes data from the descriptor and writes it to the entry.
 * @param {Entry} entry The entry to apply to
 * @param {EntryFacadeField} descriptor The descriptor object
 */
function applyFieldDescriptor(entry, descriptor) {
    setEntryValue(entry, descriptor.field, descriptor.property, descriptor.value);
}

/**
 * Process a modified entry facade
 * @param {Entry} entry The entry to apply processed data on
 * @param {EntryFacade} facade The facade object
 */
function consumeEntryFacade(entry, facade) {
    const facadeType = getEntryFacadeType(entry);
    if (facade && facade.type) {
        const meta = entry.getMeta();
        const attributes = entry.getAttribute();
        if (facade.type !== facadeType) {
            throw new Error(`Failed consuming entry data: Expected type "${facadeType}" but received "${facade.type}"`);
        }
        // update data
        (facade.fields || []).forEach(field => applyFieldDescriptor(entry, field));
        // remove missing meta
        Object.keys(meta).forEach(metaKey => {
            const correspondingField = facade.fields.find(({ field, property }) =>
                field === "meta" && property === metaKey);
            if (typeof correspondingField === "undefined") {
                entry.deleteMeta(metaKey);
            }
        });
        // remove missing attributes
        Object.keys(attributes).forEach(attrKey => {
            const correspondingField = facade.fields.find(({ field, property }) =>
                field === "attribute" && property === attrKey);
            if (typeof correspondingField === "undefined") {
                entry.deleteAttribute(attrKey);
            }
        });
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
    const fields = createFields(entry);
    return {
        type: facadeType,
        fields: addMetaFieldsNonDestructive(entry, fields)
    };
}

/**
 * Get the facade type for an entry
 * @param {Entry} entry The entry instance
 * @returns {String} The facade type
 */
function getEntryFacadeType(entry) {
    return entry.getAttribute(Entry.Attributes.FacadeType) || "login";
}

/**
 * Set a value on an entry
 * @param {Entry} entry The entry instance
 * @param {String} property Type of property ("property"/"meta"/"attribute")
 * @param {String} name The property name
 * @param {String} value The value to set
 * @throws {Error} Throws if the property type is not recognised
 */
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
