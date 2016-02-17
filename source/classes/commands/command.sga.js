(function(module) {

	"use strict";

	var SetGroupAttributeCommand = function(searching) {
		this.searching = searching;
	}

	SetGroupAttributeCommand.prototype.execute = function(obj, groupID, attributeName, value) {
		obj.groups = obj.groups || [];
		var group = this.searching.findGroupByID(obj.groups, groupID);
		if (!group) {
			throw new Error("Group not found for ID");
		}
		group.attributes = group.attributes || {};
		group.attributes[attributeName] = value;
	};

	module.exports = SetGroupAttributeCommand;

})(module);
