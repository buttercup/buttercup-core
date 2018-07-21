const { TextDatasource, registerDatasource } = require("@buttercup/datasources");
const { generateNewUpdateID } = require("./helpers.js");

class MyButtercupRootDatasource extends TextDatasource {
    constructor(token, archiveID) {
        super();
        this._token = token;
        this._updateID = null;
        this._archiveID = archiveID;
    }

    get archiveID() {
        return this._archiveID;
    }

    load(credentials) {
        const { getSharedClient } = require("./MyButtercupClient.js");
        const client = getSharedClient();
        return client.fetchArchive(this._token, this.archiveID, this.archiveID).then(({ archive, updateID }) => {
            this._updateID = updateID;
            this.setContent(archive);
            return super.load(credentials);
        });
    }

    save(history, credentials, { isNew = false, organisationID } = {}) {
        const { getSharedClient } = require("./MyButtercupClient.js");
        const client = getSharedClient();
        return super
            .save(history, credentials)
            .then(encryptedContents =>
                client.writeArchive({
                    token: this._token,
                    rootArchiveID: this.archiveID,
                    archiveID: this.archiveID,
                    encryptedContents,
                    updateID: isNew ? generateNewUpdateID() : this._updateID,
                    masterAccountCredentials: credentials,
                    isNew,
                    isRoot: true,
                    organisationID
                })
            )
            .then(({ updateID, archiveID }) => {
                this._updateID = updateID;
                this._archiveID = archiveID;
            });
    }
}

registerDatasource("mybuttercup:root", MyButtercupRootDatasource);

module.exports = MyButtercupRootDatasource;
