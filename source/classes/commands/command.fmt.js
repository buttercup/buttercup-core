(function(module) {

	"use strict";

	var searching = require(__dirname + "/searching.js");

	module.exports = function(obj, format) {
		obj.format = format;
	};

})(module);
