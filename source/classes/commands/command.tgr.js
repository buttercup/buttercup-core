(function(module) {

	"use strict";

	var searching = require("__buttercup/tools/searching.js");

	module.exports = function(obj, groupID, title) {
		obj.groups = obj.groups || [];
		var group = searching.findGroupByID(obj.groups, groupID);
		if (!group) {
			throw new Error("Group not found for ID");
		}
		group.title = title;
	};

})(module);
