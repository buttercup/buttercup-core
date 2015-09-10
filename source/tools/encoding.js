(function(module) {

	"use strict";

	var Crypto = require("crypto");

	var lib = module.exports = {

		hashText: function(text) {
			return Crypto.createHash('sha256').update(text).digest();
		}

	};

})(module);
