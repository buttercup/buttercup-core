const { createClient } = require("@buttercup/dropbox-client");
const TextDatasource = require("./TextDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./DatasourceAdapter.js");
const { getCredentials } = require("../credentials/channel.js");

/**
 * Datasource for Dropbox archives
 * @augments TextDatasource
 */
class DropboxDatasource extends TextDatasource {
    /**
     * Datasource for Dropbox accounts
     * @param {Credentials} credentials Credentials instance to configure the
     *  datsource with
     */
    constructor(credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig } = credentialData;
        const { token, path } = datasourceConfig;
        this.path = path;
        this.token = token;
        this.client = createClient(token);
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
}

registerDatasource("dropbox", DropboxDatasource);

module.exports = DropboxDatasource;
