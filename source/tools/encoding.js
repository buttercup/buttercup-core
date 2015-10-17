(function(module) {

	"use strict";

	var Crypto = require("crypto"),
		uuid = require('uuid');

	var lib = module.exports = {

		escapeTextValue: function(txt) {
			return txt.replace(/"/g, '\\"');
		},

		getUniqueID: function() {
			return uuid.v4();
		},

		/**
		 * Hash text using sha256
		 * @param {String} text
		 * @returns {Buffer}
		 */
		hashText: function(text) {
			return Crypto.createHash('sha256').update(text).digest();
		},

		unescapeTextValue: function(txt) {
			return txt.replace(/\\"/g, '"');
		}

	};

})(module);
