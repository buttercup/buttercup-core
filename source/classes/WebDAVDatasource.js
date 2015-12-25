(function(module) {

	"use strict";

	var curl = require("curlrequest"),
		webdavFS = require("webdav-fs"),
		TextDatasource = require("buttercup/classes/TextDatasource.js");

	var WebDAV = function(endpoint, path, username, password) {
		var endpointLen = endpoint.length;
		endpoint = (endpoint[endpointLen - 1] === "/") ? endpoint : endpoint + "/";
		path = (path[0] === "/") ? path : "/" + path;
		this._wfs = webdavFS(endpoint, username, password);
		this._path = path;
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
		var textDatasource = new TextDatasource(),
			wfs = this._wfs,
			path = this._path;
		return textDatasource.save(archive, password)
			.then(function(encrypted) {
				return new Promise(function(resolve, reject) {
					wfs.writeFile(path, encrypted, "utf8", function(error) {
						if (error) {
							(reject)(error);
						} else {
							(resolve)();
						}
					});
				});
			});
	};

	module.exports = WebDAV;

})(module);
