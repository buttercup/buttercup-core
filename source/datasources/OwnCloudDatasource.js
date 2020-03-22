const joinURL = require("url-join");
const WebDAVDatasource = require("./WebDAVDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./DatasourceAdapter.js");

/**
 * Datasource for OwnCloud archives
 * @augments WebDAVDatasource
 */
class OwnCloudDatasource extends WebDAVDatasource {
    /**
     * Datasource for Owncloud connections
     * @param {String} owncloudURL The URL to the owncloud instance, without "remote.php/webdav" etc.
     * @param {String} resourcePath The file path
     * @param {Credentials=} credentials The credentials (username/password) for owncloud
     */
    constructor(owncloudURL, resourcePath, credentials) {
        super(joinURL(owncloudURL, "remote.php/webdav/"), resourcePath, credentials);
        this._originalURL = owncloudURL;
        fireInstantiationHandlers("owncloud", this);
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     * @memberof OwnCloudDatasource
     */
    toObject() {
        return {
            type: "owncloud",
            endpoint: this._originalURL,
            path: this.path
        };
    }
}

/**
 * Create an instance from an object
 * @param {Object} obj The object representation of the datasource
 * @param {Credentials=} hostCredentials Remote server credentials
 * @static
 * @memberof OwnCloudDatasource
 * @returns {OwnCloudDatasource} A new instance
 * @throws {Error} Throws for an invalid type specification
 */
OwnCloudDatasource.fromObject = function fromObject(obj, hostCredentials) {
    if (obj.type === "owncloud") {
        return new OwnCloudDatasource(obj.endpoint, obj.path, hostCredentials);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

/**
 * Create an instance from a string
 * @param {String} str The string representation of the datasource
 * @param {Credentials=} hostCredentials The remote server credentials
 * @static
 * @memberof OwnCloudDatasource
 * @returns {OwnCloudDatasource} A new instance
 * @throws {Error} Throws for an invalid type specification
 */
OwnCloudDatasource.fromString = function fromString(str, hostCredentials) {
    return OwnCloudDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("owncloud", OwnCloudDatasource);

module.exports = OwnCloudDatasource;
