"use strict";

const iocane = require("iocane").crypto;

const Model = require("./Model.js");
const Signing = require("../tools/signing.js");

/**
 * The signature of encrypted credentials
 * @private
 * @type {string}
 * @memberof Credentials
 */
const SIGNING_KEY = Signing.getSignature() + "cred.";

/**
 * Sign encrypted content
 * @see SIGNING_KEY
 * @private
 * @static
 * @memberof Credentials
 * @param {String} content The encrypted text
 * @returns {String} The signed key
 */
function signEncryptedContent(content) {
    return SIGNING_KEY + content;
}

/**
 * Remove the signature from encrypted content
 * @private
 * @static
 * @memberof Credentials
 * @param {String} content The encrypted text
 * @returns {String} The unsigned encrypted key
 * @throws {Error} Throws if no SIGNING_KEY is detected
 * @see SIGNING_KEY
 */
function unsignEncryptedContent(content) {
    if (content.indexOf(SIGNING_KEY) !== 0) {
        throw new Error("Invalid credentials content (unknown signature)");
    }
    return content.substr(SIGNING_KEY.length);
}

/**
 * @class Credentials
 * @param {Object|Model=} data The initialisation data
 */
class Credentials {

    constructor(data) {
        /**
         * Internal data Model
         * @public
         * @instance
         * @memberof Credentials
         * @type {Model}
         */
        this.model = (data instanceof Model) ? data : new Model(data);
    }

    /**
     * Get the key file path or buffer
     * Key file path, data buffer, or undefined
     * @type {string|Buffer|undefined}
     */
    get keyFile() {
        return this._keyFile ? this._keyFile : this.model.get("keyfile");
    }

    /**
     * Get the password
     * @type {String|undefined}
     */
    get password() {
        return this.model.get("password");
    }

    /**
     * Get the type of credentials
     * @type {String|undefined}
     */
    get type() {
        return this.model.get("type");
    }

    /**
     * Get the username
     * @type {String|undefined}
     */
    get username() {
        return this.model.get("username");
    }

    set keyFile(pathOrBuffer) {
        if (typeof pathOrBuffer === "string") {
            this.model.set("keyfile", pathOrBuffer);
        } else {
            this._keyFile = pathOrBuffer;
        }
    }

    set password(password) {
        this.model.set("password", password);
    }

    set type(type) {
        this.model.set("type", type);
    }

    set username(username) {
        this.model.set("username", username);
    }

    /**
     * Convert the credentials to an encrypted string, for storage
     * @param {string} masterPassword The password for encrypting
     * @returns {Promise} A promise that resolves with the encrypted credentials
     * @see signEncryptedContent
     * @throws {Error} Throws when masterPassword is not a string
     */
    convertToSecureContent(masterPassword) {
        if (typeof masterPassword !== "string") {
            throw new Error("Master password must be a string");
        }
        return iocane
            .encryptWithPassword(JSON.stringify(this.model.getData()), masterPassword)
            .then(signEncryptedContent);
    }

    /**
     * Get a meta value
     * @returns {String|*} The value or default if it doesn't exist
     * @param {String} name The meta property name
     * @param {undefined|*=} defaultValue The value to return if the item doesn't exist
     */
    getMeta(name, defaultValue) {
        return this.model.get(`meta.${name}`, defaultValue);
    }

    /**
     * Set a meta property
     * @param {String} name The property to set
     * @param {String|*} value The value to set
     */
    setMeta(name, value) {
        this.model.set(`meta.${name}`, value);
        return this;
    }

}

/**
 * Create a new Credentials instance from encrypted information
 * @param {string} content The encrypted content
 * @param {string} password The master password to decrypt with
 * @memberof Credentials
 * @static
 * @public
 * @returns {Promise} A promise resolving with the new Credentials instance
 */
Credentials.createFromSecureContent = function(content, password) {
    return iocane
        .decryptWithPassword(unsignEncryptedContent(content), password)
        .then((decryptedContent) => new Credentials(JSON.parse(decryptedContent)));
};

module.exports = Credentials;
