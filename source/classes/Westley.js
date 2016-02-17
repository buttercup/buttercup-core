(function(module) {

	"use strict";

	var Inigo = require("__buttercup/classes/InigoGenerator.js"),
		commandTools = require("__buttercup/tools/command.js"),
		searching = require("__buttercup/tools/searching.js"),
		entry = require("__buttercup/tools/entry.js");

	var VALID_COMMAND_EXP = 			/^[a-z]{3}[ ].+$/;

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

		var commandObject = this._getCommandForName(commandKey);
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
	Westley.prototype._getCommandForName = function(commandKey) {
		// If the command doesn't exist in the cache
		if (this._cachedCommands[commandKey] === undefined) {
			// Get the command object and inject its dependencies
			var requirement = new (require("__buttercup/classes/commands/command." + commandKey + ".js"))();

			if (requirement.injectSearching !== undefined) {
				requirement.injectSearching(searching);
			}

			if (requirement.injectEntry !== undefined) {
				requirement.injectEntry(entry);
			}

			// Store it in the cache
			this._cachedCommands[commandKey] = requirement;
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
