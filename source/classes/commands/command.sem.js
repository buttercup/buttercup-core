(function(module) {

	"use strict";

	var Searching = require(GLOBAL.root + "/tools/searching.js"),
		Entry = require(GLOBAL.root + "/tools/entry.js");

	module.exports = function(obj, entryID, propertyName, value) {
		obj.groups = obj.groups || [];
		var entry = Searching.findEntryByID(obj.groups, entryID);
		if (!entry) {
			throw new Error("Entry not found for ID");
		}
		entry.meta = entry.meta || {};
		entry.meta[propertyName] = value;
	};

})(module);
