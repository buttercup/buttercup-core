(function(module) {

	"use strict";

	var CreateGroupCommand = function() {
		this.searching = undefined;
	}

	CreateGroupCommand.prototype.execute = function(obj, parentID, newID) {
		obj.groups = obj.groups || [];
		var group = {
			id: newID,
			title: ""
		};
		if ("" + parentID === "0") {
			obj.groups.push(group);
		} else {
			var parentGroup = this.searching.findGroupByID(obj.groups, parentID);
			if (!parentGroup) {
				throw new Error("Invalid parent group ID: not found");
			}
			parentGroup.groups = parentGroup.groups || [];
			parentGroup.groups.push(group);
		}
	};

	CreateGroupCommand.prototype.injectSearching = function(searching) {
		this.searching = searching;
	}

	module.exports = CreateGroupCommand;

})(module);
