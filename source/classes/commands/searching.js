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
				if (group.groups) {
					var deepEntry = searching.findEntryByID(group.groups, id);
					if (deepEntry) {
						return deepEntry;
					}
				}
			}
			return null;
		},

		findGroupByID: function(groups, id) {
			for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
				if (groups[i].id === id) {
					return groups[i];
				}
				if (groups[i].groups) {
					var deepGroup = searching.findGroupByID(groups[i].groups, id);
					if (deepGroup) {
						return deepGroup;
					}
				}
			}
			return null;
		},

		findGroupContainingEntryID: function(groups, id) {
			for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
				var group = groups[i];
				if (group.entries) {
					for (var j = 0, entriesLen = group.entries.length; j < entriesLen; j += 1) {
						if (group.entries[j].id === id) {
							return { 
								group: group,
								index: j
							};
						}
					}
				}
				if (group.groups) {
					var deepGroup = searching.findGroupContainingEntryID(group.groups, id);
					if (deepGroup.group) {
						return deepGroup;
					}
				}
			}
			return {
				group: null,
				index: null
			};
		},

		findGroupContainingGroupID: function(group, id) {
			var groups = group.groups || [];
			for (var i = 0, groupsLen = groups.length; i < groupsLen; i += 1) {
				if (groups[i].id === id) {
					return {
						group: group,
						index: i
					};
				}
				var deepGroup = searching.findGroupContainingGroupID(groups[i], id);
				if (deepGroup.group) {
					return deepGroup;
				}
			}
			return {
				group: null,
				index: null
			};
		}

	};

})(module);
