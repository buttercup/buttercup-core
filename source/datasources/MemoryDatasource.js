const TextDatasource = require("./TextDatasource.js");
const { fireInstantiationHandlers, registerDatasource } = require("./register.js");
const { getCredentials } = require("../credentials/channel.js");

const TYPE = "memory";

/**
 * Memory datasource for temporary storage
 * @augments TextDatasource
 * @memberof module:Buttercup
 */
class MemoryDatasource extends TextDatasource {
    /**
     * Constructor for the datasource
     * @param {Credentials} credentials The credentials instance with which to
     *  use to configure the datasource
     */
    constructor(credentials) {
        super(credentials);
        const { data: credentialData } = getCredentials(credentials.id);
        const { datasource: datasourceConfig } = credentialData;
        const { property } = datasourceConfig;
        this._store = global[property] = global[property] || {};
        this.type = TYPE;
        fireInstantiationHandlers(TYPE, this);
    }

    /**
     * Load from a global property
     * @param {Credentials} credentials The credentials for decryption
     * @returns {Promise.<LoadedVaultData>} A promise resolving with vault history
     * @memberof MemoryDatasource
     */
    load(credentials) {
        return Promise.resolve().then(() => {
            if (!this._store.vault) {
                throw new Error("No vault in memory");
            }
            this.setContent(this._store.vault);
            return super.load(credentials);
        });
    }

    /**
     * Save vault history memory
     * @param {Array.<String>} history The vault history to save
     * @param {Credentials} credentials The credentials to save with
     * @returns {Promise} A promise that resolves when saving is complete
     * @memberof MemoryDatasource
     */
    save(history, credentials) {
        return super.save(history, credentials).then(encrypted => {
            this._store.vault = encrypted;
        });
    }

    /**
     * Whether or not the datasource supports attachments
     * @returns {Boolean}
     * @memberof MemoryDatasource
     */
    supportsAttachments() {
        return true;
    }
}

registerDatasource(TYPE, MemoryDatasource);

module.exports = MemoryDatasource;
