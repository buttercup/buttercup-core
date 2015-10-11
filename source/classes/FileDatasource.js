(function(module) {

	"use strict";

	var Decryption = require(GLOBAL.root + "/encryption/decrypt.js"),
		Encryption = require(GLOBAL.root + "/encryption/encrypt.js"),
		signing = require(GLOBAL.root + "/tools/signing.js"),
		typeTool = require(GLOBAL.root + "/tools/type.js"),
		fs = require("fs"),
		Promise = require("promise-polyfill");

	// *** Helpers

	function marshalDecryptedData(obj) {
		return {
			title: 				obj.title || "",
			format: 			obj.format || "",
			groups: 			typeTool.isArray(obj.groups) ? obj.groups : []
		};
	}

	function marshalNewData(details, groups) {
		return {
			title: 				details.title || "",
			format: 			signing.getFormat(),
			groups: 			groups
		};
	}

	// *** Class

	var FileDatasource = function(filename) {
		this._filename = filename;
	};

	FileDatasource.prototype.getData = function(password) {
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
				var decodedObject = false,
					errorMessage = "JSON decoding failed";
				try {
					decodedObject = JSON.parse(decrypted);
				} catch (e) {
					errorMessage = e.message || errorMessage;
				}
				if (!decodedObject) {
					return Promise.reject(errorMessage);
				}
				return decodedObject;
			} else {
				return Promise.reject("Decryption failed");
			}
		}).then(function(decryptedObject) {
			return marshalDecryptedData(decryptedObject);
		}).catch(function(error) {
			var errorMsg = "Failed opening archive: " + error;
			console.error(errorMsg);
			return Promise.reject(errorMsg);
		});
	};

	FileDatasource.prototype.setData = function(password, details, groups) {
		var filename = this._filename,
			data = marshalNewData(details, groups),
			textData = JSON.stringify(data),
			encrypted = Encryption.encrypt(textData, password);
		// sign archive
		encrypted = signing.sign(encrypted);
		return new Promise(function(resolve, reject) {
			fs.writeFile(filename, encrypted, function(error) {
				if (error) {
					(reject)(error);
				} else {
					(resolve)();
				}
			})
		});
	};

	module.exports = FileDatasource;

})(module);
