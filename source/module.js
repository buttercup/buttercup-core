(function(module) {

	"use strict";

	GLOBAL.root = __dirname;

	// Encryption info from: http://lollyrock.com/articles/nodejs-encryption/
	var Encryption = require(GLOBAL.root + "/encryption/encrypt.js"),
		Decryption = require(GLOBAL.root + "/encryption/decrypt.js");

	module.exports = {

		decryptText: function(text, password) {
			return Decryption.decrypt(text, password);
		},

		encryptText: function(text, password) {
			return Encryption.encrypt(text, password);
		}

	};

})(module);
