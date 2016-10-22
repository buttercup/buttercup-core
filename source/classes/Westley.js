(function(module) {

    "use strict";

    const Inigo = require("./InigoGenerator.js");
    const commandTools = require("../tools/command.js");
    const searchingTools = require("../tools/searching-raw.js");
    const entryTools = require("../tools/entry.js");

    const VALID_COMMAND_EXP =             /^[a-z]{3}[ ].+$/;

    const commandClasses = {
        cen: require("./commands/command.cen.js"),
        cgr: require("./commands/command.cgr.js"),
        cmm: require("./commands/command.cmm.js"),
        dea: require("./commands/command.dea.js"),
        dem: require("./commands/command.dem.js"),
        den: require("./commands/command.den.js"),
        dga: require("./commands/command.dga.js"),
        dgr: require("./commands/command.dgr.js"),
        fmt: require("./commands/command.fmt.js"),
        men: require("./commands/command.men.js"),
        mgr: require("./commands/command.mgr.js"),
        pad: require("./commands/command.pad.js"),
        sea: require("./commands/command.sea.js"),
        sem: require("./commands/command.sem.js"),
        sep: require("./commands/command.sep.js"),
        sga: require("./commands/command.sga.js"),
        tgr: require("./commands/command.tgr.js")
    };

    /**
     * Westley. Archive object dataset and history manager. Handles parsing and
     * revenge for the princess.
     * @class Westley
     */
    var Westley = function() {
        this.clear();
    };

    /**
     * Clear the dataset and history
     * @returns {Westley} Returns self
     * @memberof Westley
     */
    Westley.prototype.clear = function() {
        this._dataset = {};
        this._history = [];
        this._cachedCommands = {};
        return this;
    };

    /**
     * Execute a command - stored in history and modifies the dataset
     * @param {String} command The command to execute
     * @returns {Westley} Returns self
     * @memberof Westley
     */
    Westley.prototype.execute = function(command) {
        if (!VALID_COMMAND_EXP.test(command)) {
            throw new Error("Invalid command");
        }
        var commandComponents = commandTools.extractCommandComponents(command),
            commandKey = commandComponents.shift();

        var commandObject = this._getCommandForKey(commandKey);

        this._history.push(command);
        commandObject.execute.apply(commandObject, [this._dataset].concat(commandComponents));
        return this;
    };

    /**
     * Gets a command by its key from the cache with its dependencies injected
     * @param {String} commandKey The key of the command
     * @returns {Command} Returns the command
     * @memberof Westley
     */
    Westley.prototype._getCommandForKey = function(commandKey) {
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
    };

    /**
     * Insert a padding in the archive (used for delta tracking)
     * @returns {Westley} Returns self
     * @memberof Westley
     */
    Westley.prototype.pad = function() {
        this.execute(Inigo.generatePaddingCommand());
        return this;
    };

    /**
     * Get the core dataset
     * @returns {Object}
     * @memberof Westley
     */
    Westley.prototype.getDataset = function() {
        return this._dataset;
    };

    /**
     * Get the history (deltas)
     * @returns {String[]}
     * @memberof Westley
     */
    Westley.prototype.getHistory = function() {
        return this._history;
    };

    module.exports = Westley;

})(module);
