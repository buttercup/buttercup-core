(function(module) {

	"use strict";

	var Encryption = require("__buttercup/encryption/encrypt.js"),
		Decryption = require("__buttercup/encryption/decrypt.js"),
		Archive = require("__buttercup/classes/Archive.js"),
		signing = require("__buttercup/tools/signing.js"),
		encoding = require("__buttercup/tools/encoding.js");

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
				var decompressed = encoding.decompress(decrypted);
				if (decompressed) {
					return decompressed.split("\n");
				}
			}
			return Promise.reject("Decryption failed");
		}).then(function(history) {
			var archive = new Archive(),
				westley = archive._getWestley();
			westley.clear();
			history.forEach(westley.execute.bind(westley));
			return archive;
		});
	};

	TextDatasource.prototype.save = function(archive, password) {
		var history = archive._getWestley().getHistory().join("\n"),
			compressed = encoding.compress(history),
			encrypted = signing.sign(Encryption.encrypt(compressed, password));
		return Promise.resolve(encrypted);
	};

	module.exports = TextDatasource;

})(module);
