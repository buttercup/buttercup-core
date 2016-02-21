(function(module) {

	"use strict";

	var FormatCommand = function() {

	}

	FormatCommand.prototype.execute = function(obj, format) {
		obj.format = format;
	};

	module.exports = FormatCommand;

})(module);
