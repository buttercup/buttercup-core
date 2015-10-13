(function(module) {

	"use strict";

	var Searching = require(__dirname + "/searching.js"),
		Entry = require(__dirname + "/entry.js");

	module.exports = function(obj, entryID, propertyName, value) {
		obj.groups = obj.groups || [];
		if (!Entry.isValidProperty(propertyName)) {
			throw new Error("Invalid property name for entry");
		}
		var entry = Searching.findEntryByID(obj.groups, entryID);
		if (!entry) {
			throw new Error("Entry not found for ID");
		}
		entry[propertyName] = value;
	};

})(module);
