(function(module) {

	"use strict";

	var SetPropertyCommand = function() {
		this.searching = undefined;
		this.entry = undefined;
	}

	SetPropertyCommand.prototype.execute = function(obj, entryID, propertyName, value) {
		obj.groups = obj.groups || [];
		if (!this.entry.isValidProperty(propertyName)) {
			throw new Error("Invalid property name for entry: " + propertyName);
		}
		var entry = this.searching.findEntryByID(obj.groups, entryID);
		if (!entry) {
			throw new Error("Entry not found for ID");
		}
		entry[propertyName] = value;
	};

	SetPropertyCommand.prototype.injectSearching = function(searching) {
		this.searching = searching;
	}

	SetPropertyCommand.prototype.injectEntry = function(entry) {
		this.entry = entry;
	}

	module.exports = SetPropertyCommand;

})(module);
