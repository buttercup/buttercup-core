(function(module) {

	"use strict";

	var searching = require(__dirname + "/searching.js");

	module.exports = function(obj, parentID, newID) {
		obj.groups = obj.groups || [];
		var group = {
			id: newID,
			title: ""
		};
		if (parseInt(parentID, 10) === 0) {
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