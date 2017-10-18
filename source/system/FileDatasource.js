"use strict";

var TextDatasource = require("./TextDatasource.js"),
    fs = require("fs"),
    createDebug = require("../tools/debug.js");

const registerDatasource = require("./DatasourceAdapter.js").registerDatasource;

const debug = createDebug("file-datasource");

/**
 * File datasource for loading and saving files
 * @class FileDatasource
 * @augments TextDatasource
 */
class FileDatasource extends TextDatasource {
    /**
     * Constructor for the file datasource
     * @param {string} filename The filename to load and save
     */
    constructor(filename) {
        debug("new file datasource");
        super("");
        this._filename = filename;
    }

    /**
     * Get the path of the archive
     * @returns {String} The file path
     */
    getArchivePath() {
        return this._filename;
    }

    /**
     * Load from the filename specified in the constructor using a password
     * @param {Credentials} credentials The credentials for decryption
     * @returns {Promise<Archive>} A promise resolving with the opened archive
     */
    load(credentials) {
        debug("load archive");
        var filename = this._filename;
        return new Promise(function(resolve, reject) {
            fs.readFile(filename, "utf8", function(error, data) {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            });
        }).then(data => {
            this.setContent(data);
            return super.load(credentials);
        });
    }

    /**
     * Save an archive to a file using a password for encryption
     * @param {Archive} archive The archive to save
     * @param {Credentials} credentials The credentials to save with
     * @returns {Promise} A promise that resolves when saving is complete
     */
    save(archive, credentials) {
        debug("save archive");
        return super.save(archive, credentials).then(encrypted => {
            return new Promise((resolve, reject) => {
                fs.writeFile(this._filename, encrypted, function(err) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve();
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
            type: "file",
            path: this._filename
        });
    }
}

FileDatasource.fromObject = function fromObject(obj) {
    if (obj.type === "file") {
        return new FileDatasource(obj.path);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

FileDatasource.fromString = function fromString(str) {
    return FileDatasource.fromObject(JSON.parse(str));
};

registerDatasource("file", FileDatasource);

module.exports = FileDatasource;
