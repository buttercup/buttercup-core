(function(module) {

	"use strict";

	var PRESERVE_LAST_LINES = 						1000;

	var describe = require("buttercup/classes/Descriptor.js"),
		Westley = require("buttercup/classes/Westley.js");

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
		for (i = 0; i < availableLines; i += 1) {
			tempWestley.execute(history[i]);
		}
		// describe the archive at its current state
		cleanHistory = describe(tempWestley.getDataset());
		// prepare to replay
		var newHistory = []
			.concat(cleanHistory)					// The newly flattened description commands
			.concat(history.slice(availableLines)); // The existing history minus the flattened portion
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
