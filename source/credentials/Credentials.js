const { generateUUID } = require("../tools/uuid.js");
const { credentialsAllowsPurpose, getCredentials, removeCredentials, setCredentials } = require("./channel.js");
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
 * @memberof module:Buttercup
 */
class Credentials {
    static PURPOSE_DECRYPT_VAULT = "vault-decrypt";
    static PURPOSE_ENCRYPT_VAULT = "vault-encrypt";
    static PURPOSE_SECURE_EXPORT = "secure-export";

    /**
     * Get all available purposes
     * @returns {Array.<String>}
     * @memberof Credentials
     * @static
     */
    static allPurposes() {
        return [
            Credentials.PURPOSE_DECRYPT_VAULT,
            Credentials.PURPOSE_ENCRYPT_VAULT,
            Credentials.PURPOSE_SECURE_EXPORT
        ];
    }

    /**
     * Create a new Credentials instance using an existing Credentials
     * instance - This can be used to reset a credentials's purposes.
     * @param {Credentials} credentials A credentials instance
     * @param {String} masterPassword The master password used to
     *  encrypt the instance being cloned
     * @returns {Credentials}
     * @memberof Credentials
     * @static
     * @throws {Error} Throws if no master password provided
     * @throws {Error} Throws if master password does not match
     *  original
     */
    static fromCredentials(credentials, masterPassword) {
        if (!masterPassword) {
            throw new Error("Master password is required for credentials cloning");
        }
        const credentialsData = getCredentials(credentials.id);
        if (credentialsData.masterPassword !== masterPassword) {
            throw new Error("Master password does not match that of the credentials to be cloned");
        }
        const newData = JSON.parse(JSON.stringify(credentialsData.data));
        return new Credentials(newData, masterPassword);
    }

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
                datasource: datasourceConfig
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
        const decrypt = getSharedAppEnv().getProperty("crypto/v1/decryptText");
        return decrypt(unsignEncryptedContent(content), masterPassword)
            .then(decryptedContent => JSON.parse(decryptedContent))
            .then(credentialsData => {
                // Handle compatibility updates for legacy credentials
                if (credentialsData.datasource) {
                    if (typeof credentialsData.datasource === "string") {
                        credentialsData.datasource = JSON.parse(credentialsData.datasource);
                    }
                    // Move username and password INTO the datasource config, as
                    // they relate to the remote connection/source
                    if (credentialsData.username) {
                        credentialsData.datasource.username = credentialsData.username;
                        delete credentialsData.username;
                    }
                    if (credentialsData.password) {
                        credentialsData.datasource.password = credentialsData.password;
                        delete credentialsData.password;
                    }
                }
                return new Credentials(credentialsData, masterPassword);
            });
    }

    /**
     * Check if a value is an instance of Credentials
     * @param {*} inst The value to check
     * @returns {Boolean}
     * @statuc
     * @memberof Credentials
     */
    static isCredentials(inst) {
        return !!inst && typeof inst === "object" && typeof inst.toSecureString === "function" && !!inst.id;
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
            masterPassword,
            purposes: Credentials.allPurposes()
        });
    }

    /**
     * Restrict the purposes that this set of credentials
     * can be used for. Once a purpose is removed it can
     * no longer be added again to the same instance.
     * @param {Array.<String>} allowedPurposes An array of
     *  new allowed purposes. If a purpose mentioned is
     *  not currently permitted, it will be ignored.
     * @returns {Credentials} Returns self
     * @memberof Credentials
     * @example
     *  credentials.restrictPurposes(
     *      Credentials.PURPOSE_SECURE_EXPORT
     *  );
     *  // credentials can only be exported to an
     *  // encrypted string, and not used for things
     *  // like encrypting datasource changes.
     */
    restrictPurposes(allowedPurposes) {
        const creds = getCredentials(this.id);
        const { purposes } = creds;
        // Filter out purposes which have already been restricted
        const finalPurposes = allowedPurposes.filter(newPurpose => purposes.includes(newPurpose));
        setCredentials(
            this.id,
            Object.assign(creds, {
                purposes: finalPurposes
            })
        );
        return this;
    }

    /**
     * Convert the credentials to an encrypted string, for storage
     * @returns {Promise} A promise that resolves with the encrypted credentials
     * @throws {Error} Rejects when masterPassword is not a string
     * @throws {Error} Rejects if credentials don't permit secure export purposes
     * @memberof Credentials
     */
    toSecureString() {
        if (credentialsAllowsPurpose(this.id, Credentials.PURPOSE_SECURE_EXPORT) !== true) {
            return Promise.reject(new Error("Credential purposes don't allow for secure exports"));
        }
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

module.exports = Credentials;
