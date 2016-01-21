(function(module) {

	"use strict";

	var PRESERVE_LAST_LINES = 						1000;

	var describe = require("__buttercup/classes/Descriptor.js"),
		Westley = require("__buttercup/classes/Westley.js");

	function mustBePreserved(command) {
		var commandName = command.substr(0, 3);
		return ["cmm"].indexOf(commandName) >= 0; 
	}

	/**
	 * Flatten archives
	 * @class Flattener
	 * @param {Westley} westley
	 */
	var Flattener = function(westley) {
		this._westley = westley;
	};

	Flattener.prototype.canBeFlattened = function() {
		return (this._westley.getHistory().length > PRESERVE_LAST_LINES);
	};

	Flattener.prototype.flatten = function(force) {
		force = (force === undefined) ? false : force;
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
			.concat(preservedLines)					// preserved commands that cannot be stripped
			.concat(cleanHistory)					// the newly flattened description commands
			.concat(history.slice(availableLines)); // the existing history minus the flattened portion
		// clear the system
		this._westley.clear();
		// replay all history (expensive)
		newHistory.forEach(this._westley.execute.bind(this._westley));
		return true;
	};

	Flattener.prototype.getPreservationCount = function() {
		return PRESERVE_LAST_LINES;
	};

	module.exports = Flattener;

})(module);
