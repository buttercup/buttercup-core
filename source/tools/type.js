(function(module) {

	"use strict";

	var lib = module.exports = {

		isArray: function(item) {
			return Object.prototype.toString.call(item) === "[object Array]";
		}

	};

})(module);
