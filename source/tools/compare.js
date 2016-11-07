"use strict";

var PRIMATIVES = ["string", "number", "boolean", "undefined"];

/**
 * De-dupe an array
 * @param {Array} arr The array
 * @returns {Array} The de-duped array
 */
function dedupe(arr) {
    return arr.filter(function (item, pos) {
        return arr.indexOf(item) === pos;
    });
}

/**
 * Naïve difference calculator for objects and variables
 * Does not care about array order or instance pointers - only checks for
 * deep *equality*.
 * @param {*} object1 The first item
 * @param {*} object2 The second item
 * @returns {Boolean} True if different, false if equal
 * @private
 */
function different(object1, object2) {
    if (Array.isArray(object1) && Array.isArray(object2)) {
        let differs = object1.some(function (item1) {
            return !object2.some(function (item2) {
                return different(item1, item2) === false;
            });
        });
        if (!differs) {
            return object2.some(function (item1) {
                return !object1.some(function (item2) {
                    return different(item1, item2) === false;
                });
            });
        }
    } else if (typeof object1 === "object" && typeof object2 === "object") {
        if (object1 === null && object2 === null) {
            return false;
        }
        let allKeys = dedupe(Object.keys(object1).concat(Object.keys(object2))),
            isMissingAKey = allKeys.some(function (key) {
                return !(object1.hasOwnProperty(key) && object2.hasOwnProperty(key));
            });
        if (!isMissingAKey) {
            return allKeys.some(function (key) {
                return different(object1[key], object2[key]);
            });
        }
    } else if (PRIMATIVES.indexOf(typeof object1) === PRIMATIVES.indexOf(typeof object2)) {
        return object1 !== object2;
    }
    return true;
}


module.exports = {

    /**
     * Check if the objects differ
     * @param {*} o1 The first item
     * @param {*} o2 The second item
     * @returns {Boolean} True if different, false if equal
     * @see different
     */
    objectsDiffer: function(o1, o2) {
        return different(o1, o2);
    }

};
