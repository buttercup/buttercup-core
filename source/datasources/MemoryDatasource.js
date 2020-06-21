const TextDatasource = require("./TextDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./register.js");
const { getCredentials } = require("../credentials/channel.js");
const { ATTACHMENT_EXT, decryptAttachment, encryptAttachment } = require("../tools/attachments.js");

const TYPE = "memory";

/**
 * Memory datasource for temporary storage
 * @augments TextDatasource
 * @memberof module:Buttercup
 */
class MemoryDatasource extends TextDatasource {
    /**
     * Constructor for the datasource
     * @param {Credentials} credentials The credentials instance with which to
     *  use to configure the datasource
     */
    constructor(credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig } = credentialData;
        const { property } = datasourceConfig;
        this._property = property;
        this._store = global[property] = global[property] || {};
        this.type = TYPE;
        fireInstantiationHandlers(TYPE, this);
    }

    /**
     * Ensure attachment paths exist
     * @returns {Promise}
     * @memberof MemoryDatasource
     * @protected
     */
    _ensureAttachmentsPaths(vaultID) {
        return Promise.resolve().then(() => {
            this._store.attachments = this._store.attachments || {};
            this._store.attachments[vaultID] = this._store.attachments[vaultID] || {};
        });
    }

    /**
     * Get attachment buffer
     * - Loads the attachment contents into a buffer
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @param {Credentials=} credentials Credentials to decrypt
     *  the buffer, defaults to null (no decryption)
     * @returns {Promise.<Buffer|ArrayBuffer>}
     * @memberof MemoryDatasource
     */
    getAttachment(vaultID, attachmentID, credentials = null) {
        return this._ensureAttachmentsPaths(vaultID).then(() => {
            if (!this._store.attachments[vaultID][attachmentID]) {
                throw new Error(`No attachment found for ID: ${attachmentID}`);
            }
            const attachment = this._store.attachments[vaultID][attachmentID];
            return credentials ? decryptAttachment(attachment, credentials) : attachment;
        });
    }

    /**
     * Get attachment details
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @returns {AttachmentDetails} The attachment details
     * @memberof MemoryDatasource
     */
    getAttachmentDetails(vaultID, attachmentID) {
        const attachment = this._store.attachments[vaultID][attachmentID];
        const filename = `${attachmentID}.${ATTACHMENT_EXT}`;
        const filePath = `${this._property}/${filename}`;
        return Promise.resolve({
            id: attachmentID,
            vaultID,
            name: filename,
            filename: filePath,
            size: typeof attachment.byteLength === "number" ? attachment.byteLength : attachment.length,
            mime: null
        });
    }

    /**
     * Load from a global property
     * @param {Credentials} credentials The credentials for decryption
     * @returns {Promise.<LoadedVaultData>} A promise resolving with vault history
     * @memberof MemoryDatasource
     */
    load(credentials) {
        return Promise.resolve().then(() => {
            if (!this._store.vault) {
                throw new Error("No vault in memory");
            }
            this.setContent(this._store.vault);
            return super.load(credentials);
        });
    }

    /**
     * Put attachment data
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @param {Buffer|ArrayBuffer} buffer The attachment data
     * @param {Credentials=} credentials Credentials for
     *  encrypting the buffer. If not provided, the buffer
     *  is presumed to be in encrypted-form and will be
     *  written as-is.
     * @returns {Promise}
     * @memberof MemoryDatasource
     */
    putAttachment(vaultID, attachmentID, buffer, credentials = null) {
        return this._ensureAttachmentsPaths(vaultID)
            .then(() => (credentials ? encryptAttachment(buffer, credentials) : buffer))
            .then(data => {
                this._store.attachments[vaultID][attachmentID] = data;
            });
    }

    /**
     * Remove an attachment
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @returns {Promise}
     * @memberof MemoryDatasource
     */
    removeAttachment(vaultID, attachmentID) {
        return this._ensureAttachmentsPaths(vaultID).then(() => {
            this._store.attachments[vaultID][attachmentID] = null;
            delete this._store.attachments[vaultID][attachmentID];
        });
    }

    /**
     * Save vault history memory
     * @param {Array.<String>} history The vault history to save
     * @param {Credentials} credentials The credentials to save with
     * @returns {Promise} A promise that resolves when saving is complete
     * @memberof MemoryDatasource
     */
    save(history, credentials) {
        return super.save(history, credentials).then(encrypted => {
            this._store.vault = encrypted;
        });
    }

    /**
     * Whether or not the datasource supports attachments
     * @returns {Boolean}
     * @memberof MemoryDatasource
     */
    supportsAttachments() {
        return true;
    }
}

registerDatasource(TYPE, MemoryDatasource);

module.exports = MemoryDatasource;
