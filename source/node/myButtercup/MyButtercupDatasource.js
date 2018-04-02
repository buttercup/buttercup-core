const { TextDatasource, registerDatasource } = require("@buttercup/datasources");

class MyButtercupDatasource extends TextDatasource {
    constructor(token, archiveID) {
        super();
        this._token = token;
        this._archiveID = archiveID;
    }

    get isRoot() {
        return this._archiveID === null;
    }
}

registerDatasource("mybuttercup", MyButtercupDatasource);

module.exports = MyButtercupDatasource;
