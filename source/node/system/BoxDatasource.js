const WebDAVDatasource = require("./WebDAVDatasource.js");

const registerDatasource = require("./DatasourceAdapter.js").registerDatasource;

/**
 * Datasource for Box archives
 * @augments WebDAVDatasource
 */
class BoxDatasource extends WebDAVDatasource {
    /**
     * Datasource for Box connections
     * @param {String} resourcePath The file path
     * @param {Credentials} credentials The credentials (username/password) for Box
     */
    constructor(resourcePath, credentials) {
        const boxURL = "https://dav.box.com/dav/";
        super(boxURL, resourcePath, credentials);
        this._toObjectRefs = { resourcePath };
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     */
    toObject() {
        return {
            type: "box",
            path: this._toObjectRefs.resourcePath
        };
    }
}

BoxDatasource.fromObject = function fromObject(obj, hostCredentials) {
    if (!hostCredentials) {
        throw new Error("Credentials required for BoxDatasource instantiation");
    }
    if (obj.type === "box") {
        return new BoxDatasource(obj.path, hostCredentials);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

BoxDatasource.fromString = function fromString(str, hostCredentials) {
    return BoxDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("box", BoxDatasource);

module.exports = BoxDatasource;
