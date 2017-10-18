"use strict";

const OwnCloudDatasource = require("./OwnCloudDatasource.js");
const registerDatasource = require("./DatasourceAdapter.js").registerDatasource;

/**
 * Datasource for Nextcloud archives
 * @augments OwnCloudDatasource
 */
class NextcloudDatasource extends OwnCloudDatasource {
    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     */
    toObject() {
        return {
            type: "nextcloud",
            endpoint: this._toObjectRefs.owncloudURL,
            path: this._toObjectRefs.resourcePath
        };
    }
}

NextcloudDatasource.fromObject = function fromObject(obj, hostCredentials) {
    if (!hostCredentials) {
        throw new Error("Credentials required for NextcloudDatasource instantiation");
    }
    if (obj.type === "nextcloud") {
        return new NextcloudDatasource(obj.endpoint, obj.path, hostCredentials);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

NextcloudDatasource.fromString = function fromString(str, hostCredentials) {
    return NextcloudDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("nextcloud", NextcloudDatasource);

module.exports = NextcloudDatasource;
