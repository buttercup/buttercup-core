(function(module) {

	"use strict";

	var DeleteGroupCommand = function(searching) {
		this.searching = searching;
	}

	DeleteGroupCommand.prototype.execute = function(obj, groupID) {
		obj.groups = obj.groups || [];
		var location = this.searching.findGroupContainingGroupID(obj, groupID),
			containerGroup = location.group,
			containerIndex = location.index;
		if (!containerGroup) {
			throw new Error("Invalid group ID");
		}
		containerGroup.groups.splice(containerIndex, 1)[0];
	};

	module.exports = DeleteGroupCommand;

})(module);
