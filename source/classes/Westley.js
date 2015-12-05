(function(module) {

	"use strict";

	var Inigo = require(__dirname + "/InigoGenerator.js"),
		commandTools = require(GLOBAL.root + "/tools/command.js");

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
			commandKey = commandComponents.shift(),
			commandFilename = "command." + commandKey + ".js",
			commandExecute;
		try {
			commandExecute = require(__dirname + "/commands/" + commandFilename);
		} catch (err) {
			throw new Error("Unrecognised command: " + commandKey);
		}
		this._history.push(command);
		this._dataset = commandExecute.apply(commandExecute, [this._dataset].concat(commandComponents))
			|| this._dataset;
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