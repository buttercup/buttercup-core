const fs = require("fs");
const pify = require("pify");
const TextDatasource = require("./TextDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./register.js");
const { getCredentials } = require("../credentials/channel.js");

/**
 * File datasource for loading and saving files
 * @augments TextDatasource
 * @memberof module:Buttercup
 */
class FileDatasource extends TextDatasource {
    /**
     * Constructor for the file datasource
     * @param {Credentials} credentials The credentials instance with which to
     *  use to configure the datasource
     */
    constructor(credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig } = credentialData;
        const { path } = datasourceConfig;
        this._filename = path;
        this.readFile = pify(fs.readFile);
        this.writeFile = pify(fs.writeFile);
        this.type = "file";
        fireInstantiationHandlers("file", this);
    }

    /**
     * The file path
     * @type {String}
     * @memberof FileDatasource
     */
    get path() {
        return this._filename;
    }

    /**
     * Load from the filename specified in the constructor using a password
     * @param {Credentials} credentials The credentials for decryption
     * @returns {Promise<Array.<String>>} A promise resolving with archive history
     * @memberof FileDatasource
     */
    load(credentials) {
        return this.hasContent
            ? super.load(credentials)
            : this.readFile(this.path, "utf8").then(contents => {
                  this.setContent(contents);
                  return super.load(credentials);
              });
    }

    /**
     * Save archive history to a file
     * @param {Array.<String>} history The archive history to save
     * @param {Credentials} credentials The credentials to save with
     * @returns {Promise} A promise that resolves when saving is complete
     * @memberof FileDatasource
     */
    save(history, credentials) {
        return super.save(history, credentials).then(encrypted => this.writeFile(this.path, encrypted));
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof FileDatasource
     */
    supportsRemoteBypass() {
        return true;
    }
}

registerDatasource("file", FileDatasource);

module.exports = FileDatasource;
