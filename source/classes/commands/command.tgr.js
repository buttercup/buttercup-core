(function(module) {

	"use strict";

	var titleGroupCommand = function (searching) {
		this.searching = searching;
	}

	titleGroupCommand.prototype.execute = function (obj, groupID, title) {
		obj.groups = obj.groups || [];
		var group = this.searching.findGroupByID(obj.groups, groupID);
		if (!group) {
			throw new Error("Group not found for ID");
		}
		group.title = title;
	}

	module.exports = titleGroupCommand;
	
})(module);
