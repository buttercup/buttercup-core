(function(module) {

	"use strict";

	var searching = require("buttercup/tools/searching.js");

	module.exports = function(obj, entryID) {
		obj.groups = obj.groups || [];
		var location = searching.findGroupContainingEntryID(obj.groups, entryID),
			containerGroup = location.group,
			containerIndex = location.index;
		if (!containerGroup) {
			throw new Error("Invalid entry ID");
		}
		containerGroup.entries.splice(containerIndex, 1)[0];
	};

})(module);
