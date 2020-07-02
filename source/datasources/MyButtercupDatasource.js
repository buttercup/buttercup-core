const VError = require("verror");
const { fireInstantiationHandlers, registerDatasource } = require("./register.js");
const TextDatasource = require("./TextDatasource.js");
const Credentials = require("../credentials/Credentials.js");
const VaultComparator = require("../core/VaultComparator.js");
const MyButtercupClient = require("../myButtercup/MyButtercupClient.js");
const { generateNewUpdateID } = require("../myButtercup/update.js");
const { getCredentials } = require("../credentials/channel.js");

/**
 * My Buttercup datasource
 * @augments TextDatasource
 * @memberof module:Buttercup
 */
class MyButtercupDatasource extends TextDatasource {
    /**
     * Constructor for the datasource
     * @param {Credentials} credentials Credentials for the datasource
     * @memberof MyButtercupDatasource
     */
    constructor(credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig } = credentialData;
        const { accessToken, clientID, clientSecret, refreshToken, vaultID } = datasourceConfig;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this._clientID = clientID;
        this._clientSecret = clientSecret;
        this._client = null;
        this._vaultID = vaultID; // The MyButtercup vault identifier
        this._updateID = null;
        this._createNewClient();
        fireInstantiationHandlers("mybuttercup", this);
    }

    /**
     * @type {MyButtercupClient}
     * @readonly
     * @memberof MyButtercupDatasource
     */
    get client() {
        return this._client;
    }

    /**
     * Change the master password for the vault
     * (Called with a preflight check to ensure that the datasource is
     * ready to change - if not ready, the method will return false)
     * @param {*} newCredentials
     * @param {*} preflight
     * @returns {Promise.<Boolean|undefined>} A promise that resolves
     *  with a boolean value during preflight, or with simply undefined
     *  if performing the final change action.
     * @example
     *  const creds = Credentials.fromPassword("test");
     *  const isReady = await tds.changePassword(
     *      creds,
     *      true // preflight
     *  );
     *  if (!isReady) {
     *      throw new Error("Datasource unable to change password");
     *  }
     *  await tds.changePassword(creds, false);
     */
    async changePassword(newCredentials, preflight) {
        const {
            data: { passwordToken },
            masterPassword
        } = getCredentials(newCredentials.id);
        if (preflight) {
            await this._client.testPasswordChange(passwordToken);
            return true;
        }
        await this._client.changePassword(masterPassword, passwordToken);
    }

    /**
     * Load vault history from remote
     * @param {Credentials} credentials The archive credentials
     * @returns {Promise.<LoadedVaultData>} Promise which resolves with
     *  vault data
     * @memberof MyButtercupDatasource
     */
    load(credentials) {
        return this._client
            .fetchUserVault()
            .then(({ archive, updateID }) => {
                this._updateID = updateID;
                this.setContent(archive);
            })
            .catch(err => {
                throw new VError(err, "Failed retrieving vault contents");
            })
            .then(() => super.load(credentials));
    }

    /**
     * Override for history difference checking
     * @see Workspace#localDiffersFromRemote
     * @param {Credentials} masterCredentials Master service credentials
     * @param {String[]} archiveHistory Archive history lines
     * @returns {Promise.<Boolean>} True if differing, false otherwise
     * @memberof MyButtercupDatasource
     */
    localDiffersFromRemote(masterCredentials, archiveHistory) {
        return this.client
            .fetchUserVaultDetails()
            .then(({ updateID }) => {
                if (updateID !== this._updateID) {
                    return true;
                }
                this.setContent("");
                return this.load(masterCredentials).then(({ Format, history: incomingHistory }) => {
                    const diffs = VaultComparator.calculateHistoryDifferences(archiveHistory, incomingHistory);
                    if (!diffs) {
                        return true;
                    }
                    return diffs.original.length > 0 || diffs.secondary.length > 0;
                });
            })
            .catch(err => {
                throw new VError(err, "Failed comparing remote/local vault status");
            });
    }

    /**
     * Save vault contents to remote
     * @param {String[]} history The vault history lines
     * @param {Credentials} credentials Vault credentials
     * @returns {Promise}
     * @memberof MyButtercupDatasource
     */
    save(history, credentials) {
        const newUpdateID = generateNewUpdateID();
        return super
            .save(history, credentials)
            .then(encryptedContents => this.client.writeUserArchive(encryptedContents, this._updateID, newUpdateID))
            .then(() => {
                // Successful, set the new updateID
                this._updateID = newUpdateID;
            })
            .catch(err => {
                // @todo handle update ID clash/merge
                throw new VError(err, "Failed uploading new vault contents");
            });
    }

    /**
     * Whether or not the datasource supports the changing of the master password
     * @returns {Boolean} True if it supports changing the master password
     * @memberof WebDAVDatasource
     */
    supportsPasswordChange() {
        return true;
    }

    /**
     * Update vault/account insights
     * @param {Insights} insights Insights to update
     * @returns {Promise}
     * @memberof MyButtercupDatasource
     */
    async updateInsights(insights) {
        if (Object.keys(insights).length <= 0) return;
        await this._client.writeInsights(insights);
    }

    /**
     * Update the OAuth2 tokens
     * @param {String} accessToken The access token
     * @param {String} refreshToken The refresh token
     * @memberof MyButtercupDatasource
     */
    updateTokens(accessToken, refreshToken, updateClientTokens = true) {
        const { data: credentialData } = getCredentials(this.credentials.id);
        credentialData.datasource.accessToken = accessToken;
        credentialData.datasource.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        if (updateClientTokens) {
            this._client._accessToken = accessToken;
            this._client._refreshToken = refreshToken;
        }
        this.emit("updated");
    }

    /**
     * Create a new MyButtercupClient instance and attach
     * event listeners
     * @protected
     * @memberof MyButtercupDatasource
     * @fires MyButtercupDatasource#updatedClient
     */
    _createNewClient() {
        if (this.client) {
            this.client.off("tokensUpdated", this._onTokensUpdated);
        }
        this._onTokensUpdated = () => {
            this.updateTokens(this.client.accessToken, this.client.refreshToken, false);
        };
        this._client = new MyButtercupClient(this._clientID, this._clientSecret, this.accessToken, this.refreshToken);
        this._client.on("tokensUpdated", this._onTokensUpdated);
        /**
         * On client updated
         * @event MyButtercupDatasource#updatedClient
         * @type {Object}
         */
        this.emit("updatedClient", this._client);
    }
}

registerDatasource("mybuttercup", MyButtercupDatasource);

module.exports = MyButtercupDatasource;
