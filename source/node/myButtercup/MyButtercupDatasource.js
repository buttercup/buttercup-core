const VError = require("verror");
const { TextDatasource, registerDatasource } = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");
const MyButtercupClient = require("./MyButtercupClient.js");
const { generateNewUpdateID } = require("./update.js");

class MyButtercupDatasource extends TextDatasource {
    constructor(accessToken, refreshToken) {
        super();
        this._accessToken = accessToken;
        this._refreshToken = refreshToken;
        this._client = new MyButtercupClient(accessToken, refreshToken);
        this._updateID = null;
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
        // @todo token renewal - maybe in client itself?
    }

    localDiffersFromRemote() {
        return this.client
            .fetchUserArchiveDetails()
            .then(({ updateID }) => updateID !== this._updateID)
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
                // @todo handle token renewal - maybe in client itself?
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
            accessToken: this._accessToken,
            refreshToken: this._refreshToken
        };
    }

    /**
     * Update the OAuth2 tokens
     * @param {String} accessToken The access token
     * @param {String} refreshToken The refresh token
     * @memberof MyButtercupDatasource
     */
    updateTokens(accessToken, refreshToken) {
        this._accessToken = accessToken;
        this._refreshToken = refreshToken;
        this._client = new MyButtercupClient(accessToken, refreshToken);
        this.emit("updated");
    }
}

MyButtercupDatasource.fromObject = obj => {
    if (obj.type === "mybuttercup") {
        return new MyButtercupDatasource(obj.accessToken, obj.refreshToken);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

MyButtercupDatasource.fromString = str => {
    return MyButtercupDatasource.fromObject(JSON.parse(str));
};

registerDatasource("mybuttercup", MyButtercupDatasource);

module.exports = MyButtercupDatasource;
