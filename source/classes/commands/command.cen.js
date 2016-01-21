(function(module) {

	"use strict";

	var searching = require("__buttercup/tools/searching.js");

	module.exports = function(obj, groupID, entryID) {
		obj.groups = obj.groups || [];
		var entry = {
			id: entryID,
			title: ""
		};
		var group = searching.findGroupByID(obj.groups, groupID);
		if (!group) {
			throw new Error("Invalid group ID");
		}
		group.entries = group.entries || [];
		group.entries.push(entry);
	};

})(module);
