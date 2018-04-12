const { TextDatasource, registerDatasource } = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");
const { getSharedClient } = require("./MyButtercupClient.js");

class MyButtercupDatasource extends TextDatasource {
    constructor(token, archiveID) {
        super();
        this._token = token;
        this._archiveID = archiveID;
        this._updateID = null;
        this._rootArchiveID = null;
    }

    load(masterAccountCredentials) {
        const client = getSharedClient();
        return client
            .updateDigest(this._token, masterAccountCredentials)
            .then(({ rootArchiveID }) => {
                this._rootArchiveID = rootArchiveID;
                return client.fetchArchive(rootArchiveID, this._archiveID);
            })
            .then(({ archive, masterPassword, updateID }) => {
                this._updateID = updateID;
                this.setContent(archive);
                return super.load(Credentials.fromPassword(masterPassword));
            });
    }

    save(history, credentials) {}
}

registerDatasource("mybuttercup", MyButtercupDatasource);

module.exports = MyButtercupDatasource;
