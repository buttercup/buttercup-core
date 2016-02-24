(function(module) {

    "use strict";

    var searching = module.exports = {

        /**
         * Find group instances within groups that satisfy some check
         * @param {Array.<ManagedGroup>} groups
         * @param {Function} compareFn A comparision function - return true to keep, false to strip
         * @returns {Array.<ManagedGroup>}
         */
        findGroupsByCheck: function(groups, compareFn) {
            var foundGroups = groups.filter(compareFn);
            groups.forEach(function(group) {
                var subFound = searching.findGroupsByCheck(group.getGroups(), compareFn);
                if (subFound.length > 0) {
                    foundGroups = foundGroups.concat(subFound);
                }
                // var subGroups = group.getGroups(),
                //     subLen = subGroups.length;
                // if (subLen > 0) {
                //     var subFound = searching.findGroupsByCheck(subGroups, compareFn);
                //     if ()
                // }
            });
            return foundGroups;
            // return []
            //     // Filter out any non-matching groups
            //     .concat(groups.filter(compareFn))
            //     // Map each group to a recursive search of its subgroups
            //     .concat(groups
            //         .map(function(group) {
            //             var subGroups = group.getGroups();
            //             return (subGroups.length > 0) ?
            //                 // Subgroups exist, recurse
            //                 searching.findGroupsByCheck(subGroups, compareFn) :
            //                 null;
            //         })
            //         .filter(function(subGroups) {
            //             return subGroups !== null;
            //         })
            //     );
        }

    };

})(module);
