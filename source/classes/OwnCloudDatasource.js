(function(module) {
	
	"use strict";

	var WebDAVDatasource = require("__buttercup/classes/WebDAVDatasource.js");

	/**
	 * Datasource for Owncloud connections
	 * @class OwnCloudDatasource
	 * @param {String} owncloudURL The URL to the owncloud instance, without "remote.php/webdav" etc.
	 * @param {String} path The file path
	 * @param {String} username The username for owncloud
	 * @param {String} password The password for owncloud
	 */
	var OwnCloudDatasource = function(owncloudURL, path, username, password) {
		var urlLen = owncloudURL.length;
		owncloudURL = (owncloudURL[urlLen - 1] === "/") ? owncloudURL : owncloudURL + "/";
		owncloudURL += "remote.php/webdav/";
		this._webDAV = new WebDAVDatasource(owncloudURL, path, username, password);
	};

	/**
	 * Load the archive from owncloud
	 * @see WebDAVDatasource.load
	 * @param {String} password The archive password
	 * @returns {Promise}
	 */
	OwnCloudDatasource.prototype.load = function(password) {
		return this._webDAV.load(password);
	};

	/**
	 * Save the archive in owncloud
	 * @see WebDAVDatasource.save
	 * @param {Archive} archive An archive instance
	 * @param {String} password The password to encrypt the archive with
	 * @returns {Promise}
	 */
	OwnCloudDatasource.prototype.save = function(archive, password) {
		return this._webDAV.save(archive, password);
	};

	module.exports = OwnCloudDatasource;

})(module);
