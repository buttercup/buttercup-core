(function(module) {

	"use strict";

	var Encryption = require(GLOBAL.root + "/encryption/encrypt.js"),
		Decryption = require(GLOBAL.root + "/encryption/decrypt.js"),
		Archive = require(GLOBAL.root + "/classes/ButtercupArchive.js"),
		signing = require(GLOBAL.root + "/tools/signing.js"),
		fs = require("fs");

	var FileDatasource = function(filename) {
		this._filename = filename;
	};

	FileDatasource.prototype.load = function(password) {
		var filename = this._filename;
		return (new Promise(function(resolve, reject) {
			fs.readFile(filename, "utf8", function(error, data) {
				if (error) {
					(reject)(error);
				} else {
					(resolve)(data);
				}
			});
		})).then(function(data) {
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
		}).catch(function(error) {
			var errorMsg = "Failed opening archive: " + error;
			console.error(errorMsg);
			throw new Error(errorMsg);
		});
	};

	FileDatasource.prototype.save = function(archive, password) {
		var history = archive._getWestley().getHistory().join("\n"),
			encrypted = signing.sign(Encryption.encrypt(history, password)),
			filename = this._filename;
		return new Promise(function(resolve, reject) {
			fs.writeFile(filename, encrypted, function(err) {
				if (err) {
					(reject)(err);
				} else {
					(resolve)();
				}
			});
		});
	};

	module.exports = FileDatasource;

})(module);