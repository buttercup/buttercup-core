const iocane = require("iocane").crypto;
const Signing = require("../tools/signing.js");

/**
 * The credentials type key
 * @private
 * @type {String}
 */
const CREDENTIALS_ATTR = "@@bcup-role";

/**
 * The signature of encrypted credentials
 * @private
 * @type {string}
 */
const SIGNING_KEY = Signing.getSignature() + "creds.v2.";

/**
 * The old signing signature
 * @private
 * @type {string}
 */
const SIGNING_KEY_OLD = Signing.getSignature() + "creds.";

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
    const oldIndex = content.indexOf(SIGNING_KEY_OLD);
    if (newIndex === -1 && oldIndex === -1) {
        throw new Error("Invalid credentials content (unknown signature)");
    }
    return newIndex >= 0 ? content.substr(SIGNING_KEY.length) : content.substr(SIGNING_KEY_OLD.length);
}

/**
 * Credentials instance
 */
class Credentials {
    static fromInsecureString(content) {
        const data = JSON.parse(content);
        return new Credentials(data);
    }

    static fromPassword(password) {
        return new Credentials({ type: "password", password });
    }

    static fromSecureString(content, password) {
        return iocane
            .decryptWithPassword(unsignEncryptedContent(content), password)
            .then(decryptedContent => JSON.parse(decryptedContent))
            .then(
                credentialsData =>
                    Array.isArray(credentialsData)
                        ? new Credentials({ ...credentialsData[1], type: credentialsData[0] })
                        : new Credentials(credentialsData)
            );
    }

    static isCredentials(target) {
        return typeof target === "object" && target !== null && target[CREDENTIALS_ATTR] === "credentials";
    }

    static isSecureString(str) {
        try {
            unsignEncryptedContent(str);
            return true;
        } catch (err) {
            return false;
        }
    }

    constructor(typeOrData) {
        this.data =
            typeof typeOrData === "string"
                ? { type: typeOrData }
                : {
                      type: "",
                      ...typeOrData
                  };
    }

    /**
     * The password
     * @type {String|undefined}
     * @memberof Credentials
     */
    get password() {
        return this.data.password;
    }

    /**
     * The credentials type
     * @type {String}
     * @memberof Credentials
     * @readonly
     */
    get type() {
        return this.data.type;
    }

    /**
     * The username
     * @type {String|undefined}
     * @memberof Credentials
     */
    get username() {
        return this.data.username;
    }

    /**
     * The password
     * @type {String|undefined}
     * @memberof Credentials
     * @instance
     */
    set password(newPassword) {
        this.data.password = newPassword;
    }

    set username(newUsername) {
        this.data.username = newUsername;
    }

    /**
     * Get a value from the credentials
     * @param {String} property The property to fetch
     * @returns {*|undefined} Returns the value if found, or undefined
     * @memberof Credentials
     */
    getValue(property) {
        return this.data[property];
    }

    /**
     * Get a value, or fail if it doesn't exist or isn't set
     * @throws {Error} Throws if the value is undefined
     * @param {String} property The property to fetch
     * @returns {*} The value (not undefined)
     * @memberof Credentials
     * @instance
     */
    getValueOrFail(property) {
        const value = this.getValue(property);
        if (typeof value === "undefined") {
            throw new Error(`Failed retrieving required credentials property: ${property}`);
        }
        return value;
    }

    /**
     * Set a value for a property
     * @param {String} property The property to set
     * @param {*} value The value to set for the property
     * @returns {Credentials} Returns self, for chaining
     * @memberof Credentials
     */
    setValue(property, value) {
        this.data[property] = value;
        return this;
    }

    /**
     * Convert the credentials to an insecure string
     * @returns {String} The string-encoded credentials
     * @memberof Credentials
     */
    toInsecureString() {
        return JSON.stringify(data);
    }

    /**
     * Convert the credentials to an encrypted string, for storage
     * @param {string} masterPassword The password for encrypting
     * @returns {Promise} A promise that resolves with the encrypted credentials
     * @see signEncryptedContent
     * @throws {Error} Rejects when masterPassword is not a string
     * @memberof Credentials
     */
    toSecureString(masterPassword) {
        if (typeof masterPassword !== "string") {
            return Promise.reject(new Error("Master password must be a string"));
        }
        return iocane.encryptWithPassword(this.toInsecureString(), masterPassword).then(signEncryptedContent);
    }
}

module.exports = createCredentials;
