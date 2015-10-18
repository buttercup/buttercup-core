(function(module) {

	"use strict";

	var EntryProperty = {
		Password: 					"password",
		Title: 						"title",
		Username: 					"username"
	};

	module.exports = {

		isValidProperty: function(name) {
			for (var keyname in EntryProperty) {
				if (EntryProperty.hasOwnProperty(keyname)) {
					if (EntryProperty[keyname] === name) {
						return true;
					}
				}
			}
			return false;
		}

	};

})(module);
