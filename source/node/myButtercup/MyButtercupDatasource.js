const { TextDatasource, registerDatasource } = require("@buttercup/datasources");
const { getSharedClient } = require("./MyButtercupClient.js");

class MyButtercupDatasource extends TextDatasource {
    constructor(token, archiveID, isRoot) {
        super();
        this._token = token;
        this._archiveID = archiveID;
        this._root = isRoot;
        this._updateID = null;
    }

    get isRoot() {
        return this._root;
    }

    load(credentials) {
        const client = getSharedClient();
        return client
            .updateDigest(this._token)
            .then(() => client.fetchArchive(this._archiveID))
            .then(({ archive, updateID }) => {
                this._updateID = updateID;
                this.setContent(archive);
                return super.load(credentials);
            });
    }

    save(history, credentials) {}
}

registerDatasource("mybuttercup", MyButtercupDatasource);

module.exports = MyButtercupDatasource;
