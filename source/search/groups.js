function findGroupByID(parentGroups, groupID) {
    const foundGroups = findGroupsByCheck(parentGroups, group => group.id === groupID);
    return foundGroups && foundGroups.length >= 1 ? foundGroups[0] : null;
}

/**
 * Find group instances within groups that satisfy some check
 * @param {Array.<Group>} groups The groups to check within
 * @param {Function} compareFn A comparision function - return true to keep, false to strip
 * @returns {Array.<Group>} An array of found groups
 */
function findGroupsByCheck(groups, compareFn) {
    const foundGroups = groups.filter(compareFn);
    groups.forEach(group => {
        const subFound = findGroupsByCheck(group.getGroups(), compareFn);
        if (subFound.length > 0) {
            foundGroups.push(...subFound);
        }
    });
    return foundGroups;
}

function findGroupsByTitle(parentGroups, title) {
    return findGroupsByCheck(parentGroups, group => {
        if (title instanceof RegExp) {
            return title.test(group.getTitle());
        }
        return group.getTitle().indexOf(title) >= 0;
    });
}

module.exports = {
    findGroupByID,
    findGroupsByTitle
};
