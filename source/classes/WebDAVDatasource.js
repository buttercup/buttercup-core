(function(module) {

	"use strict";

	var curl = require("curlrequest"),
		TextDatasource = require(GLOBAL.root + "/classes/TextDatasource.js");

	var WebDAV = function(endpoint, path, username, password) {
		var endpointLen = endpoint.length;
		endpoint = (endpoint[endpointLen - 1] === "/") ? endpoint : endpoint + "/";
		path = (path[0] === "/") ? path.substring(1) : path;
		var login = username + ":" + password;
		this._targetURL = (endpoint + path).replace(/(https?):\/\//i, "$1://" + login + "@");
	};

	WebDAV.prototype.load = function(password) {
		var curlOpts = {
			url: this._targetURL,
			method: "GET",
			verbose: true
		};
		return (new Promise(function(resolve, reject) {
			curl.request(curlOpts, function(err, data) {
				if (err) {
					(reject)(err);
				} else {
					(resolve)(data);
				}
			});
		})).then(function(content) {
			var textDatasource = new TextDatasource(content);
			return textDatasource.load(password);
		}).catch(function(err) {
			var errorMsg = "Failed opening archive: " + err;
			console.error(errorMsg);
			throw new Error(errorMsg);
		});
	};

	WebDAV.prototype.save = function(archive, password) {
		var targetURL = this._targetURL,
			textDatasource = new TextDatasource();
		return textDatasource.save(archive, password)
			.then(function(encrypted) {
				var curlOpts = {
					url: targetURL,
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
			});
	};

	module.exports = WebDAV;

})(module);
