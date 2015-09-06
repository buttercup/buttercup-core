(function(module) {

	"use strict";

	var Encryption = require(__dirname + "/encryption/encrypt.js");

	module.exports = {

		decryptText: function(text, password) {

		},

		encryptText: function(text, password) {
			return Encryption.encrypt(text, password);
		}

	};

})(module);
