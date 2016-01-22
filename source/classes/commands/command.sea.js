(function(module) {

	"use strict";

	var Searching = require("__buttercup/tools/searching.js"),
		Entry = require("__buttercup/tools/entry.js");

	module.exports = function(obj, entryID, attributeName, value) {
		obj.groups = obj.groups || [];
		var entry = Searching.findEntryByID(obj.groups, entryID);
		if (!entry) {
			throw new Error("Entry not found for ID");
		}
		entry.attributes = entry.attributes || {};
		entry.attributes[attributeName] = value;
	};

})(module);
