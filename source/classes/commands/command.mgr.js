(function(module) {

	"use strict";

	var searching = require(GLOBAL.root + "/tools/searching.js");

	module.exports = function(obj, groupID, targetGroupID) {
		obj.groups = obj.groups || [];
		var location = searching.findGroupContainingGroupID(obj, groupID),
			originGroup = location.group,
			originIndex = location.index;
		if (!originGroup) {
			throw new Error("Invalid group ID");
		}
		var targetGroup = (parseInt(targetGroupID, 10) === 0) ?
			obj : searching.findGroupByID(obj.groups, targetGroupID);
		if (!targetGroup) {
			throw new Error("Invalid group ID");
		}
		var movedGroup = originGroup.groups.splice(originIndex, 1)[0];
		targetGroup.groups = targetGroup.groups || [];
		targetGroup.groups.push(movedGroup);
	};

})(module);
