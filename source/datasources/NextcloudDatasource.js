const OwnCloudDatasource = require("./OwnCloudDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./DatasourceAdapter.js");

/**
 * Datasource for Nextcloud archives
 * @augments OwnCloudDatasource
 */
class NextcloudDatasource extends OwnCloudDatasource {
    /**
     * Constructor for the datasource
     * @see OwnCloudDatasource
     * @memberof NextcloudDatasource
     */
    constructor(...args) {
        super(...args);
        fireInstantiationHandlers("nextcloud", this);
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     * @memberof NextcloudDatasource
     */
    toObject() {
        return {
            type: "nextcloud",
            endpoint: this._originalURL,
            path: this.path
        };
    }
}

/**
 * Create a new instance from an object
 * @param {Object} obj The object representation of an instance
 * @param {Credentials=} hostCredentials The remote server credentials
 * @static
 * @returns {NextcloudDatasource} A new instance
 * @memberof NextcloudDatasource
 * @throws {Error} Throws for an invalid type specification
 */
NextcloudDatasource.fromObject = function fromObject(obj, hostCredentials) {
    if (obj.type === "nextcloud") {
        return new NextcloudDatasource(obj.endpoint, obj.path, hostCredentials);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

/**
 * Create a new instance from a string
 * @param {String} str The string representation of an instance
 * @param {Credentials=} hostCredentials The remote server credentials
 * @static
 * @memberof NextcloudDatasource
 * @returns {NextcloudDatasource} A new instance
 * @throws {Error} Throws for an invalid type specification
 */
NextcloudDatasource.fromString = function fromString(str, hostCredentials) {
    return NextcloudDatasource.fromObject(JSON.parse(str), hostCredentials);
};

registerDatasource("nextcloud", NextcloudDatasource);

module.exports = NextcloudDatasource;
