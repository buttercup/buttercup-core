"use strict";

const Fuse = require("fuse.js");

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

/**
 * Find group instances within groups that satisfy some check
 * @param {Array.<Group>} groups The groups to check within
 * @param {Function} compareFn A comparision function - return true to keep, false to strip
 * @returns {Array.<Group>} An array of found groups
 */
function findGroupsByCheck(groups, compareFn) {
    var foundGroups = groups.filter(compareFn);
    groups.forEach(function(group) {
        var subFound = findGroupsByCheck(group.getGroups(), compareFn);
        if (subFound.length > 0) {
            foundGroups = foundGroups.concat(subFound);
        }
    });
    return foundGroups;
}

/**
 * Perform a fuzzy search across some groups
 * @param {Array.<Group>} groups An array of Groups
 * @param {String} searchTerm The search pattern
 * @returns {Array.<Entry>} An array of entries
 */
function fuzzySearchEntries(groups, searchTerm) {
    const entries = getAllEntries(groups);
    const fuse = new Fuse(entries, {
        keys: [
            "property.title",
            "property.username",
            "meta.URL",
            "meta.url"
        ],
        getFn: function(entry, keyPath) {
            const [ type, key ] = keyPath.split(".");
            switch(type) {
                case "property": {
                    return entry.getProperty(key);
                }
                case "meta": {
                    return entry.getMeta(key);
                }
                default:
                    throw new Error(`Unknown entry property type: ${type}`);
            }
        },
        shouldSort: true,
        threshold: 0.5,
        tokenSeparator: /\s+/g
    });
    return fuse.search(searchTerm);
}

/**
 * Get all entries within a collection of groups
 * @param {Array.<Group>} groups An array of groups
 * @returns {Array.<Entry>} An array of entries
 */
function getAllEntries(groups) {
    return groups.reduce(function(current, group) {
        const theseEntries = group.getEntries();
        const subEntries = getAllEntries(group.getGroups());
        if (theseEntries.length > 0) {
            current = current.concat(theseEntries);
        }
        if (subEntries.length > 0) {
            current = current.concat(subEntries);
        }
        return current;
    }, []);
}

module.exports = {
    findEntriesByCheck,
    findGroupsByCheck,
    fuzzySearchEntries,
    getAllEntries
};
