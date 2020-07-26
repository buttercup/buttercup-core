import { v4 as uuid } from "uuid";
import Credentials from "../credentials/Credentials";
import { credentialsAllowsPurpose } from "../credentials/channel";
import VaultSource from "../core/VaultSource";
import Entry from "../core/Entry";

export interface AttachmentDetails {
    id: string;
    name: string;
    type: string;
    size: number;
}

/**
 * Attachment manager
 * @memberof module:Buttercup
 */
export default class AttachmentManager {
    /**
     * Get a new attachment ID
     * @static
     * @memberof AttachmentManager
     */
    static newAttachmentID(): string {
        return uuid();
    }

    _credentials: Credentials;
    _source: VaultSource;

    /**
     * Constructor for new attachment managers
     * @param vaultSource The vault source to attach to. This is
     *  normally set by the VaultSource automatically when unlocking a source.
     * @param credentials The credentials to use for encrypting
     *  and decrypting attachments.
     */
    constructor(vaultSource: VaultSource, credentials: Credentials) {
        this._source = vaultSource;
        this._credentials = credentials;
        if (!credentialsAllowsPurpose(this._credentials.id, Credentials.PURPOSE_ATTACHMENTS)) {
            throw new Error("Credentials do not allow for attachments handling");
        }
        this._credentials.restrictPurposes([Credentials.PURPOSE_ATTACHMENTS]);
    }

    /**
     * Get an attachment's data
     * @param entry Entry instance the attachment can be found on
     * @param attachmentID The attachment ID
     * @throws {Error} Throws if the attachment isn't found
     * @memberof AttachmentManager
     */
    async getAttachment(entry: Entry, attachmentID: string): Promise<Buffer | ArrayBuffer> {
        this._checkAttachmentSupport();
        const details = await this.getAttachmentDetails(entry, attachmentID);
        if (!details) {
            throw new Error(`Attachment not available: ${attachmentID}`);
        }
        return this._source._datasource.getAttachment(this._source.vault.id, attachmentID, this._credentials);
    }

    /**
     * Get an attachment's details
     * @param entry Entry instance the attachment can be found on
     * @param attachmentID The attachment ID
     * @returns The details or null if the attachment isn't found
     * @memberof AttachmentManager
     */
    async getAttachmentDetails(entry: Entry, attachmentID: string): Promise<AttachmentDetails> {
        this._checkAttachmentSupport();
        const attributeKey = `${Entry.Attributes.AttachmentPrefix}${attachmentID}`;
        const payloadRaw = entry.getAttribute(attributeKey) as string;
        return payloadRaw ? JSON.parse(payloadRaw) : null;
    }

    /**
     * List all attachments
     * @param entry Entry instance the attachment can be found on
     * @memberof AttachmentManager
     */
    async listAttachments(entry: Entry): Promise<Array<AttachmentDetails>> {
        this._checkAttachmentSupport();
        const attributes = entry.getAttribute();
        const attachmentKeys = Object.keys(attributes).filter(
            key => key.indexOf(Entry.Attributes.AttachmentPrefix) === 0
        );
        return attachmentKeys.map(key => JSON.parse(attributes[key]));
    }

    /**
     * Remove an attachment, deleting the file and removing it from
     *  the entry
     * @param entry Entry instance the attachment can be found on
     * @param attachmentID The attachment ID
     * @memberof AttachmentManager
     */
    async removeAttachment(entry: Entry, attachmentID: string) {
        this._checkAttachmentSupport();
        const attributeKey = `${Entry.Attributes.AttachmentPrefix}${attachmentID}`;
        // Remove data
        await this._source._datasource.removeAttachment(this._source.vault.id, attachmentID);
        // Remove in entry
        entry.deleteAttribute(attributeKey);
    }

    /**
     * Write an attachment to an entry.
     * Creates a new attachment or updates an existing one, by attachment ID
     * @param entry Entry instance the attachment can be found on
     * @param attachmentID The attachment ID
     * @param attachmentData The attachment's data
     * @param name The file name
     * @param type The MIME type
     * @param size The byte size of the attachment, before encryption
     * @param timestamp Optional timestamp override for the creation of the
     *  attachment
     * @memberof AttachmentManager
     */
    async setAttachment(entry: Entry, attachmentID: string, attachmentData: Buffer | ArrayBuffer, name: string, type: string, size: number, timestamp = new Date()) {
        this._checkAttachmentSupport();
        if (!name || !type || !size) {
            throw new Error(`Attachment properties required: name/type/size => ${name}/${type}/${size}`);
        }
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
