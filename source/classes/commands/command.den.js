(function(module) {

	"use strict";

	var DeleteEntryCommand = function(searching) {
		this.searching = searching;
	}

	DeleteEntryCommand.prototype.execute = function(obj, entryID) {
		obj.groups = obj.groups || [];
		var location = this.searching.findGroupContainingEntryID(obj.groups, entryID),
			containerGroup = location.group,
			containerIndex = location.index;
		if (!containerGroup) {
			throw new Error("Invalid entry ID");
		}
		containerGroup.entries.splice(containerIndex, 1)[0];
	};

	module.exports = DeleteEntryCommand;

})(module);
