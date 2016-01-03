(function(module) {

	"use strict";

	var searching = require("__buttercup/tools/searching.js");

	module.exports = function(obj, parentID, newID) {
		obj.groups = obj.groups || [];
		var group = {
			id: newID,
			title: ""
		};
		if ("" + parentID === "0") {
			obj.groups.push(group);
		} else {
			var parentGroup = searching.findGroupByID(obj.groups, parentID);
			if (!parentGroup) {
				throw new Error("Invalid parent group ID: not found");
			}
			parentGroup.groups = parentGroup.groups || [];
			parentGroup.groups.push(group);
		}
	};

})(module);