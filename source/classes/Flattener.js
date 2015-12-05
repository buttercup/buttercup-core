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
			groupStates = {},
			deadGroups = [],
			workingHistory = [],
			history = this._westley.getHistory(),
			availableLines = history.length - PRESERVE_LAST_LINES,
			i,
			parts,
			command,
			entryID,
			groupID;
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
				//entryStates[entryID].commands = entryStates[entryID].commands || [];
				entryStates[entryID].alive = true;
				entryStates[entryID].lastGroup = parts[1];
				//entryStates[entryID].commands.push(workingHistory[i]);
			} else if (command === "den") {
				entryID = parts[1];
				entryStates[entryID] = entryStates[entryID] || {};
				entryStates[entryID].alive = false;
				//entryStates[entryID].commands.push(workingHistory[i]);
			} else if (command === "men") {
				entryID = parts[1];
				groupID = parts[2];
				entryStates[entryID].lastGroup = groupID;
			} else if (command === "cgr") {
				groupID = parts[2];
				groupStates[groupID] = groupStates[groupID] || {};
				groupStates[groupID].alive = true;
				groupStates[groupID].lastGroup = parts[1];
			} else if (command === "mgr") {
				groupID = parts[1];
				groupStates[groupID].lastGroup = parts[2];
			} else if (command === "dgr") {
				groupID = parts[1];
				groupStates[groupID].alive = false;
				deadGroups.push(groupID);
			}
		}
		// process nested group deletion
		var groupsChanged = true;
		while (groupsChanged) {
			groupsChanged = false;
			for (var collectedGroupID1 in groupStates) {
				if (groupStates.hasOwnProperty(collectedGroupID1) && groupStates[collectedGroupID1].alive === false) {
					for (var collectedGroupID2 in groupStates) {
						if (groupStates.hasOwnProperty(collectedGroupID2) && // the property is valid
							groupStates[collectedGroupID2].lastGroup === collectedGroupID1 && // the last group was the one we're in
							collectedGroupID2 !== collectedGroupID1 && // just-in-case, not same ID
							groupStates[collectedGroupID2].alive === true) { // the child is still alive
							groupStates[collectedGroupID2].alive = false; // set as having been removed
							deadGroups.push(collectedGroupID2);
							// we made a change, process again
							groupsChanged = true;
						}
					}
				}
			}
		}
		// strip dead groups
		for (groupID in groupStates) {
			if (groupStates.hasOwnProperty(groupID)) {
				var groupState = groupStates[groupID];
				if (groupState.alive === false) {
					workingHistory = workingHistory.filter(function(historyItem) {
						var historyParts = commandTools.extractCommandComponents(historyItem),
							historyCommand = historyParts[0];
						if (["dgr", "mgr", "tgr"].indexOf(historyCommand) >= 0 && historyParts[1] === groupID) {
							// strip group: titles/moving/deletion
							return false;
						} else if (historyCommand === "cgr" && historyParts[2] === groupID) {
							// strip creation
							return false;
						} else if (historyCommand === "cen" && historyParts[1] === groupID) {
							// strip entry creation
							return false;
						} else if (historyCommand === "men" && historyParts[2] === groupID) {
							// strip movements
							return false;
						}
						// if (["cen", "den", "sep", "sem", "dem", "men"].indexOf(historyCommand) >= 0 &&
						// 	historyParts[1] === entryID) {
						// 	// strip: creation/deletion/setting/moving commands
						// 	return false;
						// }
						return true;
					});
				}
			}
		}
		// strip dead entries
		for (entryID in entryStates) {
			if (entryStates.hasOwnProperty(entryID)) {
				var entryState = entryStates[entryID];
				// first check if it's in a group that's been removed
				if (deadGroups.indexOf(entryState.lastGroup) >= 0) {
					entryState.alive = false;
				}
				// filter out if it has been removed
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

	Flattener.prototype.getPreservationCount = function() {
		return PRESERVE_LAST_LINES;
	};

	module.exports = Flattener;

})(module);
