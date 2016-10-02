"use strict";

var TextDatasource = require("./TextDatasource.js"),
    buildServerAdapter = require("./ButtercupServerAdapter.js");

/**
 * Datasource for Buttercup server connections
 * @class ButtercupServerDatasource
 * @augments TextDatasource
 */
class ButtercupServerDatasource extends TextDatasource {

    /**
     * Constructor for the datasource
     * @constructor
     * @param {string} address The remote address of the server
     * @param {string} email The user's email address
     * @param {string} password The account password
     */
    constructor(address, email, password) {
        super("");
        let addressLen = address.length;
        address = (address[addressLen - 1] === "/") ?
            address : address + "/";
        this._adapter = buildServerAdapter(address, email, password);
        this._address = address;
    }

    /**
     * Load an archive
     * @param {string|Credentials} passwordOrCredentials The credentials or password for the archive
     * @returns {Promise.<Archive>} A Promise that resolves with an Archive
     */
    load(passwordOrCredentials) {
        return this._adapter
            .getArchiveData()
            .then(data => {
                this.setContent(data);
                return super.load(passwordOrCredentials, /* new if empty */ true);
            });
    }

    /**
     * Save an archive
     * @param {Archive} archive The archive to save
     * @param {string|Credentials} passwordOrCredentials The password or credentials for the archive
     * @returns {Promise} A Promise that resolves when saving is complete
     */
    save(archive, passwordOrCredentials) {
        return super
            .save(archive, passwordOrCredentials)
            .then(encrypted => this._adapter.saveArchiveData(encrypted));
    }

    /**
     * Convert the datasource to a string
     * @returns {string} The string representation of the datasource
     */
    toString() {
        return [
            "ds=butterupserver",
            `address=${this._address}`
        ].join(",");
    }

}

module.exports = ButtercupServerDatasource;
