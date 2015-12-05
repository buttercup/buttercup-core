(function(module) {

	"use strict";

	var PRESERVE_LAST_LINES = 						1000;

	var commandTools = require(GLOBAL.root + "/tools/command.js");

	var Flattener = function(westley) {
		this._westley = westley;
	};

	Flattener.prototype.canBeFlattened = function() {
		return (this._westley.getHistory().length > PRESERVE_LAST_LINES);
	};

	Flattener.prototype.flatten = function(force) {
		force = (force === undefined) ? false : force;
		var entryStates = {},
			workingHistory = [],
			history = this._westley.getHistory(),
			availableLines = history.length - PRESERVE_LAST_LINES,
			i,
			parts,
			command,
			entryID;
		// check if possible to flatten
		if (availableLines <= 0) {
			if (!force) {
				return false;
			}
			availableLines = history.length;
		}
		// collect history
		for (i = 0; i < availableLines; i += 1) {
			workingHistory.push(history[i]);
		}
		// collect entry/group states
		for (i = 0; i < availableLines; i += 1) {
			parts = commandTools.extractCommandComponents(workingHistory[i]);
			command = parts[0];
			if (command === "cen") {
				entryID = parts[2];
				entryStates[entryID] = entryStates[entryID] || {};
				entryStates[entryID].commands = entryStates[entryID].commands || [];
				entryStates[entryID].alive = true;
				entryStates[entryID].lastGroup = parts[1];
				entryStates[entryID].commands.push(workingHistory[i]);
			} else if (command === "den") {
				entryID = parts[1];
				entryStates[entryID] = entryStates[entryID] || {};
				entryStates[entryID].alive = false;
				entryStates[entryID].commands.push(workingHistory[i]);
			}
		}
		// strip dead entries
		for (entryID in entryStates) {
			if (entryStates.hasOwnProperty(entryID)) {
				var entryState = entryStates[entryID];
				if (entryState.alive === false) {
					workingHistory = workingHistory.filter(function(historyItem) {
						var historyParts = commandTools.extractCommandComponents(historyItem),
							historyCommand = historyParts[0];
						if (["cen", "den", "sep", "sem", "dem", "men"].indexOf(historyCommand) >= 0 &&
							historyParts[1] === entryID) {
							// strip: creation/deletion/setting/moving commands
							return false;
						}
						return true;
					});
				}
			}
		}
		// prepare to replay
		var newHistory = [].concat(workingHistory).concat(history.slice(availableLines));
		this._westley.clear();
		newHistory.forEach(this._westley.execute.bind(this._westley));
		return true;
	};

	module.exports = Flattener;

})(module);