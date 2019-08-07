function findEntryByID(groups, id) {
    for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
        var group = groups[i];
        if (group.entries) {
            for (var j = 0, entriesLen = group.entries.length; j < entriesLen; j += 1) {
                if (group.entries[j].id === id) {
                    return group.entries[j];
                }
            }
        }
        if (group.groups) {
            var deepEntry = findEntryByID(group.groups, id);
            if (deepEntry) {
                return deepEntry;
            }
        }
    }
    return null;
}

function findGroupByCheck(groups, checkFn) {
    for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
        if (checkFn(groups[i]) === true) {
            return groups[i];
        }
        if (groups[i].groups) {
            var deepGroup = findGroupByCheck(groups[i].groups, checkFn);
            if (deepGroup) {
                return deepGroup;
            }
        }
    }
    return null;
}

function findGroupByID(groups, id) {
    return findGroupByCheck(groups, function(group) {
        return group.id === id;
    });
}

function findGroupByTitle(groups, title) {
    return findGroupByCheck(groups, function(group) {
        return group.title === title;
    });
}

/**
 * @typedef {Object} FoundGroupResult
 * @property {Object} group The found group dataset
 * @property {Number} index The index the group was located at
 */

/**
 * Find a raw group that contains an entry with an ID
 * @param {Array.<Object>} groups An array of raw groups
 * @param {String} id The entry ID to search for
 * @returns {FoundGroupResult} The parent group of the found entry
 */
function findGroupContainingEntryID(groups, id) {
    for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
        var group = groups[i];
        if (group.entries) {
            for (var j = 0, entriesLen = group.entries.length; j < entriesLen; j += 1) {
                if (group.entries[j].id === id) {
                    return {
                        group: group,
                        index: j
                    };
                }
            }
        }
        if (group.groups) {
            var deepGroup = findGroupContainingEntryID(group.groups, id);
            if (deepGroup.group) {
                return deepGroup;
            }
        }
    }
    return {
        group: null,
        index: null
    };
}

/**
 * Find a raw group that contains a group with an ID
 * @param {Object} group The group/archive to search in
 * @param {String} id The group ID to search for
 * @returns {FoundGroupResult} The parent of the located group ID
 */
function findGroupContainingGroupID(group, id) {
    var groups = group.groups || [];
    for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
        if (groups[i].id === id) {
            return {
                group: group,
                index: i
            };
        }
        var deepGroup = findGroupContainingGroupID(groups[i], id);
        if (deepGroup.group) {
            return deepGroup;
        }
    }
    return {
        group: null,
        index: null
    };
}

module.exports = {
    findEntryByID,
    findGroupByCheck,
    findGroupByID,
    findGroupByTitle,
    findGroupContainingEntryID,
    findGroupContainingGroupID
};
