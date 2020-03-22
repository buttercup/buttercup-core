const { generateUUID } = require("../tools/uuid.js");
const { getCredentials, removeCredentials, setCredentials } = require("./channel.js");
const { getSharedAppEnv } = require("../env/appEnv.js");

/**
 * The signature of legacy encrypted credentials
 * @private
 * @type {String}
 */
const LEGACY_SIGNING_KEY = "b~>buttercup/acreds.v2.";

/**
 * The signature of encrypted credentials
 * @private
 * @type {String}
 */
const SIGNING_KEY = "bc~3>";

/**
 * Sign encrypted content
 * @see SIGNING_KEY
 * @private
 * @param {String} content The encrypted text
 * @returns {String} The signed key
 */
function signEncryptedContent(content) {
    return `${SIGNING_KEY}${content}`;
}

/**
 * Remove the signature from encrypted content
 * @private
 * @param {String} content The encrypted text
 * @returns {String} The unsigned encrypted key
 * @throws {Error} Throws if no SIGNING_KEY is detected
 * @see SIGNING_KEY
 */
function unsignEncryptedContent(content) {
    const newIndex = content.indexOf(SIGNING_KEY);
    const oldIndex = content.indexOf(LEGACY_SIGNING_KEY);
    if (newIndex === -1 && oldIndex === -1) {
        throw new Error("Invalid credentials content (unknown signature)");
    }
    return newIndex === 0 ? content.substr(SIGNING_KEY.length) : content.substr(LEGACY_SIGNING_KEY.length);
}

/**
 * Secure credentials storage/transfer class
 * - Allows for the safe transfer of credentials within the
 * Buttercup application environment. Will not allow
 * credentials to be shared or transferred outside of the
 * environment. Credential properties are stored in memory
 * and are inaccessible to public functions.
 */
class Credentials {
    /**
     * Create a new Credentials instance from a Datasource configuration
     * @param {Object} datasourceConfig The configuration for the
     *  datasource - this usually includes the credential data used for
     *  authenticating against the datasource host platform.
     * @param {String|null=} masterPassword Optional master password to
     *  store alongside the credentials. Used to create secure strings.
     * @returns {Credentials}
     * @memberof Credentials
     * @static
     */
    static fromDatasource(datasourceConfig, masterPassword = null) {
        return new Credentials(
            {
                datasource: datasourceConfig,
                username,
                password
            },
            masterPassword
        );
    }

    /**
     * Create a new Credentials instance from a password
     * - uses the single password value as the master password stored
     * alongside the original password if no master password is
     * provided. The master password is used when generating secure
     * strings.
     * @param {String} password The password to store
     * @param {String|null=} masterPassword Optional master password
     *  to store alongside the credentials. Used to create secure
     *  strings.
     * @returns {Credentials}
     * @memberof Credentials
     * @static
     */
    static fromPassword(password, masterPassword = null) {
        const masterPass = masterPassword || password;
        return new Credentials({ password }, masterPass);
    }

    /**
     * Create a new instance from a secure string
     * @param {String} content Encrypted content
     * @param {String} masterPassword The password for decryption
     * @returns {Promise.<Credentials>} A promise that resolves with the new instance
     * @static
     * @memberof Credentials
     */
    static fromSecureString(content, masterPassword) {
        const encrypt = getSharedAppEnv().getProperty("crypto/v1/decryptText");
        return decrypt(unsignEncryptedContent(content), masterPassword)
            .then(decryptedContent => JSON.parse(decryptedContent))
            .then(credentialsData => new Credentials(credentialsData, masterPassword));
    }

    /**
     * Create a new Credentials instance
     * @param {Object=} obj Object data representing some credentials
     * @param {String|null=} masterPassword Optional master password to store with
     *  the credentials data, which is used for generating secure strings.
     */
    constructor(obj = {}, masterPassword = null) {
        const id = generateUUID();
        Object.defineProperty(this, "id", {
            writable: false,
            configurable: false,
            enumerable: true,
            value: id
        });
        setCredentials(id, {
            data: obj,
            masterPassword
        });
    }

    /**
     * Convert the credentials to an encrypted string, for storage
     * @param {string} masterPassword The password for encrypting
     * @returns {Promise} A promise that resolves with the encrypted credentials
     * @see signEncryptedContent
     * @throws {Error} Rejects when masterPassword is not a string
     * @memberof Credentials
     */
    toSecureString() {
        const encrypt = getSharedAppEnv().getProperty("crypto/v1/encryptText");
        const { data, masterPassword } = getCredentials(this.id);
        if (typeof masterPassword !== "string") {
            return Promise.reject(
                new Error("Cannot convert Credentials to string: master password was not set or is invalid")
            );
        }
        return encrypt(JSON.stringify(data), masterPassword).then(signEncryptedContent);
    }
}
