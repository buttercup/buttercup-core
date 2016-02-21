(function(module) {

	"use strict";

	var DeleteMetaPropertyCommand = function() {
		this.searching = undefined;
	}

	DeleteMetaPropertyCommand.prototype.execute = function(obj, entryID, propertyName) {
		obj.groups = obj.groups || [];
		var entry = this.searching.findEntryByID(obj.groups, entryID);
		if (!entry) {
			throw new Error("Entry not found for ID");
		}
		entry.meta = entry.meta || {};
		var deleted = delete entry.meta[propertyName];
		if (!deleted) {
			throw new Error("Failed deleting meta property");
		}
	};

	DeleteMetaPropertyCommand.prototype.injectSearching = function(searching) {
		this.searching = searching;
	}

	module.exports = DeleteMetaPropertyCommand;

})(module);
