const VError = require("verror");
const { request } = require("cowl");
const EventEmitter = require("eventemitter3");
const { Base64 } = require("js-base64");
const {
    API_ORG_USERS,
    API_OWN_ARCHIVE,
    API_OWN_ARCHIVE_DETAILS,
    API_OWN_DIGEST,
    API_SHARES,
    OAUTH_AUTHORISE_URI,
    OAUTH_REDIRECT_URI,
    OAUTH_TOKEN_URI
} = require("./symbols.js");
const { detectFormat } = require("../io/formatRouter.js");

/**
 * @typedef {Object} MyButtercupShareBase
 * @property {String} id The share ID
 * @property {String} title The share title
 * @property {Boolean} perm_read Permission to read
 * @property {Boolean} perm_write Permission to write changes
 * @property {Boolean} perm_manage Permission to share with others, remove share access etc.
 */

/**
 * @typedef {MyButtercupShareBase} MyButtercupIncomingShare
 * @property {String} share_password_enc Encrypted password for the share
 * @property {Number} sharing_user_id The user that shared the item
 * @property {String} sharing_user_key The public key of the user for the share (used
 *  for decrypting the share password)
 */

/**
 * @typedef {MyButtercupShareBase} MyButtercupEncryptedShare
 * @property {String} content Encrypted share content
 */

/**
 * @typedef {Object} MyButtercupOrganisation
 * @property {Number} id The organisation's ID
 * @property {String} name The organisation name
 * @property {String} created The creation date
 */

/**
 * @typedef {Object} MyButtercupDigest
 * @property {Number} archive_id The ID of the user's archive
 * @property {String} public_key The RSA public key for the user
 * @property {Array.<Object>} messages System messages for the user (internal processing)
 * @property {Array.<MyButtercupIncomingShare>} new_shares An array of new shares to process
 * @property {Array.<MyButtercupOrganisation>} organisations An array of user organisations
 */

/**
 * @typedef {Object} MyButtercupUsersListItem
 * @property {Number} user_id The ID of the user
 * @property {Number} organisation_id The organisation ID the user was found in
 * @property {String} name The name of the user
 * @property {String} public_key The public key for the user
 */

/**
 * @typedef {Object} MyButtercupTokenResult
 * @property {String} accessToken An OAuth2 access token for API requests
 * @property {String} refreshToken An OAuth2 refresh token
 */

/**
 * @typedef {Object} MyButtercupArchiveDetails
 * @property {Number} id The remote vault ID
 * @property {Number} updateID The current update ID for the vault
 * @property {String} created The creation date
 * @property {String} lastUpdate The last update date
 */

function demultiplexShares(sharesTxt) {
    const shares = {};
    const lines = sharesTxt.split("\n");
    while (lines.length > 0) {
        const propLine = lines.shift();
        if (!/^\<--\(/.test(propLine)) {
            continue;
        }
        let payload;
        try {
            payload = JSON.parse(propLine.replace(/^\<--\(/, "").replace(/\)--\>$/, ""));
        } catch (err) {
            throw new VError(err, "Invalid share metadata");
        }
        if (!payload.id) {
            throw new Error(`Multiplexed share definition invalid:\n\t${propLine}`);
        }
        shares[payload.id] = Object.assign(payload, {
            contents: lines.shift()
        });
    }
    return shares;
}

/**
 * My Buttercup client
 * @augments EventEmitter
 */
class MyButtercupClient extends EventEmitter {
    /**
     * Exchange an auth code for tokens
     * @param {String} authCode OAuth2 auth code, retrieved from browser-
     *  based OAuth2 flow using a user's username and password
     * @param {String} clientID The OAuth2 client ID
     * @param {String} clientSecret The OAuth2 client secret
     * @param {String} redirectURI The OAuth2 client redirect URI
     * @returns {MyButtercupTokenResult}
     * @memberof MyButtercupClient
     * @static
     */
    static exchangeAuthCodeForTokens(authCode, clientID, clientSecret, redirectURI) {
        const baseAuth = Base64.encode(`${clientID}:${clientSecret}`);
        const encodedRedir = encodeURIComponent(redirectURI);
        const requestOptions = {
            url: OAUTH_TOKEN_URI,
            method: "POST",
            headers: {
                Authorization: `Basic ${baseAuth}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${encodedRedir}`
        };
        return request(requestOptions)
            .then(resp => {
                const {
                    data: { access_token: accessToken, refresh_token: refreshToken, token_type: tokenType }
                } = resp;
                if (!/^[Bb]earer$/.test(tokenType)) {
                    throw new Error(`Invalid token type: ${tokenType}`);
                } else if (!accessToken || !refreshToken) {
                    throw new Error("Not all expected tokens were returned by the server");
                }
                return { accessToken, refreshToken };
            })
            .catch(err => {
                throw new VError(err, "Failed exchanging auth code for tokens");
            });
    }

    /**
     * Generate an OAuth2 authorisation URL using the client ID of the current
     * application platform (eg. Buttercup browser extension)
     * @param {String} clientID The OAuth2 client ID registered on
     *  my.buttercup.pw
     * @returns {String} The generated URL
     * @memberof MyButtercupClient
     * @static
     */
    static generateAuthorisationURL(clientID) {
        const redir = encodeURIComponent(OAUTH_REDIRECT_URI);
        return `${OAUTH_AUTHORISE_URI}?response_type=code&client_id=${clientID}&redirect_uri=${redir}`;
    }

    /**
     * Create a new client instance
     * @param {String} clientID The client identifier
     * @param {String} clientSecret The client secret
     * @param {String} accessToken Access token
     * @param {String} refreshToken Refresh token
     */
    constructor(clientID, clientSecret, accessToken, refreshToken) {
        super();
        this._accessToken = accessToken;
        this._refreshToken = refreshToken;
        this._lastDigest = null;
        this._clientID = clientID;
        this._clientSecret = clientSecret;
        this.request = request;
    }

    /**
     * The current access token
     * @type {String}
     * @readonly
     */
    get accessToken() {
        return this._accessToken;
    }

    /**
     * The last client digest response
     * @type {MyButtercupDigest|null}
     * @readonly
     */
    get digest() {
        return this._lastDigest;
    }

    /**
     * The refresh token
     * @type {String}
     * @readonly
     */
    get refreshToken() {
        return this._refreshToken;
    }

    /**
     * Fetch user shares
     * @param {String[]} ids Share IDs
     * @returns {Promise.<Object.<String, MyButtercupEncryptedShare>>}
     * @memberof MyButtercupClient
     */
    fetchShares(ids) {
        if (ids.length <= 0) {
            return Promise.resolve({});
        }
        const requestOptions = {
            url: `${API_SHARES}?ids=${ids.join(",")}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            },
            responseType: "text"
        };
        return this.request(requestOptions)
            .then(resp => demultiplexShares(resp.data))
            .catch(err => this._handleRequestFailure(err).then(() => this.fetchShares(ids)))
            .catch(err => {
                throw new VError(err, "Failed retrieving shares");
            });
    }

    /**
     * Fetch user vault contents
     * @returns {Promise.<{ archive: String, updateID: Number}>} The user's
     *  vault contents
     * @memberof MyButtercupClient
     */
    fetchUserVault() {
        const requestOptions = {
            url: API_OWN_ARCHIVE,
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            },
            responseType: "text"
        };
        return this.request(requestOptions)
            .then(resp => {
                // Archive requests contain the archive contents in the
                // body as text - update ID is contained within the headers
                const { data: archive, headers } = resp;
                const updateID = parseInt(headers["x-mb-updateid"], 10);
                if (!updateID) {
                    throw new Error("Invalid vault response: Invalid update ID header");
                }
                return {
                    archive,
                    updateID
                };
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.fetchUserVault()))
            .catch(err => {
                throw new VError(err, "Could not retrieve vault");
            });
    }

    /**
     * Fetch the user's vault details
     * @returns {Promise.<MyButtercupArchiveDetails>} The details of the vault
     * @memberof MyButtercupClient
     */
    fetchUserVaultDetails() {
        const requestOptions = {
            url: API_OWN_ARCHIVE_DETAILS,
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };
        return this.request(requestOptions)
            .then(resp => {
                const {
                    data: {
                        details: { id, updateID, created, lastUpdate }
                    }
                } = resp;
                return {
                    id,
                    updateID,
                    created,
                    lastUpdate
                };
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.fetchUserVaultDetails()))
            .catch(err => {
                throw new VError(err, "Could not retrieve vault details");
            });
    }

    /**
     * Fetch and set account digest information
     * @returns {Promise.<MyButtercupDigest>} Digest information
     * @memberof MyButtercupClient
     */
    retrieveDigest() {
        const requestOptions = {
            url: API_OWN_DIGEST,
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };
        return this.request(requestOptions)
            .then(resp => {
                const { data: digest } = resp;
                if (digest.status !== "ok") {
                    throw new Error("Invalid digest response");
                }
                this._lastDigest = digest;
                return digest;
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.retrieveDigest()))
            .catch(err => {
                throw new VError(err, "Failed retrieving digest information");
            });
    }

    /**
     * Get the list of users available to address for the user
     * @returns {Promise.<MyButtercupUsersListItem[]>}
     * @memberof MyButtercupClient
     */
    async retrieveUsersList() {
        if (!this.digest) {
            await this.retrieveDigest();
        }
        const orgIDs = this.digest.organisations.map(org => org.id);
        if (orgIDs.length <= 0) {
            return [];
        }
        return Promise.all(orgIDs.map(orgID => this.retrieveUsersListForOrganisation(orgID)))
            .then(results => results.reduce((output, users) => [...output, ...users], []))
            .catch(err => {
                throw new VError(err, "Failed retrieving users list");
            });
    }

    /**
     * Get the list of users for an organisation
     * (User must be present in organisation, or this method will fail)
     * @param {Number} orgID The ID of the organisation
     * @returns {Promise.<MyButtercupUsersListItem[]>}
     * @memberof MyButtercupClient
     */
    retrieveUsersListForOrganisation(orgID) {
        const requestOptions = {
            url: API_ORG_USERS.replace("[ORG_ID]", orgID),
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };
        return this.request(requestOptions)
            .then(resp => {
                const { data } = resp;
                if (data.status !== "ok" || !data.users) {
                    throw new Error("Invalid users list response");
                }
                return data.users;
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.retrieveUsersListForOrganisation(orgID)))
            .catch(err => {
                throw new VError(err, "Failed retrieving organisation users");
            });
    }

    /**
     * Write the user vault contents back to the server
     * @param {String} contents Encrypted vault contents
     * @param {Number} previousUpdateID The previous update ID received
     *  from the server
     * @param {Number} newUpdateID The new update ID to set after a
     *  successful write
     * @returns {Promise} A promise that resolves once the write has
     *  been completed
     * @memberof MyButtercupClient
     */
    async writeUserArchive(contents, previousUpdateID, newUpdateID) {
        const requestOptions = {
            url: API_OWN_ARCHIVE,
            method: "PUT",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                "Content-Type": "text/plain",
                "x-mb-updateid": `${previousUpdateID}`,
                "x-mb-newupdateid": `${newUpdateID}`
            },
            body: contents
        };
        // Test encrypted - throws if not
        const Format = detectFormat(contents);
        if (!Format || !Format.isEncrypted(contents)) {
            throw new Error("Vault contents not in expected encrypted form");
        }
        return this.request(requestOptions)
            .then(resp => {
                const { data: payload } = resp;
                if (payload.status !== "ok") {
                    throw new Error("Invalid vault update response: Changes may not have been saved");
                }
            })
            .catch(err =>
                this._handleRequestFailure(err).then(() =>
                    this.writeUserArchive(contents, previousUpdateID, newUpdateID)
                )
            )
            .catch(err => {
                throw new VError(err, "Failed uploading updated vault contents");
            });
    }

    /**
     * Handle a request failure (processes token expiration etc.)
     * @param {Error} err The received error from making a request
     * @throws {Error} Throws if the error was not catchable
     * @returns {Promise} Returns a promise if an action can be taken
     *  to remedy the situation
     * @memberof MyButtercupClient
     * @protected
     */
    async _handleRequestFailure(err) {
        if (err.responseHeaders && typeof err.responseHeaders === "object") {
            if (err.responseHeaders["x-mb-oauth"]) {
                switch (err.responseHeaders["x-mb-oauth"]) {
                    case "token_expired":
                        return this._performTokenRefresh();
                    default:
                        throw new VError(
                            {
                                cause: err,
                                info: {
                                    "x-mb-oauth": err.responseHeaders["x-mb-oauth"]
                                }
                            },
                            `Unrecognised authorisation failure type: ${err.responseHeaders["x-mb-oauth"]}`
                        );
                }
            }
        }
        throw err;
    }

    /**
     * Refresh tokens
     * @memberof MyButtercupClient
     * @protected
     * @returns {Promise}
     * @fires MyButtercupClient#tokensUpdated
     */
    _performTokenRefresh() {
        const baseAuth = Base64.encode(`${this._clientID}:${this._clientSecret}`);
        const requestOptions = {
            url: OAUTH_TOKEN_URI,
            method: "POST",
            headers: {
                Authorization: `Basic ${baseAuth}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=refresh_token&refresh_token=${this.refreshToken}`
        };
        return this.request(requestOptions)
            .then(resp => {
                const {
                    data: { access_token: accessToken, token_type: tokenType }
                } = resp;
                if (!/^[Bb]earer$/.test(tokenType)) {
                    throw new Error(`Invalid token type: ${tokenType}`);
                } else if (!accessToken) {
                    throw new Error("Access token was not returned by the server");
                }
                this._accessToken = accessToken;
                /**
                 * On tokens updated
                 * @event MyButtercupClient#tokensUpdated
                 */
                this.emit("tokensUpdated");
            })
            .catch(err => {
                throw new VError(err, "Failed exchanging refresh token for new access token");
            });
    }
}

module.exports = MyButtercupClient;
