(function(module) {

    "use strict";

    var searching = module.exports = {

        /**
         * Find entry instances by filtering with a compare function
         * @param {Array.<Group>} groups
         * @param {Function} compareFn The callback comparison function, return true to keep and false
         *  to strip
         * @returns {Array.<Entry>}
         */
        findEntriesByCheck: function(groups, compareFn) {
            var foundEntries = [],
                newEntries;
            groups.forEach(function(group) {
                newEntries = group.getEntries().filter(compareFn);
                if (newEntries.length > 0) {
                    foundEntries = foundEntries.concat(newEntries);
                }
                newEntries = searching.findEntriesByCheck(group.getGroups(), compareFn);
                if (newEntries.length > 0) {
                    foundEntries = foundEntries.concat(newEntries);
                }
            });
            return foundEntries;
        },

        /**
         * Find group instances within groups that satisfy some check
         * @param {Array.<Group>} groups
         * @param {Function} compareFn A comparision function - return true to keep, false to strip
         * @returns {Array.<Group>}
         */
        findGroupsByCheck: function(groups, compareFn) {
            var foundGroups = groups.filter(compareFn);
            groups.forEach(function(group) {
                var subFound = searching.findGroupsByCheck(group.getGroups(), compareFn);
                if (subFound.length > 0) {
                    foundGroups = foundGroups.concat(subFound);
                }
            });
            return foundGroups;
        }

    };

})(module);
