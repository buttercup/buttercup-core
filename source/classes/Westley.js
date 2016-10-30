"use strict";

const Inigo = require("./InigoGenerator.js");
const commandTools = require("../tools/command.js");
const searchingTools = require("../tools/searching-raw.js");
const entryTools = require("../tools/entry.js");

const VALID_COMMAND_EXP =             /^[a-z]{3}[ ].+$/;

const commandClasses = {
    cen: require("./commands/CreateEntryCommand.js"),
    cgr: require("./commands/CreateGroupCommand.js"),
    cmm: require("./commands/CommentCommand.js"),
    daa: require("./commands/DeleteArchiveAttributeCommand.js"),
    dea: require("./commands/DeleteEntryAttributeCommand.js"),
    dem: require("./commands/DeleteEntryMetaCommand.js"),
    den: require("./commands/DeleteEntryCommand.js"),
    dga: require("./commands/DeleteGroupAttributeCommand.js"),
    dgr: require("./commands/DeleteGroupCommand.js"),
    fmt: require("./commands/FormatCommand.js"),
    men: require("./commands/MoveEntryCommand.js"),
    mgr: require("./commands/MoveGroupCommand.js"),
    pad: require("./commands/PadCommand.js"),
    saa: require("./commands/SetArchiveAttributeCommand.js"),
    sea: require("./commands/SetEntryAttributeCommand.js"),
    sem: require("./commands/SetEntryMetaCommand.js"),
    sep: require("./commands/SetEntryPropertyCommand.js"),
    sga: require("./commands/SetGroupAttributeCommand.js"),
    tgr: require("./commands/TitleGroupCommand.js")
};

/**
 * Westley. Archive object dataset and history manager. Handles parsing and
 * revenge for the princess.
 * @class Westley
 */
class Westley {

    constructor() {
        this.clear();
        this._readOnly = false;
    }

    /**
     * @property {Boolean} readOnly
     * @memberof Westley
     * @instance
     * @public
     */
    get readOnly() {
        return this._readOnly;
    }

    /**
     * Set the read only value
     * @param {Boolean} newRO The new value
     */
    set readOnly(newRO) {
        this._readOnly = (newRO === true);
    }

    /**
     * Clear the dataset and history
     * @returns {Westley} Returns self
     * @memberof Westley
     */
    clear() {
        this._dataset = {};
        this._history = [];
        this._cachedCommands = {};
        return this;
    }

    /**
     * Execute a command - stored in history and modifies the dataset
     * @param {String} command The command to execute
     * @returns {Westley} Returns self
     * @memberof Westley
     */
    execute(command) {
        if (!VALID_COMMAND_EXP.test(command)) {
            throw new Error("Invalid command");
        }
        var commandComponents = commandTools.extractCommandComponents(command),
            commandKey = commandComponents.shift();

        var commandObject = this._getCommandForKey(commandKey);

        this._history.push(command);
        commandObject.execute.apply(commandObject, [this._dataset].concat(commandComponents));
        return this;
    }

    /**
     * Get the core dataset
     * @returns {Object} The dataset object
     * @memberof Westley
     */
    getDataset() {
        return this._dataset;
    }

    /**
     * Get the history (deltas)
     * @returns {String[]} The command array (history)
     * @memberof Westley
     */
    getHistory() {
        return this._history;
    }

    /**
     * Insert a padding in the archive (used for delta tracking)
     * @returns {Westley} Returns self
     * @memberof Westley
     */
    pad() {
        this.execute(Inigo.generatePaddingCommand());
        return this;
    }

    /**
     * Gets a command by its key from the cache with its dependencies injected
     * @param {String} commandKey The key of the command
     * @returns {Command} Returns the command
     * @memberof Westley
     */
    _getCommandForKey(commandKey) {
        // If the command doesn't exist in the cache
        if (this._cachedCommands[commandKey] === undefined) {
            // Get the command object and inject its dependencies
            let CommandClass = commandClasses[commandKey],
                command = new CommandClass();

            command.searchTools = searchingTools;
            command.entryTools = entryTools;

            command.setCallback("comment", function(comment) {
                // handle comment
            });

            // Store it in the cache
            this._cachedCommands[commandKey] = command;
        }

        return this._cachedCommands[commandKey];
    }

}

module.exports = Westley;
