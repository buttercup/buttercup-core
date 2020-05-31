const { v4: uuid } = require("uuid");
const { isOTPURI } = require("./detection.js");
const {
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_OTP,
    FIELD_VALUE_TYPE_PASSWORD,
    FIELD_VALUE_TYPE_TEXT
} = require("./symbols.js");

const VALID_VALUE_TYPES = [
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_OTP,
    FIELD_VALUE_TYPE_PASSWORD,
    FIELD_VALUE_TYPE_TEXT
];

/**
 * @typedef {Object} EntryFacadeFieldFormattingSegment
 * @property {RegExp=} char - A character to match with a regular expression
 * @property {Number=} repeat - Number of times to repeat the character match (required for `char`)
 * @property {String=} exactly - The exact character match (operates in opposition to `char`)
 */

/**
 * @typedef {Object} EntryFacadeFieldFormatting
 * @property {Array.<EntryFacadeFieldFormattingSegment>=} format - The segmented formatting of the value
 * @property {String=} placeholder - Optional placeholder for the input (ties in to `format`)
 * @property {Object|Array=} options - Options for a dropdown: either an array of option values or an object
 *  (key:value) of values and titles
 * @property {String=} defaultOption - The default option value if none set
 */

/**
 * Entry facade data field
 * @typedef {Object} EntryFacadeField
 * @property {String} id - A randomly generated ID (UUID) for identifying this field during editing
 * @property {String} title - The user-friendly title of the field
 * @property {String} propertyType - The type of data to map back to on the Entry instance (property/attribute)
 * @property {String} property - The property name within the field type of the Entry instance
 * @property {String} value - The value of the property (read/write)
 * @property {String=} valueType - The type of value (rendering) (null for attributes)
 * @property {EntryFacadeFieldFormatting|Boolean} formatting - Vendor formatting options object, or false if no formatting necessary
 * @property {Boolean} removeable - Whether or not the field can be removed or have its key changed
 */

/**
 * Create a descriptor for a field to be used within a facade
 * @param {Entry|null} entry The entry instance to process or null if the initial value
 *  should be empty
 * @param {String} title The field title
 * @param {String} entryPropertyType The type of entry property (property/attribute)
 * @param {String} entryPropertyName The name of the property
 * @param {Object} options The options for the field
 * @returns {EntryFacadeField} The field descriptor
 * @memberof module:Buttercup
 */
function createFieldDescriptor(
    entry,
    title,
    entryPropertyType,
    entryPropertyName,
    { formatting = false, removeable = false, valueType = null } = {}
) {
    const value = entry ? getEntryValue(entry, entryPropertyType, entryPropertyName) : "";
    // Return descriptor
    return {
        id: uuid(),
        title,
        propertyType: entryPropertyType,
        property: entryPropertyName,
        value,
        valueType: valueType
            ? valueType
            : entryPropertyType === "attribute"
            ? null
            : getEntryValueType(entry, entryPropertyName),
        formatting,
        removeable
    };
}

/**
 * Get a value on an entry for a specific property type
 * @param {Entry} entry The entry instance
 * @param {String} propertyType The type of entry property (property/attribute)
 * @param {String} name The property name
 * @returns {String} The property value
 * @throws {Error} Throws for unknown property types
 * @deprecated Not in use - To be removed
 */
function getEntryValue(entry, propertyType, name) {
    switch (propertyType) {
        case "property":
            return entry.getProperty(name);
        case "attribute":
            return entry.getAttribute(name);
        default:
            throw new Error(`Cannot retrieve value: Unknown property type: ${propertyType}`);
    }
}

/**
 * Get the entry value type
 * @param {Entry|null} entry Entry instance
 * @param {String} propertyName The entry property name
 * @returns {String} The entry value type (returns default "text"
 *  if entry not specified)
 */
function getEntryValueType(entry, propertyName) {
    if (!entry) {
        return FIELD_VALUE_TYPE_TEXT;
    }
    const Entry = require("../core/Entry.js");
    const type = entry.getAttribute(`${Entry.Attributes.FieldTypePrefix}${propertyName}`);
    return VALID_VALUE_TYPES.indexOf(type) >= 0 ? type : FIELD_VALUE_TYPE_TEXT;
}

/**
 * Check if an ID signifies a new instance and not an
 *  existing one
 * @param {String|Number} id The ID to check
 * @returns {Boolean}
 */
function idSignifiesNew(id) {
    if (/^\d+$/.test(id) === false) return false;
    const numerical = parseInt(id, 10);
    return !isNaN(numerical) && numerical > 0 && numerical <= 999999;
}

/**
 * Set the value type attribute of an entry
 * @param {Entry} entry Entry instance
 * @param {String} propertyName The property name
 * @param {String} valueType The value type
 */
function setEntryValueType(entry, propertyName, valueType) {
    const Entry = require("../core/Entry.js");
    entry.setAttribute(`${Entry.Attributes.FieldTypePrefix}${propertyName}`, valueType);
}

module.exports = {
    createFieldDescriptor,
    getEntryValue,
    getEntryValueType,
    idSignifiesNew,
    setEntryValueType
};
