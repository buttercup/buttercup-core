const fs = require("fs");
const path = require("path");
const pify = require("pify");
const TextDatasource = require("./TextDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./register.js");
const { getCredentials } = require("../credentials/channel.js");
const { ATTACHMENT_EXT, decryptAttachment, encryptAttachment } = require("../tools/attachments.js");

/**
 * File datasource for loading and saving files
 * @augments TextDatasource
 * @memberof module:Buttercup
 */
class FileDatasource extends TextDatasource {
    /**
     * Constructor for the file datasource
     * @param {Credentials} credentials The credentials instance with which to
     *  use to configure the datasource
     */
    constructor(credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig } = credentialData;
        const { path } = datasourceConfig;
        this._filename = path;
        this.mkdir = pify(fs.mkdir);
        this.readFile = pify(fs.readFile);
        this.stat = pify(fs.stat);
        this.unlink = pify(fs.unlink);
        this.writeFile = pify(fs.writeFile);
        this.type = "file";
        fireInstantiationHandlers("file", this);
    }

    get baseDir() {
        return path.dirname(this.path);
    }

    /**
     * The file path
     * @type {String}
     * @memberof FileDatasource
     */
    get path() {
        return this._filename;
    }

    /**
     * Ensure attachment paths exist
     * @returns {Promise}
     * @memberof FileDatasource
     * @protected
     */
    async _ensureAttachmentsPaths(vaultID) {
        const attachmentsDir = path.join(this.baseDir, ".buttercup", vaultID);
        await this.mkdir(attachmentsDir, { recursive: true });
    }

    /**
     * Get encrypted attachment
     * - Loads the attachment contents from a file into a buffer
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @returns {Promise.<Buffer|ArrayBuffer>}
     * @memberof FileDatasource
     */
    async getAttachment(vaultID, attachmentID) {
        await this._ensureAttachmentsPaths(vaultID);
        const attachmentPath = path.join(this.baseDir, ".buttercup", vaultID, `${attachmentID}.${ATTACHMENT_EXT}`);
        return this.readFile(attachmentPath);
    }

    /**
     * Get attachment details
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @returns {AttachmentDetails} The attachment details
     * @memberof FileDatasource
     */
    async getAttachmentDetails(vaultID, attachmentID) {
        await this._ensureAttachmentsPaths(vaultID);
        const filename = `${attachmentID}.${ATTACHMENT_EXT}`;
        const filePath = path.join(this.baseDir, ".buttercup", vaultID, filename);
        const fileStat = await this.stat(filePath);
        return {
            id: attachmentID,
            vaultID,
            name: filename,
            filename: filePath,
            size: fileStat.size,
            mime: null
        };
    }

    /**
     * Load from the filename specified in the constructor using a password
     * @param {Credentials} credentials The credentials for decryption
     * @returns {Promise.<LoadedVaultData>} A promise resolving with archive history
     * @memberof FileDatasource
     */
    load(credentials) {
        return this.hasContent
            ? super.load(credentials)
            : this.readFile(this.path, "utf8").then(contents => {
                  this.setContent(contents);
                  return super.load(credentials);
              });
    }

    /**
     * Put encrypted attachment data
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @param {Buffer|ArrayBuffer} buffer The attachment data
     * @param {Object} details
     * @returns {Promise}
     * @memberof FileDatasource
     */
    async putAttachment(vaultID, attachmentID, buffer, details) {
        await this._ensureAttachmentsPaths(vaultID);
        const attachmentPath = path.join(this.baseDir, ".buttercup", vaultID, `${attachmentID}.${ATTACHMENT_EXT}`);
        await this.writeFile(attachmentPath, buffer);
    }

    /**
     * Remove an attachment
     * @param {String} vaultID The ID of the vault
     * @param {String} attachmentID The ID of the attachment
     * @returns {Promise}
     * @memberof FileDatasource
     */
    async removeAttachment(vaultID, attachmentID) {
        await this._ensureAttachmentsPaths(vaultID);
        const attachmentPath = path.join(this.baseDir, ".buttercup", vaultID, `${attachmentID}.${ATTACHMENT_EXT}`);
        await this.unlink(attachmentPath);
    }

    /**
     * Save archive history to a file
     * @param {Array.<String>} history The archive history to save
     * @param {Credentials} credentials The credentials to save with
     * @returns {Promise} A promise that resolves when saving is complete
     * @memberof FileDatasource
     */
    save(history, credentials) {
        return super.save(history, credentials).then(encrypted => this.writeFile(this.path, encrypted));
    }

    /**
     * Whether or not the datasource supports attachments
     * @returns {Boolean}
     * @memberof FileDatasource
     */
    supportsAttachments() {
        return true;
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof FileDatasource
     */
    supportsRemoteBypass() {
        return true;
    }
}

registerDatasource("file", FileDatasource);

module.exports = FileDatasource;
