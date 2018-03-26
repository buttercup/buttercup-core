const describe = require("./Descriptor.js");
const Westley = require("./Westley.js");

/**
 * Number of dataset lines to preserve by default (minimum)
 * @type {Number}
 * @private
 * @memberof Flattener
 */
const PRESERVE_LAST_LINES = 1000;

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
    // Note: "fmt" and "aid" are generated automatically and does not need to be preserved
    return ["cmm"].indexOf(commandName) >= 0;
}

/**
 * Flatten archives
 * @class Flattener
 * @param {Westley} westley The Westley instance
 */
class Flattener {
    constructor(westley) {
        this._westley = westley;
    }

    /**
     * Check if the dataset can be flattened
     * @returns {Boolean} True if it can be flattened
     * @public
     * @memberof Flattener
     */
    canBeFlattened() {
        return this._westley.getHistory().length > PRESERVE_LAST_LINES;
    }

    /**
     * Flatten a dataset
     * @param {Boolean=} force Force flattening even if it is detected to be unnecessary
     * @returns {Boolean} True if flattening occurred, false otherwise
     * @public
     * @memberof Flattener
     */
    flatten(force) {
        force = force === undefined ? false : force;
        var history = this._westley.getHistory(),
            availableLines = history.length - PRESERVE_LAST_LINES,
            cleanHistory,
            preservedLines = [],
            i,
            tempWestley = new Westley();
        // check if possible to flatten
        if (availableLines <= 0) {
            if (!force) {
                return false;
            }
            availableLines = history.length;
        }
        // execute early history
        var currentCommand;
        for (i = 0; i < availableLines; i += 1) {
            currentCommand = history[i];
            if (mustBePreserved(currentCommand)) {
                preservedLines.push(currentCommand);
            }
            tempWestley.execute(currentCommand);
        }
        // describe the archive at its current state
        cleanHistory = describe(tempWestley.getDataset());
        // prepare to replay
        var newHistory = []
            .concat(preservedLines) // preserved commands that cannot be stripped
            .concat(cleanHistory) // the newly flattened description commands
            .concat(history.slice(availableLines)); // the existing history minus the flattened portion
        // clear the system
        this._westley.clear();
        // replay all history (expensive)
        newHistory.forEach(this._westley.execute.bind(this._westley));
        return true;
    }

    /**
     * Get the number of lines to preserve by default
     * @returns {Number} The number of lines
     * @memberof Flattener
     * @public
     * @see PRESERVE_LAST_LINES
     */
    getPreservationCount() {
        return PRESERVE_LAST_LINES;
    }
}

module.exports = Flattener;
