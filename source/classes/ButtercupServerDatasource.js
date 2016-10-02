"use strict";

var TextDatasource = require("./TextDatasource.js"),
    buildServerAdapter = require("./ButtercupServerAdapter.js");

class ButtercupServerDatasource extends TextDatasource {

    constructor(address, email, password) {
        super("");
        let addressLen = address.length;
        address = (address[addressLen - 1] === "/") ?
            address : address + "/";
        this._adapter = buildServerAdapter(address, email, password);
        this._address = address;
    }

    load(passwordOrCredentials) {
        return this._adapter
            .getArchiveData()
            .then(data => {
                this.setContent(data);
                return super.load(passwordOrCredentials, /* new if empty */ true);
            });
    }

    save(archive, passwordOrCredentials) {
        return super
            .save(archive, passwordOrCredentials)
            .then(encrypted => this._adapter.saveArchiveData(encrypted));
    }

    toString() {
        return [
            "ds=butterupserver",
            `address=${this._address}`
        ].join(",");
    }

}

module.exports = ButtercupServerDatasource;
