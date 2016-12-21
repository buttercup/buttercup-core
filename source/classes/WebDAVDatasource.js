"use strict";

var webdavFS = require("webdav-fs"),
    TextDatasource = require("./TextDatasource.js");

const { registerDatasource } = require("./DatasourceAdapter.js");

/**
 * WebDAV datasource for reading and writing remote archives
 * @class WebDAVDatasource
 * @augments TextDatasource
 */
class WebDAVDatasource extends TextDatasource {

    /**
     * Constructor for the datasource
     * @param {string} endpoint URL for the WebDAV service (without resource path)
     * @param {string} webDAVPath Resource path on the WebDAV service
     * @param {string} username Username for the WebDAV service
     * @param {string} password Password for the WebDAV service
     */
    constructor(endpoint, webDAVPath, username, password) {
        super("");
        var endpointLen = endpoint.length;
        this._endpoint = (endpoint[endpointLen - 1] === "/") ? endpoint : endpoint + "/";
        webDAVPath = (webDAVPath[0] === "/") ? webDAVPath : "/" + webDAVPath;
        this._wfs = webdavFS(this._endpoint, username, password);
        this._path = webDAVPath;
    }

    /**
     * Get the path of the archive on the server
     * @returns {string} The path
     */
    getArchivePath() {
        return this._path;
    }

    /**
     * Get the remote endpoint URI (no resource path)
     * @returns {string} The endpoint
     */
    getRemoteEndpoint() {
        return this._endpoint;
    }

    /**
     * Load the archive using a password
     * @param {string} password The password for archive decryption
     * @returns {Promise.<Archive>} A promise resolving with the opened archive
     */
    load(password) {
        var wfs = this._wfs,
            filePath = this._path;
        return (new Promise(function(resolve, reject) {
            wfs.readFile(filePath, "utf8", function(error, data) {
                if (error) {
                    (reject)(error);
                } else {
                    (resolve)(data);
                }
            });
        })).then((content) => {
            this.setContent(content);
            return super.load(password);
        }).catch(function(err) {
            var errorMsg = "Failed opening archive: " + err;
            console.error(errorMsg);
            throw err;
        });
    }

    /**
     * Save an archive with a password to the WebDAV service
     * @param {Archive} archive The archive to save
     * @param {string} password The password for encryption
     * @returns {Promise} A promise resolving when the save is complete
     */
    save(archive, password) {
        var wfs = this._wfs,
            filePath = this._path;
        return super
            .save(archive, password)
            .then(function(encrypted) {
                return new Promise(function(resolve, reject) {
                    wfs.writeFile(filePath, encrypted, "utf8", function(error) {
                        if (error) {
                            (reject)(error);
                        } else {
                            (resolve)();
                        }
                    });
                });
            });
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     */
    toObject() {
        return Object.assign(super.toObject(), {
            type: "webdav",
            endpoint: this._endpoint,
            path: this._path
        });
    }

}

WebDAVDatasource.fromObject = function fromObject(obj, hostCredentials) {
    if (!hostCredentials) {
        throw new Error("Credentials required for WebDAVDatasource instantiation");
    }
    if (obj.type === "webdav") {
        return new WebDAVDatasource(obj.endpoint, obj.path, hostCredentials.username, hostCredentials.password);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

WebDAVDatasource.fromString = function fromString(str, hostCredentials) {
    return WebDAVDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("webdav", WebDAVDatasource);

module.exports = WebDAVDatasource;
