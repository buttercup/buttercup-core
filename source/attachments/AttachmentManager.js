const { v4: uuid } = require("uuid");
const Credentials = require("../credentials/Credentials.js");
const { credentialsAllowsPurpose } = require("../credentials/channel.js");

/**
 * @typedef {Object} AttachmentDetails
 * @property {String} id The attachment ID
 * @property {String} name The name of the file
 * @property {String} type The MIME type
 * @property {Number} size The size of the file, before encryption
 */

/**
 * Attachment manager
 * @memberof module:Buttercup
 */
class AttachmentManager {
    /**
     * Get a new attachment ID
     * @returns {String}
     * @static
     * @memberof AttachmentManager
     */
    static newAttachmentID() {
        return uuid();
    }

    /**
     * Constructor for new attachment managers
     * @param {VaultSource} vaultSource The vault source to attach to. This is
     *  normally set by the VaultSource automatically when unlocking a source.
     * @param {Credentials} credentials The credentials to use for encrypting
     *  and decrypting attachments.
     */
    constructor(vaultSource, credentials) {
        this._source = vaultSource;
        this._credentials = credentials;
        if (!credentialsAllowsPurpose(this._credentials.id, Credentials.PURPOSE_ATTACHMENTS)) {
            throw new Error("Credentials do not allow for attachments handling");
        }
        this._credentials.restrictPurposes([Credentials.PURPOSE_ATTACHMENTS]);
    }

    /**
     * Get an attachment's data
     * @param {Entry} entry Entry instance the attachment can be found on
     * @param {String} attachmentID The attachment ID
     * @returns {Promise.<Buffer|ArrayBuffer>}
     * @throws {Error} Throws if the attachment isn't found
     * @memberof AttachmentManager
     */
    async getAttachment(entry, attachmentID) {
        this._checkAttachmentSupport();
        const details = await this.getAttachmentDetails(entry, attachmentID);
        if (!details) {
            throw new Error(`Attachment not available: ${attachmentID}`);
        }
        return this._source._datasource.getAttachment(this._source.vault.id, attachmentID, this._credentials);
    }

    /**
     * Get an attachment's details
     * @param {Entry} entry Entry instance the attachment can be found on
     * @param {String} attachmentID The attachment ID
     * @returns {Promise.<AttachmentDetails|null>} The details or null if
     *  the attachment isn't found
     * @memberof AttachmentManager
     */
    async getAttachmentDetails(entry, attachmentID) {
        this._checkAttachmentSupport();
        const Entry = require("../core/Entry.js");
        const attributeKey = `${Entry.Attributes.AttachmentPrefix}${attachmentID}`;
        const payloadRaw = entry.getAttribute(attributeKey);
        return payloadRaw ? JSON.parse(payloadRaw) : null;
    }

    /**
     * List all attachments
     * @param {Entry} entry Entry instance the attachment can be found on
     * @returns {Promise.<AttachmentDetails[]>}
     * @memberof AttachmentManager
     */
    async listAttachments(entry) {
        this._checkAttachmentSupport();
        const Entry = require("../core/Entry.js");
        const attributes = entry.getAttribute();
        const attachmentKeys = Object.keys(attributes).filter(
            key => key.indexOf(Entry.Attributes.AttachmentPrefix) === 0
        );
        return attachmentKeys.map(key => JSON.parse(attributes[key]));
    }

    /**
     * Remove an attachment, deleting the file and removing it from
     *  the entry
     * @param {Entry} entry Entry instance the attachment can be found on
     * @param {String} attachmentID The attachment ID
     * @returns {Promise}
     * @memberof AttachmentManager
     */
    async removeAttachment(entry, attachmentID) {
        this._checkAttachmentSupport();
        const Entry = require("../core/Entry.js");
        const attributeKey = `${Entry.Attributes.AttachmentPrefix}${attachmentID}`;
        // Remove data
        await this._source._datasource.removeAttachment(this._source.vault.id, attachmentID);
        // Remove in entry
        entry.deleteAttribute(attributeKey);
    }

    /**
     * Write an attachment to an entry.
     * Creates a new attachment or updates an existing one, by attachment ID
     * @param {Entry} entry Entry instance the attachment can be found on
     * @param {String} attachmentID The attachment ID
     * @param {Buffer|ArrayBuffer} attachmentData The attachment's data
     * @param {String} name The file name
     * @param {String} type The MIME type
     * @param {Number} size The byte size of the attachment, before encryption
     * @param {Date=} timestamp Optional timestamp override for the creation of
     *  the attachment
     * @returns {Promise}
     * @memberof AttachmentManager
     */
    async setAttachment(entry, attachmentID, attachmentData, name, type, size, timestamp = new Date()) {
        this._checkAttachmentSupport();
        if (!name || !type || !size) {
            throw new Error(`Attachment properties required: name/type/size => ${name}/${type}/${size}`);
        }
        const Entry = require("../core/Entry.js");
        const attributeKey = `${Entry.Attributes.AttachmentPrefix}${attachmentID}`;
        // Check if it already exists
        const existingDetails = await this.getAttachmentDetails(entry, attachmentID);
        // Calculate if it can fit in storage
        const sizeIncrease = existingDetails ? Math.max(0, size - existingDetails.size) : size;
        const spaceAvailable = await this._source._datasource.getAvailableStorage();
        if (spaceAvailable !== null && sizeIncrease > spaceAvailable) {
            throw new Error(
                `Not enough space to update attachment: needed = ${sizeIncrease} B, available = ${spaceAvailable} B`
            );
        }
        // Create payload
        const now = timestamp.toUTCString();
        const payload = {
            id: attachmentID,
            name,
            type,
            size,
            created: now,
            updated: now
        };
        // Write attachment
        await this._source._datasource.putAttachment(
            this._source.vault.id,
            attachmentID,
            attachmentData,
            this._credentials
        );
        // Set in entry
        entry.setAttribute(attributeKey, JSON.stringify(payload));
    }

    _checkAttachmentSupport() {
        if (!this._source.supportsAttachments()) {
            throw new Error(`Attachments not supported on source: ${this._source.id}`);
        }
    }
}

module.exports = AttachmentManager;
