(function(module) {

    "use strict";

    var TextDatasource = require("./TextDatasource.js"),
        fs = require("fs");

    /**
     * File datasource for loading and saving files
     * @class FileDatasource
     * @augments TextDatasource
     */
    class FileDatasource extends TextDatasource {

        /**
         * Constructor for the file datasource
         * @param {string} filename The filename to load and save
         */
        constructor(filename) {
            super("");
            this._filename = filename;
        }

        /**
         * Load from the filename specified in the constructor using a password
         * @param {string} password The password for decryption
         * @returns {Promise<Archive>} A promise resolving with the opened archive
         */
        load(password) {
            var filename = this._filename;
            return (new Promise(function(resolve, reject) {
                fs.readFile(filename, "utf8", function(error, data) {
                    if (error) {
                        (reject)(error);
                    } else {
                        (resolve)(data);
                    }
                });
            })).then((data) => {
                this.setContent(data);
                return super.load(password);
            }).catch(function(error) {
                var errorMsg = "Failed opening archive: " + error;
                console.error(errorMsg);
                throw error;
            });
        }

        /**
         * Save an archive to a file using a password for encryption
         * @param {Archive} archive The archive to save
         * @param {string} password The password to save with
         * @returns {Promise} A promise that resolves when saving is complete
         */
        save(archive, password) {
            return super
                .save(archive, password)
                .then((encrypted) => {
                    return new Promise((resolve, reject) => {
                        fs.writeFile(this._filename, encrypted, function(err) {
                            if (err) {
                                (reject)(err);
                            } else {
                                (resolve)();
                            }
                        });
                    });
                });
        }

        /**
         * Output the datasource configuration as a string
         * @returns {string}
         */
        toString() {
            return [
                "ds=file",
                `path=${this._filename}`
            ].join(",");
        }

    }

    module.exports = FileDatasource;

})(module);
