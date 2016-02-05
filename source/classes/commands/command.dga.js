(function(module) {

	"use strict";

	var searching = require("__buttercup/tools/searching.js");

	module.exports = function(obj, groupID, attributeName) {
		obj.groups = obj.groups || [];
        var group = searching.findGroupByID(obj.groups, groupID);
		if (!group) {
			throw new Error("Group not found for ID");
		}
		group.attributes = group.attributes || {};
		var deleted = delete group.attributes[attributeName];
		if (!deleted) {
			throw new Error("Failed deleting attribute");
		}
	};

})(module);
