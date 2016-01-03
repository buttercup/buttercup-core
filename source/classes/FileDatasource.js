(function(module) {

	"use strict";

	var TextDatasource = require("__buttercup/classes/TextDatasource.js"),
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
			var textDatasource = new TextDatasource(data);
			return textDatasource.load(password);
		}).catch(function(error) {
			var errorMsg = "Failed opening archive: " + error;
			console.error(errorMsg);
			throw new Error(errorMsg);
		});
	};

	FileDatasource.prototype.save = function(archive, password) {
		var textDatasource = new TextDatasource(),
			filename = this._filename;
		return textDatasource.save(archive, password)
			.then(function(encrypted) {
				return new Promise(function(resolve, reject) {
					fs.writeFile(filename, encrypted, function(err) {
						if (err) {
							(reject)(err);
						} else {
							(resolve)();
						}
					});
				});
			});
	};

	module.exports = FileDatasource;

})(module);