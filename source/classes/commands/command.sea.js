(function(module) {

	"use strict";

	var searching = require("__buttercup/tools/searching.js");

	module.exports = function(obj, entryID, attributeName, value) {
		obj.groups = obj.groups || [];
		var entry = searching.findEntryByID(obj.groups, entryID);
		if (!entry) {
			throw new Error("Entry not found for ID");
		}
		entry.attributes = entry.attributes || {};
		entry.attributes[attributeName] = value;
	};

})(module);
