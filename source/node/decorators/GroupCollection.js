const instanceSearching = require("../tools/searching-instance.js");

/**
 * @typedef {Object} GroupCollection
 * @mixin
 */

module.exports = {
    decorate: function(inst) {
        /**
         * Find a group by its ID
         * @returns {Group|null} The group or null if not found
         * @memberof GroupCollection
         * @param {String} id The group ID to search for
         * @name findGroupByID
         */
        inst.findGroupByID = function findGroupByID(id) {
            let foundGroups = instanceSearching.findGroupsByCheck(inst.getGroups(), function(group) {
                return group.getID() === id;
            });
            return foundGroups && foundGroups.length === 1 ? foundGroups[0] : null;
        };

        /**
         * Find groups by their title
         * @name findGroupsByTitle
         * @memberof GroupCollection
         * @param {String|RegExp} title The group title
         * @returns {Array.<Group>} An array of groups
         */
        inst.findGroupsByTitle = function findGroupsByTitle(title) {
            return instanceSearching.findGroupsByCheck(inst.getGroups(), function(group) {
                if (title instanceof RegExp) {
                    return title.test(group.getTitle());
                } else {
                    return group.getTitle().indexOf(title) >= 0;
                }
            });
        };
    }
};
