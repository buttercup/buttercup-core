const fs = require("fs");
const pify = require("pify");
const TextDatasource = require("./TextDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./DatasourceAdapter.js");

/**
 * File datasource for loading and saving files
 * @augments TextDatasource
 */
class FileDatasource extends TextDatasource {
    /**
     * Constructor for the file datasource
     * @param {string} filename The filename to load and save
     */
    constructor(filename) {
        super();
        this._filename = filename;
        this.readFile = pify(fs.readFile);
        this.writeFile = pify(fs.writeFile);
        fireInstantiationHandlers("file", this);
    }

    /**
     * The file path
     * @type {String}
     * @memberof FileDatasource
     */
    get path() {
        return this._filename;
    }

    /**
     * Load from the filename specified in the constructor using a password
     * @param {Credentials} credentials The credentials for decryption
     * @returns {Promise<Array.<String>>} A promise resolving with archive history
     * @memberof FileDatasource
     */
    load(credentials) {
        return this.hasContent
            ? super.load(credentials)
            : this.readFile(this.path, "utf8").then(contents => {
                  this.setContent(contents);
                  return super.load(credentials);
              });
    }

    /**
     * Save archive history to a file
     * @param {Array.<String>} history The archive history to save
     * @param {Credentials} credentials The credentials to save with
     * @returns {Promise} A promise that resolves when saving is complete
     * @memberof FileDatasource
     */
    save(history, credentials) {
        return super.save(history, credentials).then(encrypted => this.writeFile(this.path, encrypted));
    }

    /**
     * Whether or not the datasource supports bypassing remote fetch operations
     * @returns {Boolean} True if content can be set to bypass fetch operations,
     *  false otherwise
     * @memberof FileDatasource
     */
    supportsRemoteBypass() {
        return true;
    }

    /**
     * Output the datasource as an object
     * @returns {Object} An object describing the datasource
     * @memberof FileDatasource
     */
    toObject() {
        return Object.assign(super.toObject(), {
            type: "file",
            path: this._filename
        });
    }
}

/**
 * Create an instance from an object
 * @param {Object} obj The object representation of a datasource
 * @returns {FileDatasource} A new instance
 * @throws {Error} Throws for an invalid type specification
 * @memberof FileDatasource
 * @static
 */
FileDatasource.fromObject = function fromObject(obj) {
    if (obj.type === "file") {
        return new FileDatasource(obj.path);
    }
    throw new Error(`Unknown or invalid type: ${obj.type}`);
};

/**
 * Create an instance from a string
 * @param {String} str The string representation
 * @returns {FileDatasource} A new instance
 * @memberof FileDatasource
 * @static
 * @see FileDatasource.fromObject
 */
FileDatasource.fromString = function fromString(str) {
    return FileDatasource.fromObject(JSON.parse(str));
};

registerDatasource("file", FileDatasource);

module.exports = FileDatasource;
