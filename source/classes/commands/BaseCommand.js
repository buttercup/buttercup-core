/**
 * Base command class
 * @class BaseCommand
 */
class BaseCommand {

    constructor() {
        this._searchTools = null;
        this._entryTools = null;
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

}

module.exports = BaseCommand;
