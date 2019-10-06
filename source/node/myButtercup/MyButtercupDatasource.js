const VError = require("verror");
const { TextDatasource, registerDatasource } = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");
const { calculateHistoryDifferences } = require("../tools/compare.js");
const MyButtercupClient = require("./MyButtercupClient.js");
const { generateNewUpdateID } = require("./update.js");

class MyButtercupDatasource extends TextDatasource {
    constructor(remoteVaultID, clientID, clientSecret, accessToken, refreshToken) {
        super();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this._clientID = clientID;
        this._clientSecret = clientSecret;
        this._client = null;
        this._vaultID = remoteVaultID;
        this._updateID = null;
        this._createNewClient();
    }

    get client() {
        return this._client;
    }

    load(credentials) {
        return this._client
            .fetchUserArchive()
            .then(({ archive, updateID }) => {
                this._updateID = updateID;
                this.setContent(archive);
            })
            .catch(err => {
                throw new VError(err, "Failed retrieving vault contents");
            })
            .then(() => super.load(credentials));
    }

    localDiffersFromRemote(masterCredentials, archiveHistory) {
        return this.client
            .fetchUserArchiveDetails()
            .then(({ updateID }) => {
                if (updateID !== this._updateID) {
                    return true;
                }
                this.setContent("");
                return this.load(masterCredentials).then(incomingHistory => {
                    const diffs = calculateHistoryDifferences(archiveHistory, incomingHistory);
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
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     * @memberof MyButtercupDatasource
     */
    toObject() {
        return {
            type: "mybuttercup",
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            clientID: this._clientID,
            clientSecret: this._clientSecret,
            vaultID: this._vaultID
        };
    }

    /**
     * Update the OAuth2 tokens
     * @param {String} accessToken The access token
     * @param {String} refreshToken The refresh token
     * @memberof MyButtercupDatasource
     */
    updateTokens(accessToken, refreshToken, updateClientTokens = true) {
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

MyButtercupDatasource.fromObject = obj => {
    return new MyButtercupDatasource(obj.vaultID, obj.clientID, obj.clientSecret, obj.accessToken, obj.refreshToken);
};

MyButtercupDatasource.fromString = str => {
    return MyButtercupDatasource.fromObject(JSON.parse(str));
};

registerDatasource("mybuttercup", MyButtercupDatasource);

module.exports = MyButtercupDatasource;
