"use strict";

var WebDAVDatasource = require("./WebDAVDatasource.js");

const registerDatasource = require("./DatasourceAdapter.js").registerDatasource;

/**
 * Datasource for OwnCloud archives
 * @class OwnCloudDatasource
 * @augments WebDAVDatasource
 */
class OwnCloudDatasource extends WebDAVDatasource {

    /**
     * Datasource for Owncloud connections
     * @param {String} owncloudURL The URL to the owncloud instance, without "remote.php/webdav" etc.
     * @param {String} resourcePath The file path
     * @param {String} username The username for owncloud
     * @param {String} password The password for owncloud
     */
    constructor(owncloudURL, resourcePath, username, password) {
        var urlLen = owncloudURL.length;
        this._owncloudURL = owncloudURL;
        this._owncloudPath = resourcePath;
        owncloudURL = (owncloudURL[urlLen - 1] === "/") ? owncloudURL : owncloudURL + "/";
        owncloudURL += "remote.php/webdav/";
        super(owncloudURL, resourcePath, username, password);
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     */
    toObject() {
        return {
            type: "owncloud",
            endpoint: this._owncloudURL,
            path: this._owncloudPath
        };
    }

}

OwnCloudDatasource.fromObject = function fromObject(obj, hostCredentials) {
    if (!hostCredentials) {
        throw new Error("Credentials required for OwnCloudDatasource instantiation");
    }
    if (obj.type === "owncloud") {
        return new OwnCloudDatasource(obj.endpoint, obj.path, hostCredentials.username, hostCredentials.password);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

OwnCloudDatasource.fromString = function fromString(str, hostCredentials) {
    return OwnCloudDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("owncloud", OwnCloudDatasource);

module.exports = OwnCloudDatasource;
