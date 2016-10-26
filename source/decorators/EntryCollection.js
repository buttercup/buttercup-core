var instanceSearching = require("../tools/searching-instance.js");

/**
 * Find entries by searching properties/meta
 * @param {Archive} archive The target archive
 * @param {string} check Information to check (property/meta)
 * @param {string} key The key (property/meta-value) to search with
 * @param {RegExp|string} value The value to search for
 * @returns {Array.<Entry>} An array of found entries
 * @private
 * @static
 * @memberof EntryCollection
 */
function findEntriesByCheck(archive, check, key, value) {
    return instanceSearching.findEntriesByCheck(
        archive.getGroups(),
        function(entry) {
            var itemValue = (check === "property") ?
                entry.getProperty(key) || "" :
                entry.getMeta(key) || "";
            if (value instanceof RegExp) {
                return value.test(itemValue);
            } else {
                return itemValue.indexOf(value) >= 0;
            }
        }
    );
}

/**
 * @typedef {Object} EntryCollection
 * @mixin
 */

module.exports = {

    decorateDeep: function(inst) {

        /**
         * Find entries that match a certain meta property
         * @name findEntriesByMeta
         * @param {string} metaName The meta property to search for
         * @param {RegExp|string} value The value to search for
         * @returns {Array.<Entry>} An array of found entries
         * @memberof EntryCollection
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
        inst.findEntriesByProperty = function findEntriesByProperty(property, value) {
            return findEntriesByCheck(inst, "property", property, value);
        };

    }

};
