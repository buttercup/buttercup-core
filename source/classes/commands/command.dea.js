(function(module) {

	"use strict";

	var DeleteAttributeCommand = function() {
		this.searching = undefined;
	}

	DeleteAttributeCommand.prototype.execute = function(obj, entryID, attributeName) {
		obj.groups = obj.groups || [];
		var entry = searching.findEntryByID(obj.groups, entryID);
		if (!entry) {
			throw new Error("Entry not found for ID");
		}
		entry.attributes = entry.attributes || {};
		var deleted = delete entry.attributes[attributeName];
		if (!deleted) {
			throw new Error("Failed deleting attribute");
		}
	};

	DeleteAttributeCommand.prototype.injectSearching = function(searching) {
		this.searching = searching;
	}

	module.exports = DeleteAttributeCommand;

})(module);
