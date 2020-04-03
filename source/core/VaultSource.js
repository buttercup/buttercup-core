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
const { initialiseShares } = require("../myButtercup/sharing.js");
const VaultComparator = require("./VaultComparator.js");

const DEFAULT_COLOUR = "#000000";
const DEFAULT_ORDER = 1000;

class VaultSource extends EventEmitter {
    static STATUS_LOCKED = "locked";
    static STATUS_PENDING = "pending";
    static STATUS_UNLOCKED = "unlocked";

    static rehydrate(dehydratedString) {}

    constructor(name, type, credentialsString, config = {}) {
        super();
        const { colour = DEFAULT_COLOUR, id = getUniqueID(), order = DEFAULT_ORDER } = config;
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
        this._shares = [];
        // Set other configuration items to properties
        this._id = id;
        this._name = name;
        this._type = type;
        this._colour = colour;
        this._order = order;
        // Parent reference
        this._vaultManager = null;
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

    /**
     * The datasource type
     * @type {String}
     * @memberof VaultSource
     * @readonly
     */
    get type() {
        return this._type;
    }

    set colour(newColour) {
        if (COLOUR_TEST.test(newColour) !== true) {
            throw new VError(`Failed setting colour: Invalid format (expected hex): ${newColour}`);
        }
        this._colour = newColour;
        this.emit("updated");
    }

    /**
     * Change the master vault password
     * @param {String} oldPassword The original/current password
     * @param {String} newPassword The new password to change to
     * @returns {Promise}
     * @memberof VaultSource
     */
    async changeMasterPassword(oldPassword, newPassword) {
        // @todo
    }

    canBeUpdated() {
        return this.status === VaultSource.STATUS_UNLOCKED && this._vault.format.dirty === false;
    }

    /**
     * Check if the source has an offline copy
     * @returns {Promise.<Boolean>} A promise which resolves with whether an offline
     *  copy is available or not
     * @memberof VaultSource
     */
    checkOfflineCopy() {
        return sourceHasOfflineCopy(this._vaultManager._cacheStorage, this.id);
    }

    dehydrate() {
        if (this.status === VaultSource.STATUS_PENDING) {
            return Promise.reject(new VError(`Failed dehydrating source: Source in pending state: ${this.id}`));
        }
        return this._enqueueStateChange(() => {
            const payload = {
                v: 2,
                id: this.id,
                name: this.name,
                type: this.type,
                status: VaultSource.STATUS_LOCKED,
                colour: this.colour,
                order: this.order,
                meta: {} // deprecated
            };
            return Promise.resolve()
                .then(() => {
                    if (this.status === VaultSource.STATUS_LOCKED) {
                        payload.credentials = this._credentials;
                        return payload;
                    }
                    return this._credentials.toSecureString().then(credentialsStr => {
                        payload.credentials = credentialsStr;
                        return payload;
                    });
                })
                .then(payload => JSON.stringify(payload))
                .catch(err => {
                    throw new VError(err, `Failed dehydrating source: ${this.id}`);
                });
        });
    }

    /**
     * Get offline content, if it exists
     * @returns {Promise.<String|null>} A promise a resolves with the content, or null
     *  if it doesn't exist
     * @memberof VaultSource
     */
    getOfflineContent() {
        return this.checkOfflineCopy().then(hasContent =>
            hasContent ? getSourceOfflineArchive(this._vaultManager._cacheStorage, this.id) : null
        );
    }

    /**
     * Detect whether the local archives (in memory) differ from their remote copies
     * Fetches the remote copies from their datasources and detects differences between
     * them and their local counterparts. Does not change/update the local items.
     * @returns {Promise.<Boolean>} A promise that resolves with a boolean - true if
     *      there are differences, false if there is not
     * @memberof VaultSource
     */
    localDiffersFromRemote() {
        if (this.status !== VaultSource.STATUS_UNLOCKED) {
            return Promise.reject(
                new VError(`Failed diffing source: Source not unlocked (${this.status}): ${this.id}`)
            );
        }
        if (typeof this._datasource.localDiffersFromRemote === "function") {
            return this._datasource.localDiffersFromRemote(this._credentials, this._vault.format.history);
        }
        if (this._datasource.type !== "text") {
            // Only clear if not a TextDatasource
            this._datasource.setContent("");
        }
        return this._datasource
            .load(this._credentials)
            .then(history => Vault.createFromHistory(history))
            .then(loadedItem => {
                const comparator = new VaultComparator(this._vault, loadedItem);
                return comparator.vaultsDiffer();
            });
    }

    async lock() {
        if (this.status !== VaultSource.STATUS_UNLOCKED) {
            throw new VError(`Failed locking source: Source in invalid state (${this.status}): ${this.id}`);
        }
        this._status = VaultSource.STATUS_PENDING;
        const currentCredentials = this._credentials;
        const currentVault = this._vault;
        const currentDatasource = this._datasource;
        await this._enqueueStateChange(async () => {
            try {
                const credentialsStr = await this._credentials.toSecureString();
                this._credentials = credentialsStr;
                this._datasource = null;
                this._vault = null;
                this._status = VaultSource.STATUS_LOCKED;
                const dehydratedStr = await this.dehydrate();
                this.emit("locked");
                return dehydratedStr;
            } catch (err) {
                this._credentials = currentCredentials;
                this._datasource = currentDatasource;
                this._vault = currentVault;
                this._status = VaultSource.STATUS_UNLOCKED;
                throw new VError(err, "Failed locking source");
            }
        });
    }

    /**
     * Merge remote contents
     * Detects differences between a local and a remote item, and merges the
     * two copies together.
     * @returns {Promise.<Vault>} A promise that resolves with the newly merged archive -
     *      This archive is automatically saved over the original local copy.
     * @memberof VaultSource
     */
    async mergeFromRemote() {
        if (this._datasource.type !== "text") {
            // Only clear if not a TextDatasource
            this._datasource.setContent("");
        }
        const history = await this._datasource.load(this._credentials);
        const stagedVault = Vault.createFromHistory(history);
        const comparator = new VaultComparator(this._vault, stagedVault);
        const differences = comparator.calculateDifferences();
        // only strip if there are multiple updates
        const stripDestructive = differences.secondary.length > 0;
        const newHistoryMain = stripDestructive ? stripDestructiveCommands(differences.original) : differences.original;
        const newHistoryStaged = stripDestructive
            ? stripDestructiveCommands(differences.secondary)
            : differences.secondary;
        const base = differences.common;
        const newVault = new Vault();
        // merge all history and execute on new vault
        base.concat(newHistoryStaged)
            .concat(newHistoryMain)
            .forEach(command => {
                newVault.format.execute(command);
            });
        newVault.format.dirty = false;
        this._vault = newVault;
        return newVault;
    }

    /**
     * Save the vault to the remote
     * @returns {Promise} A promise that resolves when saving has completed
     * @memberof VaultSource
     */
    save() {
        return this._enqueueStateChange(
            () =>
                this._datasource.save(this._vault.format.history, this._credentials).then(() => {
                    this._vault.format.dirty = false;
                }),
            /* stack */ "saving"
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
                    if (typeof offlineContent === "string") {
                        datasource.setContent(offlineContent);
                    }
                    datasource.on("updated", () => {
                        this.updateCredentialsFromDatasource();
                        this.emit("updated");
                    });
                    const defaultVault = Vault.createWithDefaults();
                    const loadWork = initialiseRemote
                        ? datasource.save(defaultVault.format.history, credentials).then(() => {
                              this._vault = defaultVault;
                          })
                        : datasource.load(credentials).then(decryptedContent => {
                              this._vault = Vault.createFromHistory(decryptedContent);
                          });

                    return loadWork
                        .then(() => {
                            if (storeOfflineCopy) {
                                // Store an offline copy for later use
                                return storeSourceOfflineCopy(
                                    this._vaultManager._cacheStorage,
                                    this.id,
                                    datasource._content
                                );
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
     * Update the vault
     * @returns {Promise} A promise that resolves once the update has
     *  completed
     * @memberof VaultSource
     */
    update({ skipDiff = false } = {}) {
        return this._enqueueStateChange(
            () =>
                (skipDiff ? Promise.resolve() : this.localDiffersFromRemote()).then(differs => {
                    if (differs) {
                        return this.mergeFromRemote();
                    }
                }),
            // @todo shares
            // .then(() => initialiseShares(this)),
            /* stack */ "updating"
        );
    }

    /**
     * Update the source credentials datasource records from the datasource on
     * the workspace
     * @memberof VaultSource
     */
    updateCredentialsFromDatasource() {
        if (this.status !== VaultSource.STATUS_UNLOCKED) {
            throw new VError(`Failed updating source credentials: Source is not unlocked: ${this.id}`);
        }
        const { masterPassword } = getCredentials(this._credentials.id);
        this._credentials = Credentials.fromCredentials(this._datasource.credentials, masterPassword);
    }

    _applyShares() {
        // @todo
        // this._shares.forEach(share => {
        //     if (!share.archiveHasAppliedShare(this.archive)) {
        //         share.applyToArchive(this.archive);
        //     }
        // });
    }

    _enqueueStateChange(cb, stack) {
        const args = stack ? [cb, undefined, stack] : [cb];
        return this._queue.channel("state").enqueue(...args);
    }

    _unloadShares() {
        const Format = this.vault.format.getFormat();
        const extractedShares = Format.extractSharesFromHistory(this.vault.format.history);
        // Reset archive history (without shares)
        const { base } = extractedShares;
        delete extractedShares.base;
        this.vault.format.clear();
        this.vault.format.execute(base);
        // Update share payloads
        Object.keys(extractedShares).forEach(shareID => {
            const share = this._shares.find(share => share.id === shareID);
            if (!share) {
                throw new Error(`Failed updating extracted share: No share found in workspace for ID: ${shareID}`);
            }
            share.updateHistory(extractedShares[shareID]);
        });
    }
}

module.exports = VaultSource;
