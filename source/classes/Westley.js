(function(module) {

	"use strict";

	var Inigo = require("buttercup/classes/InigoGenerator.js"),
		commandTools = require("buttercup/tools/command.js");

	var availableCommands = {
		cen: 		require("buttercup/classes/commands/command.cen.js"),
		cgr: 		require("buttercup/classes/commands/command.cgr.js"),
		cmm: 		require("buttercup/classes/commands/command.cmm.js"),
		dea: 		require("buttercup/classes/commands/command.dea.js"),
		dem: 		require("buttercup/classes/commands/command.dem.js"),
		den: 		require("buttercup/classes/commands/command.den.js"),
		dgr: 		require("buttercup/classes/commands/command.dgr.js"),
		fmt: 		require("buttercup/classes/commands/command.fmt.js"),
		men: 		require("buttercup/classes/commands/command.men.js"),
		mgr: 		require("buttercup/classes/commands/command.mgr.js"),
		pad: 		require("buttercup/classes/commands/command.pad.js"),
		sea: 		require("buttercup/classes/commands/command.sea.js"),
		sem: 		require("buttercup/classes/commands/command.sem.js"),
		sep: 		require("buttercup/classes/commands/command.sep.js"),
		tgr: 		require("buttercup/classes/commands/command.tgr.js")
	};

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
		return this;
	}

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
			commandKey = commandComponents.shift();//,
			//commandFilename = "command." + commandKey + ".js",
			//commandExecute;
		if (!availableCommands.hasOwnProperty(commandKey)) {
			throw new Error("Unrecognised command: " + commandKey);
		}
		// try {
		// 	commandExecute = require("buttercup/classes/commands/" + commandFilename);
		// } catch (err) {
		// 	throw new Error("Unrecognised command: " + commandKey);
		// }
		var commandToExecute = availableCommands[commandKey];
		this._history.push(command);
		commandToExecute.apply(commandToExecute, [this._dataset].concat(commandComponents));
		return this;
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