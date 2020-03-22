const TextDatasource = require("./TextDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./register.js");
const { getSharedAppEnv } = require("../env/appEnv");
const { getCredentials } = require("../credentials/channel.js");

/**
 * WebDAV datasource for reading and writing remote archives
 * @augments TextDatasource
 */
class WebDAVDatasource extends TextDatasource {
    /**
     * Constructor for the datasource
     * @param {Credentials} credentials Credentials for the datasource
     */
    constructor(credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig, username, password } = credentialData;
        const { endpoint, path } = datasourceConfig;
        this._path = path;
        const createClient = getSharedAppEnv().getProperty("net/webdav/v1/newClient");
        if (typeof username === "string" && typeof password === "string") {
            this._client = createClient(endpoint, {
                username,
                password
            });
        } else {
            this._client = createClient(endpoint);
        }
        fireInstantiationHandlers("webdav", this);
    }

    /**
     * The WebDAV client instance
     * @type {Object}
     * @memberof WebDAVDatasource
     */
    get client() {
        return this._client;
    }

    /**
     * The remote archive path
     * @type {String}
     * @memberof WebDAVDatasource
     */
    get path() {
        return this._path;
    }

    /**
     * Load archive history from the datasource
     * @param {Credentials} credentials The credentials for archive decryption
     * @returns {Promise.<Array.<String>>} A promise resolving archive history
     * @memberof WebDAVDatasource
     */
    load(credentials) {
        return this.hasContent
            ? super.load(credentials)
            : this.client.getFileContents(this.path, { format: "text" }).then(content => {
                  this.setContent(content);
                  return super.load(credentials);
              });
    }

    /**
     * Save archive contents to the WebDAV service
     * @param {Array.<String>} history Archive history
     * @param {Credentials} credentials The credentials for encryption
     * @returns {Promise} A promise resolving when the save is complete
     * @memberof WebDAVDatasource
     */
    save(history, credentials) {
        return super.save(history, credentials).then(encrypted => this.client.putFileContents(this.path, encrypted));
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof WebDAVDatasource
     */
    supportsRemoteBypass() {
        return true;
    }
}

registerDatasource("webdav", WebDAVDatasource);

module.exports = WebDAVDatasource;
