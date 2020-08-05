import VError from "verror";
import { request } from "cowl";
import EventEmitter from "eventemitter3";
import { Base64 } from "js-base64";
import NodeFormData from "form-data";
import {
    API_ATTACHMENT,
    API_INSIGHTS,
    API_ORG_USERS,
    API_OWN_ARCHIVE,
    API_OWN_ARCHIVE_DETAILS,
    API_OWN_DIGEST,
    API_OWN_PASS_CHANGE,
    API_OWN_PASS_CHANGE_VERIFY,
    API_SHARES,
    OAUTH_AUTHORISE_URI,
    OAUTH_REDIRECT_URI,
    OAUTH_TOKEN_URI
} from "./symbols";
import { detectFormat } from "../io/formatRouter";
import { isTypedArray } from "../tools/buffer";
import {
    CowlError,
    MyButtercupAttachment,
    MyButtercupAttachmentDetails,
    MyButtercupDigest,
    MyButtercupEncryptedShare,
    MyButtercupUsersListItem,
    MyButtercupVaultDetails,
    VaultInsights
} from "../types";

declare const BUTTERCUP_WEB: boolean;

export interface MyButtercupFetchedShares {
    [shareID: string]: MyButtercupEncryptedShare;
}

const DIGEST_MAX_AGE = 10000;

function demultiplexShares(sharesTxt: string): any {
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
 * @memberof module:Buttercup
 */
export default class MyButtercupClient extends EventEmitter {
    /**
     * Exchange an auth code for tokens
     * @param authCode OAuth2 auth code, retrieved from browser-
     *  based OAuth2 flow using a user's username and password
     * @param clientID The OAuth2 client ID
     * @param clientSecret The OAuth2 client secret
     * @param redirectURI The OAuth2 client redirect URI
     * @memberof MyButtercupClient
     * @static
     */
    static exchangeAuthCodeForTokens(authCode: string, clientID: string, clientSecret: string, redirectURI: string): Promise<{ accessToken: string, refreshToken: string }> {
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
     * @param clientID The OAuth2 client ID registered on
     *  my.buttercup.pw
     * @returns The generated URL
     * @memberof MyButtercupClient
     * @static
     */
    static generateAuthorisationURL(clientID: string): string {
        const redir = encodeURIComponent(OAUTH_REDIRECT_URI);
        return `${OAUTH_AUTHORISE_URI}?response_type=code&client_id=${clientID}&redirect_uri=${redir}`;
    }

    _accessToken: string;
    _clientID: string;
    _clientSecret: string;
    _lastDigest: MyButtercupDigest;
    _lastDigestTime: number;
    _refreshToken: string;
    request: any;

    /**
     * Create a new client instance
     * @param clientID The client identifier
     * @param clientSecret The client secret
     * @param accessToken Access token
     * @param refreshToken Refresh token
     */
    constructor(clientID: string, clientSecret: string, accessToken: string, refreshToken: string) {
        super();
        this._accessToken = accessToken;
        this._refreshToken = refreshToken;
        this._lastDigest = null;
        this._lastDigestTime = null;
        this._clientID = clientID;
        this._clientSecret = clientSecret;
        this.request = request;
    }

    /**
     * The current access token
     * @readonly
     */
    get accessToken(): string {
        return this._accessToken;
    }

    /**
     * The last client digest response
     * @readonly
     */
    get digest(): MyButtercupDigest {
        return this._lastDigest;
    }

    /**
     * The refresh token
     * @readonly
     */
    get refreshToken(): string {
        return this._refreshToken;
    }

    async changePassword(password: string, passwordToken: string): Promise<void> {
        const requestOptions = {
            url: API_OWN_PASS_CHANGE,
            method: "PUT",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                passwordToken
            })
        };
        return this.request(requestOptions)
            .then(resp => {
                const { data } = resp;
                if (data.status !== "ok") {
                    throw new Error("Invalid password change status");
                }
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.changePassword(password, passwordToken)))
            .catch(err => {
                throw new VError(err, "Failed changing password");
            });
    }

    deleteAttachment(attachmentID: string): Promise<void> {
        const requestOptions = {
            url: API_ATTACHMENT.replace("[ATTACHMENT_ID]", attachmentID),
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };
        return this.request(requestOptions)
            .then(resp => {
                const { data } = resp;
                if (data.status !== "ok") {
                    throw new Error("Invalid delete-attachment response");
                }
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.deleteAttachment(attachmentID)))
            .catch(err => {
                throw new VError(err, "Failed deleting attachment");
            });
    }

    fetchAttachment(attachmentID: string): Promise<MyButtercupAttachment> {
        const requestOptions = {
            url: API_ATTACHMENT.replace("[ATTACHMENT_ID]", attachmentID),
            method: "GET",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            },
            responseType: "buffer"
        };
        return this.request(requestOptions)
            .then(resp => {
                const { headers, data } = resp;
                const { "x-mb-att-name": name, "x-mb-att-size": sizeRaw, "x-mb-att-type": type } = headers;
                const size = parseInt(sizeRaw, 10);
                return {
                    name,
                    size,
                    type,
                    data: isTypedArray(data) ? data.buffer : data
                };
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.fetchAttachment(attachmentID)))
            .catch(err => {
                throw new VError(err, "Failed fetching attachment");
            });
    }

    fetchAttachmentDetails(attachmentID: string): Promise<MyButtercupAttachmentDetails> {
        const requestOptions = {
            url: API_ATTACHMENT.replace("[ATTACHMENT_ID]", attachmentID),
            method: "HEAD",
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };
        return this.request(requestOptions)
            .then(resp => {
                const {
                    headers: { "x-mb-att-name": name, "x-mb-att-size": sizeRaw, "x-mb-att-type": type }
                } = resp;
                const size = parseInt(sizeRaw, 10);
                return {
                    name,
                    size,
                    type
                };
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.fetchAttachmentDetails(attachmentID)))
            .catch(err => {
                throw new VError(err, "Failed fetching attachment details");
            });
    }

    /**
     * Fetch user shares
     * @param ids Share IDs
     * @memberof MyButtercupClient
     */
    fetchShares(ids: Array<string>): Promise<MyButtercupFetchedShares> {
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
     * @returns The user's vault contents
     * @memberof MyButtercupClient
     */
    fetchUserVault(): Promise<{ archive: string, updateID: number }> {
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
     * @returns The details of the vault
     * @memberof MyButtercupClient
     */
    fetchUserVaultDetails(): Promise<MyButtercupVaultDetails> {
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
     * @returns Digest information
     * @memberof MyButtercupClient
     */
    retrieveDigest(): Promise<MyButtercupDigest> {
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
                this._lastDigestTime = Date.now();
                return digest;
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.retrieveDigest()))
            .catch(err => {
                throw new VError(err, "Failed retrieving digest information");
            });
    }

    /**
     * Get the list of users available to address for the user
     * @memberof MyButtercupClient
     */
    async retrieveUsersList(): Promise<Array<MyButtercupUsersListItem>> {
        await this.updateDigestIfRequired();
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
     * @param orgID The ID of the organisation
     * @memberof MyButtercupClient
     */
    retrieveUsersListForOrganisation(orgID: number): Promise<Array<MyButtercupUsersListItem>> {
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
     * Test if a password token is valid
     * @param passwordToken The password change token
     * @memberof MyButtercupClient
     */
    async testPasswordChange(passwordToken: string): Promise<void> {
        const requestOptions = {
            url: API_OWN_PASS_CHANGE_VERIFY,
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                passwordToken
            })
        };
        return this.request(requestOptions)
            .then(resp => {
                const { data } = resp;
                if (data.status !== "ok") {
                    throw new Error("Password change not possible: Potentially invalid account state or token");
                }
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.testPasswordChange(passwordToken)))
            .catch(err => {
                throw new VError(err, "Failed checking password-change availability");
            });
    }

    /**
     * Update the digest if required
     * @memberof MyButtercupClient
     */
    async updateDigestIfRequired() {
        if (!this._lastDigest || Date.now() - this._lastDigestTime >= DIGEST_MAX_AGE) {
            await this.retrieveDigest();
        }
    }

    /**
     * Upload an attachment
     * @param id The attachment ID
     * @param name The attachment name
     * @param type The attachment MIME type
     * @param data Encrypted attachment data
     */
    async uploadAttachment(id: string, name: string, type: string, data: Buffer | ArrayBuffer) {
        const headers = {
            "Content-Disposition": `form-data; name="attachment"; filename=${JSON.stringify(name)}`,
            Authorization: `Bearer ${this.accessToken}`
        };
        const isWeb = typeof BUTTERCUP_WEB === "boolean" && BUTTERCUP_WEB === true;
        let form: FormData | NodeFormData;
        if (isWeb) {
            // Use the native FormData
            form = new FormData();
            form.append("attachment", new Blob([data]), name);
            // No Content-Type is set on web as the browser will automatically assign
            // a value of "multipart/form-data; boundary=----WebKitFormBoundary..."
            // when a FormData instance is seen.
        } else {
            // Use the Node-based FormData package
            form = new NodeFormData();
            form.append("attachment", data, {
                filename: name
            });
            Object.assign(headers, form.getHeaders());
        }
        form.append("name", name);
        form.append("type", type);
        const requestOptions = {
            url: API_ATTACHMENT.replace("[ATTACHMENT_ID]", id),
            method: "POST",
            headers,
            body: isWeb ? form : (<NodeFormData>form).getBuffer()
        };
        return this.request(requestOptions)
            .then(resp => {
                const { data } = resp;
                if (data.status !== "ok") {
                    throw new Error("Server rejected attachment upload");
                }
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.uploadAttachment(id, name, type, data)))
            .catch(err => {
                throw new VError(err, "Failed uploading attachment");
            });
    }

    /**
     * Write insights to the remote account
     * @param insights The insights data
     * @memberof MyButtercupClient
     */
    async writeInsights(insights: VaultInsights): Promise<void> {
        await this.updateDigestIfRequired();
        const {
            avgPassLen = null,
            duplicatePasswords = null,
            entries = null,
            groups = null,
            longPassLen = null,
            shortPassLen = null,
            trashEntries = null,
            trashGroups = null,
            usernames = null,
            weakPasswords = null
        } = insights;
        const requestOptions = {
            url: API_INSIGHTS,
            method: "PUT",
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                insights: {
                    avgPassLen,
                    duplicatePasswords,
                    entries,
                    groups,
                    longPassLen,
                    shortPassLen,
                    trashEntries,
                    trashGroups,
                    usernames,
                    weakPasswords
                },
                vaultID: this.digest.archive_id
            })
        };
        return this.request(requestOptions)
            .then(resp => {
                const { data: payload } = resp;
                if (payload.status !== "ok") {
                    throw new Error("Invalid insights update response");
                }
            })
            .catch(err => this._handleRequestFailure(err).then(() => this.writeInsights(insights)))
            .catch(err => {
                throw new VError(err, "Failed updating vault/account insights");
            });
    }

    /**
     * Write the user vault contents back to the server
     * @param contents Encrypted vault contents
     * @param previousUpdateID The previous update ID received from the server
     * @param newUpdateID The new update ID to set after a successful write
     * @returns A promise that resolves once the write has been completed
     * @memberof MyButtercupClient
     */
    async writeUserArchive(contents: string, previousUpdateID: number, newUpdateID: number): Promise<void> {
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
                throw new VError(err, "Failed uploading vault contents");
            });
    }

    /**
     * Handle a request failure (processes token expiration etc.)
     * @param err The received error from making a request
     * @throws {Error} Throws if the error was not catchable
     * @returns Returns a promise if an action can be taken
     *  to remedy the situation
     * @memberof MyButtercupClient
     * @protected
     */
    async _handleRequestFailure(err: CowlError) {
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
     * @fires MyButtercupClient#tokensUpdated
     */
    _performTokenRefresh(): Promise<void> {
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
