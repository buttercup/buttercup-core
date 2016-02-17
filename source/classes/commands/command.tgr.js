(function(module) {

	"use strict";

	var TitleGroupCommand = function (searching) {
		this.searching = searching;
	}

	TitleGroupCommand.prototype.execute = function (obj, groupID, title) {
		obj.groups = obj.groups || [];
		var group = this.searching.findGroupByID(obj.groups, groupID);
		if (!group) {
			throw new Error("Group not found for ID");
		}
		group.title = title;
	}

	module.exports = TitleGroupCommand;

})(module);
