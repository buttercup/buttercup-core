(function(module) {

	"use strict";

	var VALID_COMMAND_EXP = 			/^[a-z]{3}[ ].+$/;

	var Westley = function() {
		this._dataset = {};
	};

	Westley.prototype.execute = function(command) {
		if (!VALID_COMMAND_EXP.test(command)) {
			throw new Error("Invalid command");
		}
		
	};

	module.exports = Westley;

})(module);