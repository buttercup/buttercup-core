(function(module) {

    "use strict";

    const iocane = require("iocane").crypto;

    var Archive = require("./Archive.js"),
        signing = require("../tools/signing.js"),
        encoding = require("../tools/encoding.js");

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
            this._content = content;
        }

        /**
         * Load from the stored content using a password to decrypt
         * @param {string} password The password to decrypt with
         * @returns {Promise.<Archive>} A promise that resolves with an open archive
         */
        load(password) {
            return Promise.resolve(this._content)
                .then(function(data) {
                    if (!signing.hasValidSignature(data)) {
                        return Promise.reject("No valid signature in archive");
                    }
                    return signing.stripSignature(data);
                })
                .then(function(encryptedData) {
                    return iocane.decryptWithPassword(encryptedData, password);
                })
                .then(function(decrypted) {
                    if (decrypted && decrypted.length > 0) {
                        var decompressed = encoding.decompress(decrypted);
                        if (decompressed) {
                            return decompressed.split("\n");
                        }
                    }
                    return Promise.reject("Decryption failed");
                })
                .then(function(history) {
                    var archive = new Archive(),
                        westley = archive._getWestley();
                    westley.clear();
                    history.forEach(westley.execute.bind(westley));
                    return archive;
                });
        }

        /**
         * Save an archive with a password
         * @param {Archive} archive The archive to save
         * @param {string} password The password to encrypt with
         * @returns {Promise.<string>} A promise resolving with the encrypted content
         */
        save(archive, password) {
            var history = archive._getWestley().getHistory().join("\n"),
                compressed = encoding.compress(history);
            return iocane
                .encryptWithPassword(compressed, password)
                .then(signing.sign);
        }

        /**
         * Set the text content
         * @param {string} content The new text content
         * @returns {TextDatasource} Self
         */
        setContent(content) {
            this._content = content;
            return this;
        }

        /**
         * Output the datasource configuration as a string
         * @returns {string}
         */
        toString() {
            return "ds=text";
        }

    }

    module.exports = TextDatasource;

})(module);
