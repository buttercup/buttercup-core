(function(module) {

	"use strict";

	var CreateEntryCommand = function(searching) {
		this.searching = searching;
	}

	CreateEntryCommand.prototype.execute = function(obj, groupID, entryID) {
		obj.groups = obj.groups || [];
		var entry = {
			id: entryID,
			title: ""
		};
		var group = this.searching.findGroupByID(obj.groups, groupID);
		if (!group) {
			throw new Error("Invalid group ID");
		}
		group.entries = group.entries || [];
		group.entries.push(entry);
	};

	module.exports = CreateEntryCommand;

})(module);
