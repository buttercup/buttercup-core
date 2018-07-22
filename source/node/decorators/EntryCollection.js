const instanceSearching = require("../tools/searching-instance.js");

/**
 * Find entries by searching properties/meta
 * When used within a group, that group's entries are also searched'
 * @param {Archive|Group} groupParent The target archive or group
 * @param {string} check Information to check (id/property)
 * @param {string} key The key (property/meta-value) to search with (not needed for check=id)
 * @param {RegExp|string} value The value to search for
 * @param {Boolean=} exact Match string values entirely (default: false)
 * @returns {Array.<Entry>} An array of found entries
 * @private
 * @static
 * @memberof EntryCollection
 */
function findEntriesByCheck(groupParent, check, key, value, exact = false) {
    // If the groupParent object is a Group, use it as the only search group,
    // otherwise just take the children groups (groupParent is probably an
    // Archive instance):
    let groups = groupParent.getEntries ? [groupParent] : groupParent.getGroups();
    return instanceSearching.findEntriesByCheck(groups, function(entry) {
        var itemValue;
        switch (check) {
            case "property": {
                itemValue = entry.getProperty(key) || "";
                break;
            }
            case "meta": {
                itemValue = entry.getMeta(key) || "";
                break;
            }
            case "id": {
                return value === entry.id;
            }
            default:
                throw new Error(`Unknown check instruction: ${check}`);
        }
        if (value instanceof RegExp) {
            return value.test(itemValue);
        }
        return exact ? itemValue === value : itemValue.indexOf(value) >= 0;
    });
}

/**
 * @typedef {Object} EntryCollection
 * @mixin
 */

module.exports = {
    decorate: function(inst) {
        /**
         * Find an entry by its ID
         * @param {String} id The ID to search for
         * @returns {null|Entry} Null if not found, or the Entry instance
         * @memberof EntryCollection
         */
        inst.findEntryByID = function findEntryByID(id) {
            const entries = findEntriesByCheck(inst, "id", null, id);
            return entries && entries.length === 1 ? entries[0] : null;
        };

        /**
         * Find entries that match a certain meta property
         * @name findEntriesByMeta
         * @param {String} metaName The meta property to search for
         * @param {RegExp|string} value The value to search for
         * @returns {Array.<Entry>} An array of found entries
         * @memberof EntryCollection
         * @deprecated Meta is deprecated: Use properties instead
         */
        inst.findEntriesByMeta = function findEntriesByMeta(metaName, value) {
            return findEntriesByCheck(inst, "meta", metaName, value);
        };

        /**
         * Find all entries that match a certain property
         * @name findEntriesByProperty
         * @param {string} property The property to search with
         * @param {RegExp|string} value The value to search for
         * @returns {Array.<Entry>} An array of found extries
         * @memberof EntryCollection
         */
        inst.findEntriesByProperty = function findEntriesByProperty(property, value, exact = false) {
            return findEntriesByCheck(inst, "property", property, value, exact);
        };
    }
};
