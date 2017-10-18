"use strict";

var WebDAVDatasource = require("./WebDAVDatasource.js");

const registerDatasource = require("./DatasourceAdapter.js").registerDatasource;

/**
 * Datasource for OwnCloud archives
 * @augments WebDAVDatasource
 */
class OwnCloudDatasource extends WebDAVDatasource {
    /**
     * Datasource for Owncloud connections
     * @param {String} owncloudURL The URL to the owncloud instance, without "remote.php/webdav" etc.
     * @param {String} resourcePath The file path
     * @param {Credentials} credentials The credentials (username/password) for owncloud
     */
    constructor(owncloudURL, resourcePath, credentials) {
        let urlLen = owncloudURL.length,
            toObjectRefs = { owncloudURL, resourcePath };
        owncloudURL = owncloudURL[urlLen - 1] === "/" ? owncloudURL : owncloudURL + "/";
        owncloudURL += "remote.php/webdav/";
        super(owncloudURL, resourcePath, credentials);
        this._toObjectRefs = toObjectRefs;
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     */
    toObject() {
        return {
            type: "owncloud",
            endpoint: this._toObjectRefs.owncloudURL,
            path: this._toObjectRefs.resourcePath
        };
    }
}

OwnCloudDatasource.fromObject = function fromObject(obj, hostCredentials) {
    if (!hostCredentials) {
        throw new Error("Credentials required for OwnCloudDatasource instantiation");
    }
    if (obj.type === "owncloud") {
        return new OwnCloudDatasource(obj.endpoint, obj.path, hostCredentials);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

OwnCloudDatasource.fromString = function fromString(str, hostCredentials) {
    return OwnCloudDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("owncloud", OwnCloudDatasource);

module.exports = OwnCloudDatasource;
