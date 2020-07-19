import Group from "../core/Group";
import Entry from "../core/Entry";
import { EntryID } from "../types";

interface EntrySearchCompareFunction {
    (entry: Entry): boolean;
}

/**
 * Find entry instances by filtering with a compare function
 * @param groups The groups to check in
 * @param compareFn The callback comparison function, return true to keep and false
 *  to strip
 * @returns An array of found entries
 */
function findEntriesByCheck(groups: Array<Group>, compareFn: EntrySearchCompareFunction) {
    let foundEntries: Array<Entry> = [],
        newEntries: Array<Entry>;
    groups.forEach(group => {
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

export function findEntriesByProperty(parentGroups: Array<Group>, property: string | RegExp, value: string | RegExp): Array<Entry> {
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

/**
 * Find an entry by its ID
 * @param parentGroups An array of parent groups to search through
 * @param id The entry ID
 * @returns The entry, if found, or null
 */
export function findEntryByID(parentGroups: Array<Group>, id: EntryID): null | Entry {
    const entries = findEntriesByCheck(parentGroups, entry => entry.id === id);
    return entries && entries.length >= 1 ? entries[0] : null;
}
