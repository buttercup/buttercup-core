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
    }

    load(passwordOrCredentials) {
        return this._adapter
            .getArchiveData()
            .then(data => {
                this.setContent(data);
                return super.load(passwordOrCredentials, /* new if empty */ true);
            });
    }

}

module.exports = ButtercupServerDatasource;
