(function(module) {

	"use strict";

	var SetAttributeCommand = function(searching) {
		this.searching = searching;
	}

	SetAttributeCommand.prototype.execute = function(obj, entryID, attributeName, value) {
		obj.groups = obj.groups || [];
		var entry = this.searching.findEntryByID(obj.groups, entryID);
		if (!entry) {
			throw new Error("Entry not found for ID");
		}
		entry.attributes = entry.attributes || {};
		entry.attributes[attributeName] = value;
	};

	module.exports = SetAttributeCommand;

})(module);
