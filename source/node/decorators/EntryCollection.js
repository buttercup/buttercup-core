const instanceSearching = require("../tools/vaultSearch.js");

/**
 * Find entries by searching properties
 * When used within a group, that group's entries are also searched'
 * @param {Archive|Group} groupParent The target archive or group
 * @param {string} check Information to check (id/property)
 * @param {string} key The key (property) to search with (not needed for check=id)
 * @param {RegExp|string} value The value to search for
 * @returns {Array.<Entry>} An array of found entries
 * @private
 * @static
 * @memberof EntryCollection
 */
function findEntriesByCheck(groupParent, check, key, value) {
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
            case "id": {
                return value === entry.id;
            }
            default:
                throw new Error(`Unknown check instruction: ${check}`);
        }
        if (value instanceof RegExp) {
            return value.test(itemValue);
        } else {
            return itemValue.indexOf(value) >= 0;
        }
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
            let entries = findEntriesByCheck(inst, "id", null, id);
            return entries && entries.length === 1 ? entries[0] : null;
        };

        /**
         * Find all entries that match a certain property
         * @name findEntriesByProperty
         * @param {string} property The property to search with
         * @param {RegExp|string} value The value to search for
         * @returns {Array.<Entry>} An array of found extries
         * @memberof EntryCollection
         */
        inst.findEntriesByProperty = function findEntriesByProperty(property, value) {
            return findEntriesByCheck(inst, "property", property, value);
        };
    }
};
