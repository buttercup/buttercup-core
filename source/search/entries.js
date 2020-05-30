/**
 * Find entry instances by filtering with a compare function
 * @param {Array.<Group>} groups The groups to check in
 * @param {Function} compareFn The callback comparison function, return true to keep and false
 *  to strip
 * @returns {Array.<Entry>} An array of found entries
 */
function findEntriesByCheck(groups, compareFn) {
    var foundEntries = [],
        newEntries;
    groups.forEach(function(group) {
        newEntries = group.getEntries().filter(compareFn);
        if (newEntries.length > 0) {
            foundEntries = foundEntries.concat(newEntries);
        }
        newEntries = findEntriesByCheck(group.getGroups(), compareFn);
        if (newEntries.length > 0) {
            foundEntries = foundEntries.concat(newEntries);
        }
    });
    return foundEntries;
}

function findEntriesByProperty(parentGroups, property, value) {
    return findEntriesByCheck(parentGroups, entry => {
        const props = entry.getProperties(property);
        const propKeys = Object.keys(props);
        return propKeys.length > 0
            ? propKeys.some(propKey => {
                  const itemValue = props[propKey];
                  if (value instanceof RegExp) {
                      return value.test(itemValue);
                  } else {
                      return itemValue.indexOf(value) >= 0;
                  }
              })
            : false;
    });
}

function findEntryByID(parentGroups, id) {
    const entries = findEntriesByCheck(parentGroups, entry => entry.id === id);
    return entries && entries.length >= 1 ? entries[0] : null;
}

module.exports = {
    findEntriesByProperty,
    findEntryByID
};
