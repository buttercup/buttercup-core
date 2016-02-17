(function(module) {

	"use strict";

	var MoveGroupCommand = function() {
		this.searching = undefined;
	}

	MoveGroupCommand.prototype.execute = function(obj, groupID, targetGroupID) {
		obj.groups = obj.groups || [];
		var location = this.searching.findGroupContainingGroupID(obj, groupID),
			originGroup = location.group,
			originIndex = location.index;
		if (!originGroup) {
			throw new Error("Invalid group ID");
		}
		var targetGroup = (parseInt(targetGroupID, 10) === 0) ?
			obj : this.searching.findGroupByID(obj.groups, targetGroupID);
		if (!targetGroup) {
			throw new Error("Invalid group ID");
		}
		var movedGroup = originGroup.groups.splice(originIndex, 1)[0];
		targetGroup.groups = targetGroup.groups || [];
		targetGroup.groups.push(movedGroup);
	};

	MoveGroupCommand.prototype.injectSearching = function(searching) {
		this.searching = searching;
	}

	module.exports = MoveGroupCommand;

})(module);
