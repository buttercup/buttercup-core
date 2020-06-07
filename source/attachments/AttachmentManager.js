const { v4: uuid } = require("uuid");

class AttachmentManager {
    static newAttachmentID() {
        return uuid();
    }

    constructor(vaultSource, credentials) {
        this._source = vaultSource;
        this._credentials = credentials;
    }

    async getAttachment(entry, attachmentID) {
        this._checkAttachmentSupport();
        const details = await this.getAttachmentDetails(entry, attachmentID);
        if (!details) {
            throw new Error(`Attachment not available: ${attachmentID}`);
        }
        return this._source._datasource.getAttachment(this._source.vault.id, attachmentID, this._credentials);
    }

    async getAttachmentDetails(entry, attachmentID) {
        this._checkAttachmentSupport();
        const Entry = require("../core/Entry.js");
        const attributeKey = `${Entry.Attributes.AttachmentPrefix}${attachmentID}`;
        const payloadRaw = entry.getAttribute(attributeKey);
        return payloadRaw ? JSON.parse(payloadRaw) : null;
    }

    async listAttachments(entry) {
        this._checkAttachmentSupport();
        const Entry = require("../core/Entry.js");
        const attributes = entry.getAttribute();
        const attachmentKeys = Object.keys(attributes).filter(
            key => key.indexOf(Entry.Attributes.AttachmentPrefix) === 0
        );
        return attachmentKeys.map(key => JSON.parse(attributes[key]));
    }

    async removeAttachment(entry, attachmentID) {
        this._checkAttachmentSupport();
        const Entry = require("../core/Entry.js");
        const attributeKey = `${Entry.Attributes.AttachmentPrefix}${attachmentID}`;
        // Remove data
        await this._source._datasource.removeAttachment(this._source.vault.id, attachmentID);
        // Remove in entry
        entry.deleteAttribute(attributeKey);
    }

    async setAttachment(entry, attachmentID, attachmentData, name, type, size) {
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
        const payload = {
            id: attachmentID,
            name,
            type,
            size
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
