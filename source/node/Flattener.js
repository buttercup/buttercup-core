const { describeArchiveDataset } = require("./tools/describe.js");
const Westley = require("./Westley.js");

/**
 * Minimum history lines before flattening can occur
 * @type {Number}
 * @static
 * @memberof Flattener
 */
const FLATTENING_MIN_LINES = 1500;
/**
 * Number of lines to preserve (most recent)
 * @type {Number}
 * @static
 * @memberof Flattener
 */
const PRESERVE_LINES = 1000;

/**
 * Check if a command should be preserved (not flattened)
 * @param {String} command The command to check
 * @returns {Boolean} True if the command is to be kept
 * @private
 * @static
 * @memberof Flattener
 */
function mustBePreserved(command) {
    var commandName = command.substr(0, 3);
    // Note: "fmt" and "aid" are generated automatically and do not need to be preserved
    return ["cmm"].indexOf(commandName) >= 0;
}

/**
 * Flattener class for flattening archive history sets
 */
class Flattener {
    constructor(westley) {
        this._westley = westley;
    }

    /**
     * The working Westley instance
     * @type {Westley}
     * @readonly
     * @memberof Flattener
     */
    get westley() {
        return this._westley;
    }

    /**
     * Check if the dataset can be flattened
     * @returns {Boolean} True if it can be flattened
     * @memberof Flattener
     */
    canBeFlattened() {
        return this.westley.history.length >= FLATTENING_MIN_LINES;
    }

    /**
     * Flatten a dataset
     * @param {Boolean=} force Force flattening even if it is detected to be unnecessary
     * @returns {Boolean} True if flattening occurred, false otherwise
     * @memberof Flattener
     */
    flatten(force = false) {
        const history = this._westley.history;
        const preservedLines = [];
        const tempWestley = new Westley();
        let availableLines = history.length - PRESERVE_LINES;
        // check if possible to flatten
        if (availableLines <= 0 || !this.canBeFlattened()) {
            if (!force) {
                return false;
            }
            availableLines = history.length;
        }
        // execute early history
        var currentCommand;
        for (let i = 0; i < availableLines; i += 1) {
            currentCommand = history[i];
            if (mustBePreserved(currentCommand)) {
                preservedLines.push(currentCommand);
            }
            tempWestley.execute(currentCommand);
        }
        // describe the archive at its current state
        const cleanHistory = describeArchiveDataset(tempWestley.dataset);
        // prepare to replay
        const newHistory = []
            .concat(preservedLines) // preserved commands that cannot be stripped
            .concat(cleanHistory) // the newly flattened description commands
            .concat(history.slice(availableLines)); // the existing history minus the flattened portion
        // clear the system
        this._westley.initialise();
        // replay all history (expensive)
        newHistory.forEach(this._westley.execute.bind(this._westley));
        return true;
    }
}

Object.assign(Flattener, {
    FLATTENING_MIN_LINES,
    PRESERVE_LINES
});

module.exports = Flattener;
