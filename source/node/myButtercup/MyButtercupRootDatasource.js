const { TextDatasource, registerDatasource } = require("@buttercup/datasources");

class MyButtercupRootDatasource extends TextDatasource {
    constructor(archiveID) {
        super();
        this._updateID = null;
        this._archiveID = archiveID;
    }

    load(credentials) {
        const { getSharedClient } = require("./MyButtercupClient.js");
        const client = getSharedClient();
        return client.fetchArchive(this._archiveID, this._archiveID).then(({ archive, updateID }) => {
            this._updateID = updateID;
            this.setContent(archive);
            return super.load(credentials);
        });
    }

    save(history, credentials) {
        const { getSharedClient } = require("./MyButtercupClient.js");
        const client = getSharedClient();
        return super
            .save(history, credentials)
            .then(encryptedContents =>
                client.writeArchive(this._archiveID, this._archiveID, encryptedContents, this._updateID)
            );
    }
}

registerDatasource("mybuttercup:root", MyButtercupRootDatasource);

module.exports = MyButtercupRootDatasource;
