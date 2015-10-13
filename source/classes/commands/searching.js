(function(module) {

	"use strict";

	var searching = module.exports = {

		findEntryByID: function(groups, id) {
			for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
				var group = groups[i];
				if (group.entries) {
					for (var j = 0, entriesLen = group.entries.length; j < entriesLen; j += 1) {
						if (group.entries[j].id === id) {
							return group.entries[j];
						}
					}
				}
			}
			if (groups.groups) {
				return searching.findEntryByID(groups.groups, id);
			}
			return null;
		},

		findGroupByID: function(groups, id) {
			for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
				if (groups[i].id === id) {
					return groups[i];
				}
			}
			if (groups.groups) {
				return searching.findGroupByID(groups.groups, id);
			}
			return null;
		}

	};

})(module);