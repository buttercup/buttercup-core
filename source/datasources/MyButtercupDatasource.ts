import { Layerr } from "layerr";
import { fireInstantiationHandlers, registerDatasource } from "./register";
import TextDatasource from "./TextDatasource";
import Credentials from "../credentials/Credentials";
import MyButtercupClient from "../myButtercup/MyButtercupClient";
import { generateNewUpdateID } from "../myButtercup/update";
import { getCredentials } from "../credentials/channel";
import { BufferLike, DatasourceLoadedData, EncryptedContent, History, VaultID, VaultInsights } from "../types";

interface OnTokensUpdatedCallback {
    (): void
}

/**
 * My Buttercup datasource
 * @augments TextDatasource
 * @memberof module:Buttercup
 */
export default class MyButtercupDatasource extends TextDatasource {
    _client: MyButtercupClient;
    _clientID: string;
    _clientSecret: string;
    _onTokensUpdated: OnTokensUpdatedCallback;
    _updateID: number;
    _vaultID: number;
    accessToken: string;
    refreshToken: string;

    /**
     * Constructor for the datasource
     * @param credentials Credentials for the datasource
     * @memberof MyButtercupDatasource
     */
    constructor(credentials: Credentials) {
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
        this.type = "mybuttercup";
        fireInstantiationHandlers("mybuttercup", this);
    }

    /**
     * My Buttercup client
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
     * @param newCredentials
     * @param preflight
     * @returns A promise that resolves
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
     * @memberof MyButtercupDatasource
     */
    async changePassword(newCredentials: Credentials, preflight: boolean): Promise<boolean | undefined> {
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
     * Get attachment buffer
     * - Loads the attachment contents into a buffer
     * @param vaultID The ID of the vault
     * @param attachmentID The ID of the attachment
     * @returns The attachment data
     * @memberof MyButtercupDatasource
     */
    async getAttachment(vaultID: VaultID, attachmentID: string): Promise<BufferLike> {
        const { data } = await this.client.fetchAttachment(attachmentID);
        return data;
    }

    /**
     * Get the available storage space, in bytes
     * @returns {Number|null} Bytes of free space, or null if not
     *  available
     * @memberof MyButtercupDatasource
     */
    async getAvailableStorage() {
        await this.client.updateDigestIfRequired();
        const { storage_total: total, storage_used: used } = this.client.digest;
        return total - used;
    }

    /**
     * Get the total storage space, in bytes
     * @returns {Number|null} Bytes of free space, or null if not
     *  available
     * @memberof MyButtercupDatasource
     */
    async getTotalStorage() {
        await this.client.updateDigestIfRequired();
        return this.client.digest.storage_total;
    }

    /**
     * Load vault history from remote
     * @param credentials The archive credentials
     * @returns Promise which resolves with vault data
     * @memberof MyButtercupDatasource
     */
    load(credentials: Credentials): Promise<DatasourceLoadedData> {
        return this.client
            .fetchUserVault()
            .then(({ archive, updateID }) => {
                this._updateID = updateID;
                this.setContent(archive);
            })
            .catch(err => {
                throw new Layerr(err, "Failed retrieving vault contents");
            })
            .then(() => super.load(credentials));
    }

    /**
     * Override for history difference checking
     * @see VaultSource#localDiffersFromRemote
     * @param masterCredentials Master service credentials
     * @param archiveHistory Archive history lines
     * @returns True if differing, false otherwise
     * @memberof MyButtercupDatasource
     */
    localDiffersFromRemote(masterCredentials: Credentials, archiveHistory: History): Promise<boolean> {
        return this.client
            .fetchUserVaultDetails()
            .then(({ updateID }) => {
                if (updateID !== this._updateID) {
                    return true;
                }
                this.setContent("");
                return this.load(masterCredentials).then(({ Format, history: incomingHistory }) => {
                    if (incomingHistory.format !== Format.getFormatID()) {
                        throw new Error("Vault format mismatch");
                    }
                    return Format.historiesDiffer(archiveHistory, incomingHistory);
                });
            })
            .catch(err => {
                throw new Layerr(err, "Failed comparing remote/local vault status");
            });
    }

    /**
     * Put attachment data
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @param {Buffer|ArrayBuffer} buffer The attachment data
     * @param {Object} details
     * @returns {Promise}
     * @memberof MyButtercupDatasource
     */
    async putAttachment(vaultID, attachmentID, buffer, details) {
        const { name, type } = details;
        await this.client.uploadAttachment(attachmentID, name, type, buffer);
    }

    /**
     * Remove an attachment
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @returns {Promise}
     * @memberof MyButtercupDatasource
     */
    async removeAttachment(vaultID, attachmentID) {
        await this.client.deleteAttachment(attachmentID);
    }

    /**
     * Save vault contents to remote
     * @param history The vault history lines
     * @param credentials Vault credentials
     * @memberof MyButtercupDatasource
     */
    async save(history: History, credentials: Credentials): Promise<EncryptedContent> {
        const newUpdateID = generateNewUpdateID();
        const encryptedContents = await super.save(history, credentials);
        try {
            await this.client.writeUserArchive(encryptedContents, this._updateID, newUpdateID);
        } catch (err) {
            throw new Layerr(err, "Failed uploading new vault contents");
        }
        // Successful, set the new updateID
        this._updateID = newUpdateID;
        return encryptedContents;
    }

    /**
     * Whether or not the datasource supports attachments
     * @returns {Boolean}
     * @memberof MyButtercupDatasource
     */
    supportsAttachments() {
        return true;
    }

    /**
     * Whether or not the datasource supports the changing of the master password
     * @returns True if it supports changing the master password
     * @memberof MyButtercupDatasource
     */
    supportsPasswordChange(): boolean {
        return true;
    }

    /**
     * Update vault/account insights
     * @param insights Insights to update
     * @memberof MyButtercupDatasource
     */
    async updateInsights(insights: VaultInsights) {
        if (Object.keys(insights).length <= 0) return;
        await this._client.writeInsights(insights);
    }

    /**
     * Update the OAuth2 tokens
     * @param accessToken The access token
     * @param refreshToken The refresh token
     * @memberof MyButtercupDatasource
     */
    updateTokens(accessToken: string, refreshToken: string, updateClientTokens: boolean = true) {
        const { data: credentialData } = getCredentials(this.credentials.id);
        credentialData.datasource.accessToken = accessToken;
        credentialData.datasource.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        if (updateClientTokens) {
            this.client._accessToken = accessToken;
            this.client._refreshToken = refreshToken;
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
