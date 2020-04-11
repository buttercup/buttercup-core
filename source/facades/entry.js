const facadeFieldFactories = require("./entryFields.js");
const { createFieldDescriptor, getEntryValueType, setEntryValueType } = require("./tools.js");
const { ENTRY_TYPE_LOGIN } = require("./symbols.js");
const Entry = require("../core/Entry.js");

const { FacadeType: FacadeTypeAttribute } = Entry.Attributes;

/**
 * Add extra fields to a fields array that are not mentioned in a preset
 * Facades are creaded by presets which don't mention all property values (custom user
 * added items). This method adds the unmentioned items to the facade fields so that
 * they can be edited as well.
 * @param {Entry} entry An Entry instance
 * @param {Array.<EntryFacadeField>} fields An array of fields
 * @returns {Array.<EntryFacadeField>} A new array with all combined fields
 */
function addExtraFieldsNonDestructive(entry, fields) {
    const exists = (propName, fieldType) =>
        fields.find(item => item.propertyType === fieldType && item.property === propName);
    const { properties = {}, attributes = {} } = entry._source;
    return [
        ...fields,
        ...Object.keys(properties)
            .filter(name => !exists(name, "property"))
            .map(name =>
                createFieldDescriptor(
                    entry, // Entry instance
                    "", // Title
                    "property", // Type
                    name, // Property name
                    { removeable: true }
                )
            ),
        ...Object.keys(attributes)
            .filter(name => !exists(name, "attribute"))
            .map(name =>
                createFieldDescriptor(
                    entry, // Entry instance
                    "", // Title
                    "attribute", // Type
                    name // Property name
                )
            )
    ];
}

/**
 * @typedef {Object} EntryHistoryItem
 * @property {String} property The property/attribute name
 * @property {String} propertyType Either "property" or "attribute"
 * @property {String|null} originalValue The original value or null if it did not exist
 *  before this change
 * @property {String|null} newValue The new value or null if it was deleted
 */

/**
 * Entry facade for data input
 * @typedef {Object} EntryFacade
 * @property {String} id - The entry ID
 * @property {String} type - The type of the facade
 * @property {Array.<EntryFacadeField>} fields - An array of fields
 * @property {String} parentID - The parent group ID
 * @property {Array.<EntryHistoryItem>} _history - Array of changes for all properties of
 *  the entry
 */

/**
 * Apply a facade field descriptor to an entry
 * Takes data from the descriptor and writes it to the entry.
 * @param {Entry} entry The entry to apply to
 * @param {EntryFacadeField} descriptor The descriptor object
 */
function applyFieldDescriptor(entry, descriptor) {
    setEntryValue(entry, descriptor.propertyType, descriptor.property, descriptor.value, descriptor.valueType);
}

/**
 * Process a modified entry facade
 * @param {Entry} entry The entry to apply processed data on
 * @param {EntryFacade} facade The facade object
 */
function consumeEntryFacade(entry, facade) {
    const facadeType = getEntryFacadeType(entry);
    if (facade && facade.type) {
        const properties = entry.getProperty();
        const attributes = entry.getAttribute();
        if (facade.type !== facadeType) {
            console.log("CONSUME", facade.type, facadeType, entry, facade);
            throw new Error(`Failed consuming entry data: Expected type "${facadeType}" but received "${facade.type}"`);
        }
        // update data
        (facade.fields || []).forEach(field => applyFieldDescriptor(entry, field));
        // remove missing properties
        Object.keys(properties).forEach(propKey => {
            const correspondingField = facade.fields.find(
                ({ propertyType, property }) => propertyType === "property" && property === propKey
            );
            if (typeof correspondingField === "undefined") {
                entry.deleteProperty(propKey);
            }
        });
        // remove missing attributes
        Object.keys(attributes).forEach(attrKey => {
            const correspondingField = facade.fields.find(
                ({ propertyType, property }) => propertyType === "attribute" && property === attrKey
            );
            if (typeof correspondingField === "undefined") {
                entry.deleteAttribute(attrKey);
            }
        });
        return;
    }
    throw new Error("Failed consuming entry data: Invalid item passed as a facade");
}

/**
 * @typedef {Object} CreateEntryFacadeOptions
 * @property {String=} type - Optionally override the created facade type
 */

/**
 * Create a data/input facade for an Entry instance
 * @param {Entry=} entry The Entry instance
 * @param {CreateEntryFacadeOptions=} ops Options for the entry facade creation
 * @returns {EntryFacade} A newly created facade
 */
function createEntryFacade(entry, { type } = {}) {
    if (entry && entry.type !== "Entry") {
        throw new Error("Failed creating entry facade: Provided item is not an Entry");
    }
    const facadeType = type || getEntryFacadeType(entry);
    const createFields = facadeFieldFactories[facadeType];
    if (!createFields) {
        throw new Error(`Failed creating entry facade: No factory found for type "${facadeType}"`);
    }
    const fields = entry ? addExtraFieldsNonDestructive(entry, createFields(entry)) : createFields(entry);
    if (!fields.find(field => field.propertyType === "attribute" && field.property === FacadeTypeAttribute)) {
        const entryTypeField = createFieldDescriptor(
            entry, // Entry instance
            "", // Title
            "attribute", // Type
            FacadeTypeAttribute // Property name
        );
        entryTypeField.value = facadeType;
        fields.push(entryTypeField);
    }
    return {
        id: entry ? entry.id : null,
        type: facadeType,
        fields,
        parentID: entry ? entry.getGroup().id : null,
        _history: entry ? entry.getChanges() : []
    };
}

/**
 * Get the facade type for an entry
 * @param {Entry} entry The entry instance
 * @returns {String} The facade type
 */
function getEntryFacadeType(entry) {
    if (!entry) {
        return "login";
    }
    return entry.getAttribute(FacadeTypeAttribute) || "login";
}

/**
 * Set a value on an entry
 * @param {Entry} entry The entry instance
 * @param {String} property Type of property ("property"/"meta"/"attribute")
 * @param {String} name The property name
 * @param {String} value The value to set
 * @param {String=} valueType Value type to set
 * @throws {Error} Throws if the property type is not recognised
 */
function setEntryValue(entry, property, name, value, valueType) {
    switch (property) {
        case "property":
            if (entry.getProperty(name) !== value) {
                // Only update if changed
                entry.setProperty(name, value);
            }
            break;
        case "attribute":
            if (entry.getAttribute(name) !== value) {
                // Only update if changed
                entry.setAttribute(name, value);
            }
            break;
        default:
            throw new Error(`Cannot set value: Unknown property type: ${property}`);
    }
    if (valueType && getEntryValueType(entry) !== valueType) {
        setEntryValueType(entry, name, valueType);
    }
}

module.exports = {
    consumeEntryFacade,
    createEntryFacade
};
