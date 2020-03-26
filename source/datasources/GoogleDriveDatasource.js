const { createClient } = require("@buttercup/googledrive-client");
const VError = require("verror");
const AuthManager = require("./AuthManager.js");
const TextDatasource = require("./TextDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./register.js");
const { getCredentials, setCredentials } = require("../credentials/channel.js");

const DATASOURCE_TYPE = "googledrive";

/**
 * Datasource for Google Drive archives
 * @augments TextDatasource
 */
class GoogleDriveDatasource extends TextDatasource {
    /**
     * Datasource for Google Drive connections
     * @param {Credentials} credentials The credentials instance with which to
     *  configure the datasource with
     */
    constructor(credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig } = credentialData;
        const { token, refreshToken, fileID } = datasourceConfig;
        this.fileID = fileID;
        this.updateTokens(token, refreshToken);
        this.authManager = AuthManager.getSharedManager();
        this.type = DATASOURCE_TYPE;
        fireInstantiationHandlers(DATASOURCE_TYPE, this);
    }

    /**
     * Load an archive from the datasource
     * @param {Credentials} credentials The credentials for decryption
     * @returns {Promise.<Array.<String>>} A promise that resolves archive history
     * @memberof GoogleDriveDatasource
     */
    load(credentials, hasAuthed = false) {
        if (this.hasContent) {
            return super.load(credentials);
        }
        return this.client
            .getFileContents(this.fileID)
            .then(content => {
                this.setContent(content);
                return super.load(credentials);
            })
            .catch(err => {
                const { authFailure = false } = VError.info(err);
                if (!authFailure) {
                    throw new VError(err, "Failed fetching Google Drive vault");
                } else if (hasAuthed) {
                    throw new VError(err, "Re-authentication failed");
                }
                return this.authManager
                    .executeAuthHandlers(DATASOURCE_TYPE, this)
                    .then(() => this.load(credentials, true))
                    .catch(err2 => {
                        throw new VError(err2, "Failed fetching Google Drive vault");
                    });
            });
    }

    /**
     * Save an archive using the datasource
     * @param {Array.<String>} history The archive history to save
     * @param {Credentials} credentials The credentials to save with
     * @returns {Promise} A promise that resolves when saving has completed
     * @memberof GoogleDriveDatasource
     */
    save(history, credentials, hasAuthed = false) {
        return super
            .save(history, credentials)
            .then(encryptedContent =>
                this.client.putFileContents({
                    id: this.fileID,
                    contents: encryptedContent
                })
            )
            .catch(err => {
                const { authFailure = false } = VError.info(err);
                if (!authFailure) {
                    throw new VError(err, "Failed saving Google Drive vault");
                } else if (hasAuthed) {
                    throw new VError(err, "Re-authentication failed");
                }
                return this.authManager
                    .executeAuthHandlers(DATASOURCE_TYPE, this)
                    .then(() => this.save(history, credentials, true))
                    .catch(err2 => {
                        throw new VError(err2, "Failed saving Google Drive vault");
                    });
            });
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof GoogleDriveDatasource
     */
    supportsRemoteBypass() {
        return true;
    }

    /**
     * Update the OAuth2 tokens
     * @param {String} accessToken The access token
     * @param {String=} refreshToken The refresh token
     * @memberof GoogleDriveDatasource
     */
    updateTokens(accessToken, refreshToken) {
        this.token = accessToken;
        this.refreshToken = refreshToken;
        this.client = createClient(accessToken);
        const credentialsData = getCredentials(this._credentials.id);
        Object.assign(credentialsData.datasource, {
            token: accessToken,
            refreshToken: refreshToken
        });
        setCredentials(this._credentials.id, credentialsData);
        this.emit("updated");
    }
}

registerDatasource(DATASOURCE_TYPE, GoogleDriveDatasource);

module.exports = GoogleDriveDatasource;
