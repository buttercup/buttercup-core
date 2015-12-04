(function(module) {

	"use strict";

	var CANDIDATE_MIN_HISTORY = 					1000,
		FLATTEN_COUNT = 							500;

	var commandTools = require(GLOBAL.root + "/tools/command.js");

	var Flattener = function(westley) {
		this._westley = westley;
	};

	Flattener.prototype.canBeFlattened = function() {
		return (this._westley.getHistory().length >= CANDIDATE_MIN_HISTORY);
	};

	Flattener.prototype.flatten = function() {
		var entryStates = {},
			workingHistory = [],
			history = this._westley.getHistory(),
			i,
			parts,
			command,
			entryID;
		// collect history
		for (i = 0; i < FLATTEN_COUNT; i += 1) {
			workingHistory.push(history[i]);
		}
		// collect entry/group states
		for (i = 0; i < FLATTEN_COUNT; i += 1) {
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
						// if (historyCommand === "cen" || historyCommand === "den" && historyParts[1] === entryID) {
						// 	// strip create/delete commands
						// 	return false;
						// } else if (historyCommand === "sep" || historyCommand === "sem" ||
						// 	historyCommand === "dem" && historyParts[1] === entryID) {
						// 	// strip property/meta operations
						// 	return false;
						// } else if (historyCommand === "men" && historyParts[1] === entryID) {
						// 	// strip moving commands
						// 	return false;
						// }
						return true;
					});
				}
			}
		}
		// prepare to replay
		var newHistory = [].concat(workingHistory).concat(history.slice(FLATTEN_COUNT));
		this._westley.clear();
		newHistory.forEach(this._westley.execute.bind(this._westley));
	};

	module.exports = Flattener;

})(module);