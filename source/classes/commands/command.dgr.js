(function(module) {

	"use strict";

	var DeleteGroupCommand = function() {
		this.searching = undefined;
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

	DeleteGroupCommand.prototype.injectSearching = function(searching) {
		this.searching = searching;
	}

	module.exports = DeleteGroupCommand;

})(module);
