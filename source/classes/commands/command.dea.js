(function(module) {

	"use strict";

	var searching = require("__buttercup/tools/searching.js");

	module.exports = function(obj, entryID, attributeName) {
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

})(module);
