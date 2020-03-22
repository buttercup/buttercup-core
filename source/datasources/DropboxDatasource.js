const { createClient } = require("@buttercup/dropbox-client");
const TextDatasource = require("./TextDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./DatasourceAdapter.js");

/**
 * Datasource for Dropbox archives
 * @augments TextDatasource
 */
class DropboxDatasource extends TextDatasource {
    /**
     * Datasource for Dropbox accounts
     * @param {String} accessToken The dropbox access token
     * @param {String} resourcePath The file path
     */
    constructor(accessToken, resourcePath) {
        super();
        this.path = resourcePath;
        this.token = accessToken;
        this.client = createClient(accessToken);
        fireInstantiationHandlers("dropbox", this);
    }

    /**
     * Load an archive from the datasource
     * @param {Credentials} credentials The credentials for decryption
     * @returns {Promise.<Array.<String>>} A promise that resolves archive history
     * @memberof DropboxDatasource
     */
    load(credentials) {
        if (this.hasContent) {
            return super.load(credentials);
        }
        return this.client.getFileContents(this.path).then(content => {
            this.setContent(content);
            return super.load(credentials);
        });
    }

    /**
     * Save an archive using the datasource
     * @param {Array.<String>} history The archive history to save
     * @param {Credentials} credentials The credentials to save with
     * @returns {Promise} A promise that resolves when saving has completed
     * @memberof DropboxDatasource
     */
    save(history, credentials) {
        return super
            .save(history, credentials)
            .then(encryptedContent => this.client.putFileContents(this.path, encryptedContent));
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof DropboxDatasource
     */
    supportsRemoteBypass() {
        return true;
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     * @memberof DropboxDatasource
     */
    toObject() {
        return {
            type: "dropbox",
            token: this.token,
            path: this.path
        };
    }
}

/**
 * Create a new instance from an object
 * @param {Object} obj The object representation
 * @returns {DropboxDatasource} A new instance
 * @static
 * @memberof DropboxDatasource
 * @throws {Error} Throws if the type is invalid
 */
DropboxDatasource.fromObject = function fromObject(obj) {
    if (obj.type === "dropbox") {
        return new DropboxDatasource(obj.token, obj.path);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

/**
 * Create a new instance from a string
 * @param {String} str The string representation
 * @returns {DropboxDatasource} A new instance
 * @throws {Error} Throws if the type is invalid
 * @memberof DropboxDatasource
 * @static
 */
DropboxDatasource.fromString = function fromString(str) {
    return DropboxDatasource.fromObject(JSON.parse(str));
};

registerDatasource("dropbox", DropboxDatasource);

module.exports = DropboxDatasource;
