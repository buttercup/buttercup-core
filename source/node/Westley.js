const AsyncEventEmitter = require("./events/AsyncEventEmitter.js");
const Inigo = require("./InigoGenerator.js");
const commandTools = require("./tools/command.js");
const searchingTools = require("./tools/searching-raw.js");
const entryTools = require("./tools/entry.js");
const encodingTools = require("./tools/encoding.js");

const VALID_COMMAND_EXP = /^[a-z]{3}[ ].+$/;

const commandClasses = {
    aid: require("./commands/ArchiveIDCommand.js"),
    cen: require("./commands/CreateEntryCommand.js"),
    cgr: require("./commands/CreateGroupCommand.js"),
    cmm: require("./commands/CommentCommand.js"),
    daa: require("./commands/DeleteArchiveAttributeCommand.js"),
    dea: require("./commands/DeleteEntryAttributeCommand.js"),
    dem: require("./commands/DeleteEntryMetaCommand.js"),
    den: require("./commands/DeleteEntryCommand.js"),
    dep: require("./commands/DeleteEntryPropertyCommand.js"),
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
 * Westley class
 * Archive object dataset and history manager. Handles parsing and
 * revenge for the princess.
 * @augments AsyncEventEmitter
 */
class Westley extends AsyncEventEmitter {
    constructor() {
        super();
        this.clear();
        this._readOnly = false;
        this._dirty = false;
    }

    /**
     * Whether the instance is dirty or not (unsaved changes)
     * @type {Boolean}
     * @memberof Westley
     * @instance
     * @public
     * @readonly
     */
    get isDirty() {
        return this._dirty;
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
        this._readOnly = newRO === true;
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
     * Clear the dirty state of the instance
     * @memberof Westley
     */
    clearDirtyState() {
        this._dirty = false;
    }

    /**
     * Execute a command - stored in history and modifies the dataset
     * @param {String} command The command to execute
     * @param {Boolean=} append Whether to append to the end of the history list (default true)
     * @returns {Westley} Returns self
     * @memberof Westley
     */
    execute(command, append) {
        append = append === false ? false : true;
        if (!VALID_COMMAND_EXP.test(command)) {
            throw new Error("Invalid command");
        }
        if (this.readOnly) {
            throw new Error("Cannot execute command: instance is read-only");
        }
        var commandComponents = commandTools.extractCommandComponents(command),
            commandKey = commandComponents.shift();

        var commandObject = this._getCommandForKey(commandKey);

        if (append) {
            this._history.push(command);
        } else {
            // prepend
            this._history.unshift(command);
        }
        commandObject.execute.apply(
            commandObject,
            [this._dataset].concat(this._processCommandParameters(commandKey, commandComponents))
        );
        this._dirty = true;
        this.emit("commandExecuted", { command });
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
        return [...this._history];
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
     * @protected
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

    _processCommandParameters(commandKey, parameters) {
        let commandDescription;
        Object.keys(Inigo.Command).find(function(key) {
            if (Inigo.Command[key].s === commandKey) {
                commandDescription = Inigo.Command[key];
                return true;
            }
            return false;
        });
        if (!commandDescription) {
            throw new Error(`Cannot process command parameters: no command found for key: ${commandKey}`);
        }
        return parameters.map(function(parameter, i) {
            if (commandDescription.args[i].encode === true) {
                if (encodingTools.isEncoded(parameter)) {
                    return encodingTools.decodeStringValue(parameter);
                }
            }
            return parameter;
        });
    }
}

module.exports = Westley;
