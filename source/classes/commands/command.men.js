(function(module) {

	"use strict";

	var searching = require("buttercup/tools/searching.js");

	module.exports = function(obj, entryID, targetGroupID) {
		obj.groups = obj.groups || [];
		var location = searching.findGroupContainingEntryID(obj.groups, entryID),
			originGroup = location.group,
			originIndex = location.index;
		if (!originGroup) {
			throw new Error("Invalid entry ID");
		}
		var targetGroup = searching.findGroupByID(obj.groups, targetGroupID);
		if (!targetGroup) {
			throw new Error("Invalid group ID");
		}
		var movedEntry = originGroup.entries.splice(originIndex, 1)[0];
		targetGroup.entries = targetGroup.entries || [];
		targetGroup.entries.push(movedEntry);
	};

})(module);
