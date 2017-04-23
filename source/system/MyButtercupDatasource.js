"use strict";

const TextDatasource = require("./TextDatasource.js");
const buildAdapter = require("./MyButtercupAdapter.js");
const registerDatasource = require("./DatasourceAdapter.js").registerDatasource;

/**
 * Datasource for the MyButtercup provider
 * @augments TextDatasource
 */
class MyButtercupDatasource extends TextDatasource {

    /**
     * Constructor for the datasource
     * @param {Number} archiveID The ID of the archive
     * @param {String} accessToken The OAuth access token
     */
    constructor(archiveID, accessToken) {
        super("");
        this._token = accessToken;
        this._archiveID = parseInt(archiveID, 10);
        this._adapter = buildAdapter(archiveID, accessToken);
    }

    /**
     * Load an archive from the datasource
     * @param {Credentials} credentials Credentials instance
     * @returns {Promise.<Archive>} A promise that resolves with an Archive instance
     */
    load(credentials) {
        return this._adapter
            .getArchiveData()
            .then(data => {
                this.setContent(data);
                return super.load(credentials, /* new if empty */ true);
            });
    }

    /**
     * Save an archive
     * @param {Archive} archive The archive to save
     * @param {Credentials} credentials The credentials to use for saving (master password)
     * @returns {Promise} A promise that resolves once saving is complete
     */
    save(archive, credentials) {
        return super
            .save(archive, credentials)
            .then(encrypted => this._adapter.saveArchiveData(encrypted));
    }

    /**
     * Convert the datasource to an object
     * @returns {Object} The object representation
     */
    toObject() {
        return {
            type: "mybuttercup",
            token: this._token,
            archiveID: this._archiveID
        };
    }

}

/**
 * Create a datasource instance from an object
 * @static
 * @param {Object} obj The object to create an instance from
 * @memberof MyButtercupDatasource
 * @returns {MyButtercupDatasource} A datasource instance
 * @throws {Error} Throws if the type is not recognised
 */
MyButtercupDatasource.fromObject = function fromObject(obj) {
    if (obj.type === "mybuttercup") {
        return new MyButtercupDatasource(obj.archiveID, obj.token);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

/**
 * Create a datasource from a string
 * @see MyButtercupDatasource.fromObject
 * @param {String} str The string representation of a datasource
 * @param {Credentials} hostCredentials The credentials for the remote provider
 * @returns {MyButtercupDatasource} A datasource instance
 */
MyButtercupDatasource.fromString = function fromString(str, hostCredentials) {
    return MyButtercupDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("mybuttercup", MyButtercupDatasource);

module.exports = MyButtercupDatasource;
