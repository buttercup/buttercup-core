import Group from "../core/Group";
import { GroupID } from "../types";

interface GroupSearchCompareFunction {
    (group: Group): boolean
}

/**
 * Find a group by its ID
 * @param parentGroups The parent groups to search through
 * @param groupID The group ID to search for
 * @returns The found group or null
 */
export function findGroupByID(parentGroups: Array<Group>, groupID: GroupID): null | Group {
    const foundGroups = findGroupsByCheck(parentGroups, group => group.id === groupID);
    return foundGroups && foundGroups.length >= 1 ? foundGroups[0] : null;
}

function findGroupsByCheck(groups: Array<Group>, compareFn: GroupSearchCompareFunction): Array<Group> {
    const foundGroups = groups.filter(compareFn);
    groups.forEach(group => {
        const subFound = findGroupsByCheck(group.getGroups(), compareFn);
        if (subFound.length > 0) {
            foundGroups.push(...subFound);
        }
    });
    return foundGroups;
}

/**
 * Find groups by their title
 * @param parentGroups The groups to search through
 * @param title The title to search for. May be a regular expression.
 * @returns An array of found groups
 */
export function findGroupsByTitle(parentGroups: Array<Group>, title: string | RegExp): Array<Group> {
    return findGroupsByCheck(parentGroups, group => {
        if (title instanceof RegExp) {
            return title.test(group.getTitle());
        }
        return group.getTitle().indexOf(title) >= 0;
    });
}
