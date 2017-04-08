"use strict";

const TextDatasource = require("./TextDatasource.js");
const buildAdapter = require("./MyButtercupAdapter.js");
const registerDatasource = require("./DatasourceAdapter.js").registerDatasource;

class MyButtercupDatasource extends TextDatasource {

    constructor(archiveID, accessToken) {
        super("");
        this._token = accessToken;
        this._archiveID = archiveID;
        this._adapter = buildAdapter(archiveID, accessToken);
    }

    load(credentials) {
        return this._adapter
            .getArchiveData()
            .then(data => {
                this.setContent(data);
                return super.load(credentials, /* new if empty */ true);
            });
    }

    save(archive, credentials) {
        return super
            .save(archive, credentials)
            .then(encrypted => this._adapter.saveArchiveData(encrypted));
    }

    toObject() {
        return {
            type: "mybuttercup",
            token: this._token,
            archiveID: this._archiveID
        };
    }

}

MyButtercupDatasource.fromObject = function fromObject(obj) {
    if (obj.type === "mybuttercup") {
        return new MyButtercupDatasource(obj.archiveID, obj.token);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

MyButtercupDatasource.fromString = function fromString(str, hostCredentials) {
    return MyButtercupDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("mybuttercup", MyButtercupDatasource);

module.exports = MyButtercupDatasource;
