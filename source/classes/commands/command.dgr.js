(function(module) {

	"use strict";

	var searching = require(__dirname + "/searching.js");

	module.exports = function(obj, groupID) {
		obj.groups = obj.groups || [];
		var location = searching.findGroupContainingGroupID(obj, groupID),
			containerGroup = location.group,
			containerIndex = location.index;
		if (!containerGroup) {
			throw new Error("Invalid group ID");
		}
		containerGroup.groups.splice(containerIndex, 1)[0];
	};

})(module);
