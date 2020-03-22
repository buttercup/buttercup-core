const EventEmitter = require("events");
const hash = require("hash.js");
const Credentials = require("../credentials/Credentials.js");
const { credentialsAllowsPurpose } = require("../credentials/channel.js");
const { detectFormat, getDefaultFormat } = require("../io/formatRouter.js");
const { fireInstantiationHandlers, registerDatasource } = require("./DatasourceAdapter.js");

/**
 * Datasource for text input and output
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
        fireInstantiationHandlers("text", this);
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
     * Dehydrate the datasource to encrypted text form
     * @returns {Promise.<String>}
     * @memberof TextDataSource
     */
    dehydrate() {
        return this._credentials.toSecureString();
    }

    /**
     * Get the ID of the datasource
     * ID to uniquely identify the datasource and its parameters
     * @returns {String} A hasn of the datasource (unique ID)
     * @memberof TextDataSource
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
     * @returns {Promise.<Array.<String>>} A promise that resolves with decrypted history
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
        return detectFormat(this._content).parseEncrypted(this._content, credentials);
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
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof TextDatasource
     */
    supportsRemoteBypass() {
        return false;
    }

    // /**
    //  * Output the datasource as an object
    //  * @returns {Object} The object representation
    //  * @memberof TextDatasource
    //  */
    // toObject() {
    //     return {
    //         type: "text",
    //         content: this._content
    //     };
    // }

    // /**
    //  * Output the datasource configuration as a string
    //  * @returns {String} The string representation of the datasource
    //  * @memberof TextDatasource
    //  */
    // toString() {
    //     return JSON.stringify(this.toObject());
    // }
}

// TextDatasource.fromObject = function fromObject(obj) {
//     if (obj.type === "text") {
//         return new TextDatasource(obj.content);
//     }
//     throw new Error(`Unknown or invalid type: ${obj.type}`);
// };

// TextDatasource.fromString = function fromString(str) {
//     return TextDatasource.fromObject(JSON.parse(str));
// };

registerDatasource("text", TextDatasource);

module.exports = TextDatasource;
