(function(module) {

	"use strict";

	var Inigo = require("__buttercup/classes/InigoGenerator.js"),
		commandTools = require("__buttercup/tools/command.js"),
		searching = require("__buttercup/tools/searching.js"),
		entry = require("__buttercup/tools/entry.js");

	var availableCommands = {
		cen: 		new (require("__buttercup/classes/commands/command.cen.js"))(searching),
		cgr: 		new (require("__buttercup/classes/commands/command.cgr.js"))(searching),
		cmm: 		new (require("__buttercup/classes/commands/command.cmm.js"))(),
		dea: 		new (require("__buttercup/classes/commands/command.dea.js"))(searching),
		dem: 		new (require("__buttercup/classes/commands/command.dem.js"))(searching),
		den: 		new (require("__buttercup/classes/commands/command.den.js"))(searching),
		dga: 		new (require("__buttercup/classes/commands/command.dga.js"))(searching),
		dgr: 		new (require("__buttercup/classes/commands/command.dgr.js"))(searching),
		fmt: 		new (require("__buttercup/classes/commands/command.fmt.js"))(),
		men: 		new (require("__buttercup/classes/commands/command.men.js"))(searching),
		mgr: 		new (require("__buttercup/classes/commands/command.mgr.js"))(searching),
		pad: 		new (require("__buttercup/classes/commands/command.pad.js"))(),
		sea: 		new (require("__buttercup/classes/commands/command.sea.js"))(searching),
		sem: 		new (require("__buttercup/classes/commands/command.sem.js"))(searching),
		sep: 		new (require("__buttercup/classes/commands/command.sep.js"))(searching, entry),
		sga: 		new (require("__buttercup/classes/commands/command.sga.js"))(searching),
		tgr: 		new (require("__buttercup/classes/commands/command.tgr.js"))(searching)
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
		// 	commandExecute = require("__buttercup/classes/commands/" + commandFilename);
		// } catch (err) {
		// 	throw new Error("Unrecognised command: " + commandKey);
		// }

		var commandToExecute = availableCommands[commandKey];
		this._history.push(command);

		if (commandToExecute.execute !== undefined) {
			commandToExecute.execute.apply(commandToExecute, [this._dataset].concat(commandComponents));
		} else {
			commandToExecute.apply(commandToExecute, [this._dataset].concat(commandComponents));
		}
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
