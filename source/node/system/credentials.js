"use strict";

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
const SIGNING_KEY = Signing.getSignature() + "creds.";

/**
 * Credentials wrapper
 * @typedef {Object} Credentials
 */

/**
 * Create a credentials adapter
 * Both `type` and `data` parameters are optional.
 * @param {String=} type The type of credentials object
 * @param {Object=} data The credentials data
 * @returns {Credentials} A credentials adapter
 */
function createCredentials() {
    let type = "",
        data = {};
    if (typeof arguments[0] === "string") {
        type = arguments[0];
    }
    if (typeof arguments[0] === "object") {
        data = shallowClone(arguments[0]);
    } else if (typeof arguments[1] === "object") {
        data = shallowClone(arguments[1]);
    }
    const adapter = {
        [CREDENTIALS_ATTR]: "credentials",

        /**
         * The password
         * @type {String|undefined}
         * @memberof Credentials
         * @instance
         */
        get password() {
            return data.password;
        },

        /**
         * The credentials type
         * @type {String}
         * @memberof Credentials
         * @instance
         * @readonly
         */
        get type() {
            return type;
        },

        /**
         * The username
         * @type {String|undefined}
         * @memberof Credentials
         * @instance
         */
        get username() {
            return data.username;
        },

        set password(password) {
            data.password = password;
        },

        set username(username) {
            data.username = username;
        },

        /**
         * Get a value from the credentials
         * @param {String} property The property to fetch
         * @returns {*|undefined} Returns the value if found, or undefined
         * @memberof Credentials
         * @instance
         */
        getValue(property) {
            return data[property];
        },

        /**
         * Get a value, or fail if it doesn't exist or isn't set
         * @throws {Error} Throws if the value is undefined
         * @param {String} property The property to fetch
         * @returns {*} The value (not undefined)
         * @memberof Credentials
         * @instance
         */
        getValueOrFail(property) {
            let value = adapter.getValue(property);
            if (value === undefined) {
                throw new Error(`Failed retrieving required credentials property: ${property}`);
            }
            return value;
        },

        /**
         * Set a value for a property
         * @param {String} property The property to set
         * @param {*} value The value to set for the property
         * @returns {Credentials} Returns self, for chaining
         * @memberof Credentials
         * @instance
         */
        setValue(property, value) {
            data[property] = value;
            return adapter;
        },

        /**
         * Convert the credentials to an insecure string
         * @returns {String} The string-encoded credentials
         */
        toInsecureString() {
            return JSON.stringify({
                type: this.type,
                data
            });
        },

        /**
         * Convert the credentials to an encrypted string, for storage
         * @param {string} masterPassword The password for encrypting
         * @returns {Promise} A promise that resolves with the encrypted credentials
         * @see signEncryptedContent
         * @throws {Error} Throws when masterPassword is not a string
         */
        toSecureString(masterPassword) {
            if (typeof masterPassword !== "string") {
                throw new Error("Master password must be a string");
            }
            return iocane.encryptWithPassword(JSON.stringify([type, data]), masterPassword).then(signEncryptedContent);
        }
    };
    return adapter;
}

/**
 * Shallow clone an object
 * @param {Object} obj The object to shallow clone
 * @private
 * @returns {Object} A new object
 */
function shallowClone(obj) {
    return Object.assign({}, obj);
}

/**
 * Sign encrypted content
 * @see SIGNING_KEY
 * @private
 * @param {String} content The encrypted text
 * @returns {String} The signed key
 */
function signEncryptedContent(content) {
    return SIGNING_KEY + content;
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
    if (content.indexOf(SIGNING_KEY) !== 0) {
        throw new Error("Invalid credentials content (unknown signature)");
    }
    return content.substr(SIGNING_KEY.length);
}

/**
 * Create a credentials instance from an insecure string
 * @param {String} content The string format of a credentials instance (insecure)
 * @returns {Credentials} The credentials instance
 */
createCredentials.fromInsecureString = function fromInsecureString(content) {
    const { type, data } = JSON.parse(content);
    return createCredentials(type, data);
};

/**
 * Create a new credentials instance from a password
 * @param {String} password The password to use
 * @returns {Credentials} The credentials instance
 * @static
 */
createCredentials.fromPassword = function fromPassword(password) {
    return createCredentials("password", { password: password });
};

/**
 * Create a new credentials instance from an encrypted string
 * @param {String} content The encrypted form of a credentials store
 * @param {String} password The password to use to decrypt the content
 * @returns {Promise.<Credentials>} A promise that resolves with a credentials instance
 * @static
 */
createCredentials.fromSecureString = function fromSecureString(content, password) {
    return iocane
        .decryptWithPassword(unsignEncryptedContent(content), password)
        .then(decryptedContent => JSON.parse(decryptedContent))
        .then(credentialsData => createCredentials(credentialsData[0], credentialsData[1]));
};

/**
 * Check if a variable is a credentials instance
 * @param {*} target The variable to check
 * @returns {Boolean} True if a credentials instance
 */
createCredentials.isCredentials = function isCredentials(target) {
    return typeof target === "object" && target !== null && target[CREDENTIALS_ATTR] === "credentials";
};

/**
 * Check if a string is a secure credentials string
 * @param {String} str The string to check
 * @returns {Boolean} True if an encrypted credentials string
 */
createCredentials.isSecureString = function isSecureString(str) {
    try {
        unsignEncryptedContent(str);
        return true;
    } catch (err) {
        return false;
    }
};

module.exports = createCredentials;
