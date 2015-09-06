(function(module) {

	"use strict";

	var Encryption = require(__dirname + "/encryption/encrypt.js"),
		Decryption = require(__dirname + "/encryption/decrypt.js");

	module.exports = {

		decryptText: function(text, password) {
			return Decryption.decrypt(text, password);
		},

		encryptText: function(text, password) {
			return Encryption.encrypt(text, password);
		}

	};

})(module);
