"use strict";

var instanceSearching = require("../tools/searching-instance.js");

/**
 * @typedef {Object} GroupCollection
 * @mixin
 */

module.exports = {

    decorate: function(inst) {

        /**
         * Find groups by their title
         * @name findGroupsByTitle
         * @memberof GroupCollection
         * @param {String|RegExp} title The group title
         * @returns {Array.<Group>} An array of groups
         */
        inst.findGroupsByTitle = function findGroupsByTitle(title) {
            return instanceSearching.findGroupsByCheck(
                inst.getGroups(),
                function(group) {
                    if (title instanceof RegExp) {
                        return title.test(group.getTitle());
                    } else {
                        return group.getTitle().indexOf(title) >= 0;
                    }
                }
            );
        };

    }

};
