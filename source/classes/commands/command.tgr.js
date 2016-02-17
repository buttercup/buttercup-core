(function(module) {

	"use strict";

	var TitleGroupCommand = function () {
		this.searching = undefined;
	}

	TitleGroupCommand.prototype.execute = function (obj, groupID, title) {
		obj.groups = obj.groups || [];
		var group = this.searching.findGroupByID(obj.groups, groupID);
		if (!group) {
			throw new Error("Group not found for ID");
		}
		group.title = title;
	}

	TitleGroupCommand.prototype.injectSearching = function(searching) {
		this.searching = searching;
	}

	module.exports = TitleGroupCommand;

})(module);
