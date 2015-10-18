(function(module) {

	"use strict";

	var Inigo = require(__dirname + "/InigoGenerator.js");

	var VALID_COMMAND_EXP = 			/^[a-z]{3}[ ].+$/;

	/**
	 * Extract command components from a string
	 * @private
	 * @static
	 * @param {String} command The command to extract from
	 * @returns {String[]} The separated parts
	 * @memberof Westley
	 */
	function extractCommandComponents(command) {
		var patt = /("[^"]*")/,
			quotedStringPlaceholder = "__QUOTEDSTR__",
			escapedQuotePlaceholder = "__ESCAPED_QUOTE__",
			matches = [],
			match;

		command = command.replace(/\\\"/g, escapedQuotePlaceholder);

		while (match = patt.exec(command)) {
			var matched = match[0];
			command = command.substr(0, match.index) +
				quotedStringPlaceholder +
				command.substr(match.index + matched.length);
			matches.push(matched.substring(1, matched.length - 1));
		}

		var parts = command.split(" ");
		parts = parts.map(function(part) {
			var item = part.trim();
			if (item === quotedStringPlaceholder) {
				item = matches.shift();  
			}
			item = item.replace(new RegExp(escapedQuotePlaceholder, 'g'), '"');
			return item;
		});

		return parts;
	}

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
	 * @memberof Westley
	 */
	Westley.prototype.execute = function(command) {
		if (!VALID_COMMAND_EXP.test(command)) {
			throw new Error("Invalid command");
		}
		var commandComponents = extractCommandComponents(command),
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