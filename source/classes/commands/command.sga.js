(function(module) {

	"use strict";

	var searching = require("__buttercup/tools/searching.js");

	module.exports = function(obj, groupID, attributeName, value) {
		obj.groups = obj.groups || [];
		var group = searching.findGroupByID(obj.groups, groupID);
		if (!group) {
			throw new Error("Group not found for ID");
		}
		group.attributes = group.attributes || {};
		group.attributes[attributeName] = value;
	};

})(module);
