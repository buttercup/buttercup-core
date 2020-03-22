const EventEmitter = require("eventemitter3");
const ChannelQueue = require("@buttercup/channel-queue");
const VError = require("verror");
const Vault = require("./Vault.js");
const MemoryStorageInterface = require("../storage/MemoryStorageInterface.js");
const Credentials = require("../credentials/Credentials.js");
const { getCredentials } = require("../credentials/channel.js");
const { getUniqueID } = require("../tools/encoding.js");
const {
    getSourceOfflineArchive,
    sourceHasOfflineCopy,
    storeSourceOfflineCopy
} = require("../tools/vaultManagement.js");
const { credentialsToDatasource } = require("../datasources/register.js");

const DEFAULT_COLOUR = "#000000";
const DEFAULT_ORDER = 1000;

class VaultSource extends EventEmitter {
    static STATUS_LOCKED = "locked";
    static STATUS_PENDING = "pending";
    static STATUS_UNLOCKED = "unlocked";

    constructor(name, credentialsString, config = {}) {
        const {
            cacheStorage = new MemoryStorageInterface(),
            colour = DEFAULT_COLOUR,
            id = getUniqueID(),
            order = DEFAULT_ORDER,
            sourceStorage = new MemoryStorageInterface()
        } = config;
        // Queue for managing state transitions
        this._queue = new ChannelQueue();
        // Credentials state and status go hand-in-hand:
        //  - Locked = credentials string
        //  - Unlocked = credentials instance
        this._credentials = credentialsString;
        this._status = VaultSource.STATUS_LOCKED;
        // Set standard state
        this._datasource = null;
        this._vault = null;
        // Set other configuration items to properties
        this._id = id;
        this._colour = colour;
        this._order = order;
        this._cacheStorage = cacheStorage;
        this._sourceStorage = sourceStorage;
    }

    /**
     * Source colour
     * @type {String}
     * @memberof VaultSource
     */
    get colour() {
        return this._colour;
    }

    /**
     * Source ID
     * @type {String}
     * @memberof VaultSource
     * @readonly
     */
    get id() {
        return this._id;
    }

    /**
     * Source name
     * @type {String}
     * @memberof VaultSource
     * @readonly
     */
    get name() {
        return this._name;
    }

    /**
     * Source status
     * @type {String}
     * @memberof VaultSource
     * @readonly
     */
    get status() {
        return this._status;
    }

    set colour(newColour) {
        if (COLOUR_TEST.test(newColour) !== true) {
            throw new VError(`Failed setting colour: Invalid format (expected hex): ${newColour}`);
        }
        this._colour = newColour;
        this.emit("sourceColourUpdated", this.description);
    }

    /**
     * Check if the source has an offline copy
     * @returns {Promise.<Boolean>} A promise which resolves with whether an offline
     *  copy is available or not
     * @memberof VaultSource
     */
    checkOfflineCopy() {
        if (!this._cacheStorage) {
            // No storage interface, so no offline copy
            return Promise.resolve(false);
        }
        return sourceHasOfflineCopy(this._cacheStorage, this.id);
    }

    /**
     * Get offline content, if it exists
     * @returns {Promise.<String|null>} A promise a resolves with the content, or null
     *  if it doesn't exist
     * @memberof VaultSource
     */
    getOfflineContent() {
        return this.checkOfflineCopy().then(hasContent =>
            hasContent ? getSourceOfflineArchive(this._cacheStorage, this.id) : null
        );
    }

    unlock(vaultCredentials, config = {}) {
        const { initialiseRemote = false, loadOfflineCopy = true, storeOfflineCopy = true } = config;
        if (this.status !== VaultSource.STATUS_LOCKED) {
            return Promise.reject(
                new VError(`Failed unlocking source: Source in invalid state (${this.status}): ${this.id}`)
            );
        }
        const { masterPassword } = getCredentials(vaultCredentials.id);
        const originalCredentials = this._credentials;
        this._status = VaultSource.STATUS_PENDING;
        return this._enqueueStateChange(() => {
            let offlineContent = null;
            return this.getOfflineContent()
                .then(availableOfflineContent => {
                    if (availableOfflineContent && loadOfflineCopy) {
                        offlineContent = availableOfflineContent;
                    }
                    return Credentials.fromSecureString(this._credentials, masterPassword);
                })
                .then(newCredentials => {
                    const credentials = (this._credentials = newCredentials);
                    const datasource = (this._datasource = credentialsToDatasource(
                        Credentials.fromCredentials(credentials, masterPassword)
                    ));
                    datasource.on("updated", () => {
                        this.updateCredentialsFromDatasource();
                        this.emit("updated");
                    });
                    return datasource
                        .load(credentials)
                        .then(decryptedContent => {
                            this._vault = Vault.createFromHistory(decryptedContent);
                            if (storeOfflineCopy) {
                                // Store an offline copy for later use
                                return storeSourceOfflineCopy(this._cacheStorage, this.id, datasource._content);
                            }
                        })
                        .then(() => {
                            this._status = VaultSource.STATUS_UNLOCKED;
                            this.emit("unlocked");
                        });
                })
                .catch(err => {
                    this._status = VaultSource.STATUS_LOCKED;
                    this._vault = null;
                    this._datasource = null;
                    this._credentials = originalCredentials;
                    throw new VError(err, "Failed unlocking source");
                });
        });
    }

    /**
     * Update the source credentials datasource records from the datasource on
     * the workspace
     * @memberof VaultSource
     */
    updateCredentialsFromDatasource() {
        if (this.status !== Status.UNLOCKED) {
            throw new VError(`Failed updating source credentials: Source is not unlocked: ${this.id}`);
        }
        const { masterPassword } = getCredentials(this._credentials.id);
        this._credentials = Credentials.fromCredentials(this._datasource.credentials, masterPassword);
    }

    _enqueueStateChange(cb) {
        return this._queue.channel("state").enqueue(cb);
    }
}

module.exports = VaultSource;
