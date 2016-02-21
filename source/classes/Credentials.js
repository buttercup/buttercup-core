(function(module) {

    "use strict";

    var Model = require("__buttercup/classes/Model.js"),
        Signing = require("__buttercup/tools/signing.js"),
        Encryption = require("__buttercup/encryption/encrypt.js"),
        Decryption = require("__buttercup/encryption/decrypt.js");

    /**
     * The signature of encrypted credentials
     * @private
     * @type {string}
     * @memberof Credentials
     */
    var SIGNING_KEY = Signing.getSignature() + "cred.";

    /**
     * Sign encrypted content
     * @see SIGNING_KEY
     * @private
     * @static
     * @memberof Credentials
     * @param {string} content The encrypted text
     * @returns {string}
     */
    function signEncryptedContent(content) {
        return SIGNING_KEY + content;
    }

    /**
     * Remove the signature from encrypted content
     * @private
     * @static
     * @memberof Credentials
     * @param {string} content The encrypted text
     * @returns {string}
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
    var Credentials = function(data) {
        /**
         * Internal data Model
         * @public
         * @instance
         * @memberof Credentials
         * @type {Model}
         */
        this.model = (data instanceof Model) ? data : new Model(data);
    };

    /**
     * Set identity information
     * @param {string} username
     * @param {string} password
     * @returns {Credentials} Self
     * @memberof Credentials
     */
    Credentials.prototype.setIdentity = function(username, password) {
        this.model
            .set("username", username)
            .set("password", password);
        return this;
    };

    /**
     * Set the credentials type (eg. webdav/owncloud etc.)
     * @param {string} type
     * @returns {Credentials} Self
     * @memberof Credentials
     */
    Credentials.prototype.setType = function(type) {
        this.model.set("type", type);
        return this;
    };

    /**
     * Convert the credentials to an encrypted string, for storage
     * @param {string} masterPassword The password for encrypting
     * @returns {string} The encrypted credentials
     * @memberof Credentials
     * @see signEncryptedContent
     */
    Credentials.prototype.toSecure = function(masterPassword) {
        if (typeof masterPassword !== "string") {
            throw new Error("Master password must be a string");
        }
        return signEncryptedContent(
            Encryption.encrypt(JSON.stringify(this.model.getData()), masterPassword)
        );
    };

    /**
     * Create a new Credentials instance from encrypted information
     * @param {string} content The encrypted content
     * @param {string} password The master password to decrypt with
     * @memberof Credentials
     * @static
     * @public
     * @returns {Credentials} A new Credentials instance
     */
    Credentials.fromSecureContent = function(content, password) {
        var decryptedContent = Decryption.decrypt(unsignEncryptedContent(content), password);
        return new Credentials(JSON.parse(decryptedContent));
    };

    module.exports = Credentials;

})(module);
