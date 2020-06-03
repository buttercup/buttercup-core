const EventEmitter = require("events");
const hash = require("hash.js");
const Credentials = require("../credentials/Credentials.js");
const { credentialsAllowsPurpose } = require("../credentials/channel.js");
const { detectFormat, getDefaultFormat } = require("../io/formatRouter.js");
const { fireInstantiationHandlers, registerDatasource } = require("./register.js");

/**
 * @typedef {Object} LoadedVaultData
 * @property {VaultFormat} Format The vault format class that was detected
 *  when reading encrypted vault contents
 * @property {Array.<String>} history Decrypted vault data
 */

/**
 * Datasource for text input and output
 * @memberof module:Buttercup
 */
class TextDatasource extends EventEmitter {
    /**
     * Constructor for the text datasource
     * @param {Credentials} credentials The credentials and configuration for
     *  the datasource
     */
    constructor(credentials) {
        super();
        this._credentials = credentials;
        this._credentials.restrictPurposes([Credentials.PURPOSE_SECURE_EXPORT]);
        this._content = "";
        this.type = "text";
        fireInstantiationHandlers("text", this);
    }

    /**
     * Datasource credentials
     * @type {Credentials}
     * @readonly
     */
    get credentials() {
        return this._credentials;
    }

    /**
     * Whether the datasource currently has content
     * Used to check if the datasource has encrypted content that can be
     * loaded. May be used when attempting to open a vault in offline mode.
     * @type {Boolean}
     * @memberof TextDatasource
     */
    get hasContent() {
        return this._content && this._content.length > 0;
    }

    /**
     * Get the ID of the datasource
     * ID to uniquely identify the datasource and its parameters
     * @returns {String} A hasn of the datasource (unique ID)
     * @memberof TextDatasource
     */
    getID() {
        const type = this.toObject().type;
        const content = type === "text" ? this._content : this.toString();
        if (!content) {
            throw new Error("Failed getting ID: Datasource requires content for ID generation");
        }
        return hash
            .sha256()
            .update(content)
            .digest("hex");
    }

    /**
     * Load from the stored content using a password to decrypt
     * @param {Credentials} credentials The password or Credentials instance to decrypt with
     * @returns {Promise.<LoadedVaultData>} A promise that resolves with decrypted history
     * @throws {Error} Rejects if content is empty
     * @memberof TextDatasource
     */
    load(credentials) {
        if (!this._content) {
            return Promise.reject(new Error("Failed to load vault: Content is empty"));
        }
        if (credentialsAllowsPurpose(credentials.id, Credentials.PURPOSE_DECRYPT_VAULT) !== true) {
            return Promise.reject(new Error("Provided credentials don't allow vault decryption"));
        }
        const Format = detectFormat(this._content);
        return Format.parseEncrypted(this._content, credentials).then(history => ({
            Format,
            history
        }));
    }

    /**
     * Save archive contents with a password
     * @param {Array.<String>} history Archive history to save
     * @param {Credentials} credentials The Credentials instance to encrypt with
     * @returns {Promise.<string>} A promise resolving with the encrypted content
     * @memberof TextDatasource
     */
    save(vaultCommands, credentials) {
        if (credentialsAllowsPurpose(credentials.id, Credentials.PURPOSE_ENCRYPT_VAULT) !== true) {
            return Promise.reject(new Error("Provided credentials don't allow vault encryption"));
        }
        return getDefaultFormat().encodeRaw(vaultCommands, credentials);
    }

    /**
     * Set the text content
     * @param {String} content The encrypted text content
     * @returns {TextDatasource} Self
     * @memberof TextDatasource
     */
    setContent(content) {
        this._content = content || "";
        return this;
    }

    /**
     * Whether or not the datasource supports attachments
     * @returns {Boolean}
     * @memberof TextDatasource
     */
    supportsAttachments() {
        return false;
    }

    /**
     * Whether or not the datasource supports the changing of the master password
     * @returns {Boolean} True if the datasource supports password changing
     * @memberof TextDatasource
     */
    supportsPasswordChange() {
        return false;
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     *  (offline support)
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof TextDatasource
     */
    supportsRemoteBypass() {
        return false;
    }
}

registerDatasource("text", TextDatasource);

module.exports = TextDatasource;
