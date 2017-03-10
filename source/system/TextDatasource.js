"use strict";

const iocane = require("iocane").crypto;

var Archive = require("./Archive.js"),
    Credentials = require("./credentials.js"),
    signing = require("../tools/signing.js"),
    encoding = require("../tools/encoding.js"),
    createDebug = require("../tools/debug.js");

const registerDatasource = require("./DatasourceAdapter.js").registerDatasource;

const debug = createDebug("text-datasource");

/**
 * Pre-process credentials data
 * @param {Credentials} credentials Password or Credentials instance
 * @returns {{ password: (String|undefined), keyfile: (String|undefined) }} Credential data
 * @throws {Error} Throws if both password and keyfile are undefined
 * @throws {Error} Throws if credentials is not an object
 * @private
 * @memberof TextDatasource
 */
function processCredentials(credentials) {
    if (typeof credentials !== "object") {
        throw new Error("Expected credentials object, got " + typeof credentials);
    }
    // either might be undefined, but at least one needs to be defined
    let password = credentials.password,
        keyfile = credentials.getValue("keyfile");
    if (!password && !keyfile) {
        throw new Error("Neither a password nor key-file were provided");
    }
    return {
        password,
        keyfile
    };
}

/**
 * Datasource for text input and output
 * @class TextDatasource
 */
class TextDatasource {

    /**
     * Constructor for the text datasource
     * @param {string} content The content to load from
     */
    constructor(content) {
        debug("new text datasource");
        this._content = content;
    }

    /**
     * Load from the stored content using a password to decrypt
     * @param {Credentials} credentials The password or Credentials instance to decrypt with
     * @param {Boolean=} emptyCreatesNew Create a new Archive instance if text contents are empty (defaults to false)
     * @returns {Promise.<Archive>} A promise that resolves with an open archive
     */
    load(credentials, emptyCreatesNew) {
        debug("load archive");
        emptyCreatesNew = (emptyCreatesNew === undefined) ? false : emptyCreatesNew;
        let credentialsData = processCredentials(credentials),
            password = credentialsData.password,
            keyfile = credentialsData.keyfile;
        if (this._content.trim().length <= 0) {
            return emptyCreatesNew ?
                new Archive() :
                Promise.reject(new Error("Unable to load archive: contents empty"));
        }
        return Promise.resolve(this._content)
            .then(function(data) {
                if (!signing.hasValidSignature(data)) {
                    return Promise.reject(new Error("No valid signature in archive"));
                }
                return signing.stripSignature(data);
            })
            .then(function(encryptedData) {
                // optionally decrypt using a key file
                return keyfile ?
                    iocane.decryptWithKeyFile(encryptedData, keyfile) :
                    encryptedData;
            })
            .then(function(encryptedData) {
                // optionally decrypt using a password
                return password ?
                    iocane.decryptWithPassword(encryptedData, password) :
                    encryptedData;
            })
            .then(function(decrypted) {
                if (decrypted && decrypted.length > 0) {
                    var decompressed = encoding.decompress(decrypted);
                    if (decompressed) {
                        return decompressed.split("\n");
                    }
                }
                return Promise.reject(new Error("Decryption failed"));
            })
            .then(history => Archive.createFromHistory(history));
    }

    /**
     * Save an archive with a password
     * @param {Archive} archive The archive to save
     * @param {Credentials} credentials The Credentials instance to encrypt with
     * @returns {Promise.<string>} A promise resolving with the encrypted content
     */
    save(archive, credentials) {
        debug("save archive");
        let credentialsData = processCredentials(credentials),
            password = credentialsData.password,
            keyfile = credentialsData.keyfile;
        let history = archive._getWestley().getHistory().join("\n"),
            compressed = encoding.compress(history);
        return Promise
            .resolve(compressed)
            .then(function(encryptedData) {
                return password ?
                    iocane.encryptWithPassword(encryptedData, password) :
                    encryptedData;
            })
            .then(function(encryptedData) {
                return keyfile ?
                    iocane.encryptWithKeyFile(encryptedData, keyfile) :
                    encryptedData;
            })
            .then(signing.sign);
    }

    /**
     * Set the text content
     * @param {String} content The encrypted text content
     * @returns {TextDatasource} Self
     */
    setContent(content) {
        debug("set content");
        this._content = content;
        return this;
    }

    /**
     * Output the datasource as an object
     * @returns {Object} The object representation
     */
    toObject() {
        return {
            type: "text",
            content: this._content
        };
    }

    /**
     * Output the datasource configuration as a string
     * @returns {String} The string representation of the datasource
     */
    toString() {
        debug("to string");
        return JSON.stringify(this.toObject());
    }

}

TextDatasource.fromObject = function fromObject(obj) {
    if (obj.type === "text") {
        return new TextDatasource(obj.content);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

TextDatasource.fromString = function fromString(str) {
    return TextDatasource.fromObject(JSON.parse(str));
};

registerDatasource("text", TextDatasource);

module.exports = TextDatasource;
