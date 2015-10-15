(function(module) {

	"use strict";

	var curl = require("curlrequest"),
		Encryption = require(GLOBAL.root + "/encryption/encrypt.js"),
		Decryption = require(GLOBAL.root + "/encryption/decrypt.js"),
		Archive = require(GLOBAL.root + "/classes/ButtercupArchive.js"),
		signing = require(GLOBAL.root + "/tools/signing.js");

	var WebDAV = function(endpoint, path, username, password) {
		var endpointLen = endpoint.length;
		endpoint = (endpoint[endpointLen - 1] === "/") ? endpoint : endpoint + "/";
		var login = username + ":" + password;
		this._targetURL = (endpoint + filename).replace(/(https?):\/\//i, "$1://" + login + "@");
	};

	WebDAV.prototype.save = function(archive, password) {
		var history = archive._getWestley().getHistory().join("\n"),
			encrypted = signing.sign(Encryption.encrypt(history, password)),
			filename = this._filename;
		var curlOpts = {
			url: this._targetURL,
			method: "PUT",
			data: encrypted,
			verbose: true
		};
		return new Promise(function(resolve, reject) {
			curl.request(curlOpts, function(err, data) {
				if (err) {
					(reject)(err);
				} else {
					(resolve)();
				}
			});
		});
	};

	module.exports = WebDAV;

})(module);
