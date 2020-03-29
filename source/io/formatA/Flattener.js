const { describeVaultDataset } = require("./describe.js");
const VaultFormatA = require("../VaultFormatA.js");

/**
 * Check if a command should be preserved (not flattened)
 * @param {String} command The command to check
 * @returns {Boolean} True if the command is to be kept
 * @private
 * @static
 * @memberof Flattener
 */
function mustBePreserved(command) {
    const commandName = command.substr(0, 3);
    // Note: "fmt" and "aid" are generated automatically and do not need to be preserved
    return ["cmm"].indexOf(commandName) >= 0;
}

/**
 * Flattener class for flattening archive history sets
 */
class Flattener {
    /**
     * Minimum history lines before flattening can occur
     * @type {Number}
     * @static
     * @memberof Flattener
     */
    static FLATTENING_MIN_LINES = 6000;
    /**
     * Number of lines to preserve (most recent)
     * @type {Number}
     * @static
     * @memberof Flattener
     */
    static PRESERVE_LINES = 5000;

    constructor(format) {
        this.format = format;
    }

    /**
     * Check if the dataset can be flattened
     * @returns {Boolean} True if it can be flattened
     * @memberof Flattener
     */
    canBeFlattened() {
        return this.format.history.length >= FLATTENING_MIN_LINES;
    }

    /**
     * Flatten a dataset
     * @param {Boolean=} force Force flattening even if it is detected to be unnecessary
     * @returns {Boolean} True if flattening occurred, false otherwise
     * @memberof Flattener
     */
    flatten(force = false) {
        const history = this.format.history;
        const preservedLines = [];
        const tempFormat = new VaultFormatA();
        let availableLines = history.length - PRESERVE_LINES;
        // check if possible to flatten
        if (availableLines <= 0 || !this.canBeFlattened()) {
            if (!force) {
                return false;
            }
            availableLines = history.length;
        }
        // execute early history
        let currentCommand;
        for (let i = 0; i < availableLines; i += 1) {
            currentCommand = history[i];
            if (mustBePreserved(currentCommand)) {
                preservedLines.push(currentCommand);
            }
            tempFormat.execute(currentCommand);
        }
        // describe the archive at its current state
        const cleanHistory = describeVaultDataset(tempFormat.source);
        // prepare to replay
        const newHistory = [
            ...preservedLines, // preserved commands that cannot be stripped
            ...cleanHistory, // the newly flattened description commands
            ...history.slice(availableLines) // the existing history minus the flattened portion
        ];
        // clear the system
        this.format.clear();
        // replay all history (expensive)
        this.format.execute(newHistory);
        // newHistory.forEach(this.format.execute.bind(this._westley));
        return true;
    }
}

module.exports = Flattener;
