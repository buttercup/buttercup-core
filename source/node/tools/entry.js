const { objectValues } = require("./polyfill.js");

const ENTRY_URL_TYPE_ANY = "any";
const ENTRY_URL_TYPE_GENERAL = "general";
const ENTRY_URL_TYPE_ICON = "icon";
const ENTRY_URL_TYPE_LOGIN = "login";

const URL_PROP = /(^|[a-zA-Z0-9_-]|\b)(ur[li]|UR[LI]|Ur[li])(\b|$|[_-])/;
const URL_PROP_ICON = /icon[\s_-]*ur[li]/i;

/**
 * Get URLs from an entry's properties
 * Allows for preferential sorting
 * @param {Object} properties The entry properties
 * @param {*} preference
 */
function getEntryURLs(properties, preference = ENTRY_URL_TYPE_ANY) {
    const urlRef = Object.keys(properties)
        .filter(key => URL_PROP.test(key))
        .reduce(
            (output, nextKey) =>
                Object.assign(output, {
                    [nextKey]: properties[nextKey]
                }),
            {}
        );
    if (preference === ENTRY_URL_TYPE_GENERAL || preference === ENTRY_URL_TYPE_LOGIN) {
        return Object.keys(urlRef)
            .sort((a, b) => {
                if (preference === ENTRY_URL_TYPE_GENERAL) {
                    const general = /^ur[li]$/i;
                    const aVal = general.test(a) ? 1 : 0;
                    const bVal = general.test(b) ? 1 : 0;
                    return bVal - aVal;
                } else if (preference === ENTRY_URL_TYPE_LOGIN) {
                    const login = /login/i;
                    const aVal = login.test(a) ? 1 : 0;
                    const bVal = login.test(b) ? 1 : 0;
                    return bVal - aVal;
                }
                return 0;
            })
            .map(key => urlRef[key]);
    } else if (preference === ENTRY_URL_TYPE_ICON) {
        const iconProp = Object.keys(urlRef).find(key => URL_PROP_ICON.test(key));
        return iconProp ? [urlRef[iconProp]] : [];
    }
    // Default is "any" URLs
    return objectValues(urlRef);
}

/**
 * Get a value on an entry for a specific property type
 * @param {Entry} entry The entry instance
 * @param {String} property The type of entry property (property/meta/attribute)
 * @param {String} name The property name
 * @returns {String} The property value
 * @throws {Error} Throws for unknown property types
 * @deprecated Not in use - To be removed
 */
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

/**
 * Check if a property name is valid
 * @param {String} name The name to check
 * @returns {Boolean} True if the name is valid
 */
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
    ENTRY_URL_TYPE_ANY,
    ENTRY_URL_TYPE_GENERAL,
    ENTRY_URL_TYPE_ICON,
    ENTRY_URL_TYPE_LOGIN,
    getEntryURLs,
    getEntryValue,
    isValidProperty
};
