(function(module) {

	"use strict";

	var SetPropertyCommand = function(searching, entry) {
		this.searching = searching;
		this.entry = entry;
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

	module.exports = SetPropertyCommand;

})(module);
