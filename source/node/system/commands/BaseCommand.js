"use strict";

/**
 * @typedef {Object} ArchiveDataset
 * @property {Array.<Object>} groups Array of groups
 * @property {Array.<Object>} entries Array of entries
 * @property {Object} attributes Archive attributes
 */

/**
 * Base command class
 * @class BaseCommand
 */
class BaseCommand {
    constructor() {
        this._searchTools = null;
        this._entryTools = null;
        this._callbacks = {};
    }

    /**
     * Entry tools module
     * @type {Object}
     */
    get entryTools() {
        return this._entryTools;
    }

    /**
     * Search tools module
     * @type {Object}
     */
    get searchTools() {
        return this._searchTools;
    }

    /**
     * Set the entry tools module
     * @param {Object} et The entry tools module
     */
    set entryTools(et) {
        this._entryTools = et;
    }

    /**
     * Set the search tools module
     * @param {Object} st The search tools module
     */
    set searchTools(st) {
        this._searchTools = st;
    }

    execute() {}

    /**
     * Execute all callbacks under a key
     * Arguments passed after the key are provided to each callback
     * @param {String} key The callback name
     * @example
     *      executeCallbacks("functionName", 1, 2, "three")
     */
    executeCallbacks(key /* , [...args] */) {
        let args = Array.prototype.slice.call(arguments),
            callbacks = this._callbacks[key] || [];
        // Take the key out
        args.shift();
        callbacks.forEach(function(cb) {
            cb.apply(null, args);
        });
    }

    /**
     * Add a callback for a key
     * @param {String} key The callback name
     * @param {Function} fn The callback function
     */
    setCallback(key, fn) {
        this._callbacks[key] = this._callbacks[key] || [];
        this._callbacks[key].push(fn);
    }
}

module.exports = BaseCommand;
