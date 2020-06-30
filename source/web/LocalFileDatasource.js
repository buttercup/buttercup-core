const { fireInstantiationHandlers, registerDatasource } = require("../datasources/register.js");
const TextDatasource = require("../datasources/TextDatasource.js");
const { getCredentials } = require("../credentials/channel.js");
const { buildClient } = require("./localFileClient.js");

class LocalFileDatasource extends TextDatasource {
    constructor(credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig } = credentialData;
        const { path, token } = datasourceConfig;
        this._path = path;
        this._token = token;
        this.client = buildClient(token);
        this.type = "localfile";
        fireInstantiationHandlers("localfile", this);
    }

    get path() {
        return this._path;
    }

    get token() {
        return this._token;
    }

    /**
     * Load archive history from the datasource
     * @param {Credentials} credentials The credentials for archive decryption
     * @returns {Promise.<Array.<String>>} A promise resolving archive history
     * @memberof LocalFileDatasource
     */
    load(credentials) {
        const readProc = new Promise((resolve, reject) => {
            this.client.readFile(this.path, (err, content) => {
                if (err) {
                    return reject(err);
                }
                resolve(content);
            });
        });
        return readProc.then(content => {
            this.setContent(content);
            return super.load(credentials);
        });
    }

    /**
     * Save archive contents to the WebDAV service
     * @param {Array.<String>} history Archive history
     * @param {Credentials} credentials The credentials for encryption
     * @returns {Promise} A promise resolving when the save is complete
     * @memberof LocalFileDatasource
     */
    save(history, credentials) {
        return super.save(history, credentials).then(
            encrypted =>
                new Promise((resolve, reject) => {
                    this.client.writeFile(this.path, encrypted, err => {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                })
        );
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof LocalFileDatasource
     */
    supportsRemoteBypass() {
        return false;
    }
}

registerDatasource("localfile", LocalFileDatasource);

module.exports = LocalFileDatasource;
