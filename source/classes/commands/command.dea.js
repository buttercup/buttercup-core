(function(module) {

	"use strict";

	var Searching = require("__buttercup/tools/searching.js"),
		Entry = require("__buttercup/tools/entry.js");

	module.exports = function(obj, entryID, attributeName) {
		obj.groups = obj.groups || [];
		var entry = Searching.findEntryByID(obj.groups, entryID);
		if (!entry) {
			throw new Error("Entry not found for ID");
		}
		entry.attributes = entry.attributes || {};
		var deleted = delete entry.attributes[attributeName];
		if (!deleted) {
			throw new Error("Failed deleting attribute");
		}
	};

})(module);
