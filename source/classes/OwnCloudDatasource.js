(function(module) {
	
	"use strict";

	var WebDAVDatasource = require(GLOBAL.root + "/classes/WebDAVDatasource.js");

	var OwnCloudDatasource = function(owncloudURL, path, username, password) {
		var urlLen = owncloudURL.length;
		owncloudURL = (owncloudURL[urlLen - 1] === "/") ? owncloudURL : owncloudURL + "/";
		owncloudURL += "remote.php/webdav/";
		this._webDAV = new WebDAVDatasource(owncloudURL, path, username, password);
	};

	OwnCloudDatasource.prototype.load = function(password) {
		return this._webDAV.load(password);
	};

	OwnCloudDatasource.prototype.save = function(archive, password) {
		return this._webDAV.save(archive, password);
	};

	module.exports = OwnCloudDatasource;

})(module);
