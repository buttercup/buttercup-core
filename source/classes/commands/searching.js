(function(module) {

	"use strict";

	var searching = module.exports = {

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