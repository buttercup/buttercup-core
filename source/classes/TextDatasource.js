(function(module) {

	"use strict";

	var Encryption = require(GLOBAL.root + "/encryption/encrypt.js"),
		Decryption = require(GLOBAL.root + "/encryption/decrypt.js"),
		Archive = require(GLOBAL.root + "/classes/ButtercupArchive.js"),
		signing = require(GLOBAL.root + "/tools/signing.js");

	var TextDatasource = function(content) {
		this._content = content;
	};

	TextDatasource.prototype.load = function(password) {
		return Promise.resolve(this._content).then(function(data) {
			if (!signing.hasValidSignature(data)) {
				return Promise.reject("No valid signature in archive");
			}
			return signing.stripSignature(data);
		}).then(function(encryptedData) {
			var decrypted = Decryption.decrypt(encryptedData, password);
			if (decrypted && decrypted.length > 0) {
				return decrypted.split("\n");
			} else {
				return Promise.reject("Decryption failed");
			}
		}).then(function(history) {
			var archive = new Archive(),
				westley = archive._getWestley();
			history.forEach(westley.execute.bind(westley));
			return archive;
		});
	};

	TextDatasource.prototype.save = function(archive, password) {
		var history = archive._getWestley().getHistory().join("\n"),
			encrypted = signing.sign(Encryption.encrypt(history, password));
		return Promise.resolve(encrypted);
	};

	module.exports = TextDatasource;

})(module);
