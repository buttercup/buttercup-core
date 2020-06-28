const EventEmitter = require("eventemitter3");
const ChannelQueue = require("@buttercup/channel-queue");
const VError = require("verror");
const Vault = require("./Vault.js");
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
const { generateVaultInsights } = require("../insight/vault.js");
const AttachmentManager = require("../attachments/AttachmentManager.js");

const COLOUR_TEST = /^#([a-f0-9]{3}|[a-f0-9]{6})$/i;
const DEFAULT_COLOUR = "#000000";
const DEFAULT_ORDER = 1000;

function processDehydratedCredentials(credentialsString, masterPassword) {
    if (/^v1\n/.test(credentialsString)) {
        const [, sourceCredStr] = credentialsString.split("\n");
        return Credentials.fromSecureString(sourceCredStr, masterPassword);
    }
    return Credentials.fromSecureString(credentialsString, masterPassword);
}

/**
 * Vault source class for managing a single vault
 * within a vault manager
 * @augments EventEmitter
 * @memberof module:Buttercup
 */
class VaultSource extends EventEmitter {
    static STATUS_LOCKED = "locked";
    static STATUS_PENDING = "pending";
    static STATUS_UNLOCKED = "unlocked";

    /**
     * Rehydrate the vault source from a dehydrated state
     * @param {String} dehydratedString The dehydrated form of the vault source
     * @returns {VaultSource} A rehydrated instance
     * @memberof VaultSource
     * @static
     */
    static rehydrate(dehydratedString) {
        const target = JSON.parse(dehydratedString);
        let credentials = target.credentials;
        if (target.v !== 2) {
            const { sourceCredentials, archiveCredentials } = target;
            if (!sourceCredentials || !archiveCredentials) {
                throw new Error("Invalid legacy vault state: missing credentials");
            }
            credentials = `v1\n${sourceCredentials}\n${archiveCredentials}`;
        }
        const { id, name, type, colour = DEFAULT_COLOUR, order = DEFAULT_ORDER, meta = {} } = target;
        return new VaultSource(name, type, credentials, {
            id,
            colour,
            order,
            meta
        });
    }

    constructor(name, type, credentialsString, config = {}) {
        super();
        const { colour = DEFAULT_COLOUR, id = getUniqueID(), order = DEFAULT_ORDER, meta = {} } = config;
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
        this._meta = meta;
        // Parent reference
        this._vaultManager = null;
        // Attachments
        this._attachmentManager = null;
    }

    /**
     * The attachment manager
     * @type {AttachmentManager|null}
     * @memberof VaultSource
     * @readonly
     */
    get attachmentManager() {
        return this._attachmentManager;
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
     * Meta data
     * @type {Object}
     * @memberof VaultSource
     * @readonly
     */
    get meta() {
        return { ...this._meta };
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

    /**
     * Vault reference
     * @type {Vault|null}
     * @memberof VaultSource
     * @readonly
     */
    get vault() {
        return this._vault;
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
     * @param {Object=} meta Optional metadata
     * @returns {Promise}
     * @memberof VaultSource
     */
    async changeMasterPassword(oldPassword, newPassword, meta = {}) {
        if (oldPassword === newPassword) {
            throw new Error("New password cannot be the same as the previous one");
        } else if (!newPassword) {
            throw new Error("New password must be specified");
        }
        const datasourceSupportsChange = this._datasource.supportsChangePassword();
        const newMasterCreds = new Credentials(meta, newPassword);
        let wasLocked = false;
        if (this.status !== VaultSource.STATUS_UNLOCKED) {
            wasLocked = true;
            // Locked, so unlock
            await this.unlock(Credentials.fromPassword(oldPassword));
        } else {
            // Unlocked, so check password..
            const credentials = getCredentials(this._credentials.id);
            if (credentials.masterPassword !== oldPassword) {
                throw new Error("Old password does not match current unlocked instance value");
            }
            // ..and then update
            // await this.workspace.mergeFromRemote();
            await this.update();
        }
        // Check datasource is ready
        if (datasourceSupportsChange) {
            const isReady = await this._datasource.changePassword(newMasterCreds, /* preflight: */ true);
            if (!isReady) {
                throw new Error("Datasource not capable of changing password at this time");
            }
        }
        // Clear offline cache
        await storeSourceOfflineCopy(this._vaultManager._cacheStorage, this.id, null);
        // Change password
        const newCredentials = Credentials.fromCredentials(this._credentials, oldPassword);
        const newCreds = getCredentials(newCredentials.id);
        newCreds.masterPassword = newPassword;
        await this._updateVaultCredentials(newCredentials);
        // Re-lock if it was locked earlier
        if (wasLocked) {
            await this.lock();
        }
        // Change remote if supported
        if (datasourceSupportsChange) {
            await this._datasource.changePassword(newMasterCreds, /* preflight: */ false);
        }
    }

    /**
     * Check if the vault source can be updated
     * @returns {Boolean}
     * @memberof VaultSource
     */
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

    async dehydrate() {
        if (this.status === VaultSource.STATUS_PENDING) {
            throw new VError(`Failed dehydrating source: Source in pending state: ${this.id}`);
        }
        const payload = {
            v: 2,
            id: this.id,
            name: this.name,
            type: this.type,
            status: VaultSource.STATUS_LOCKED,
            colour: this.colour,
            order: this.order,
            meta: this.meta
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
            .then(({ Format, history }) => Vault.createFromHistory(history, Format))
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
        const currentAttachmentMgr = this._attachmentManager;
        await this._enqueueStateChange(async () => {
            try {
                const credentialsStr = await this._credentials.toSecureString();
                this._credentials = credentialsStr;
                this._datasource = null;
                this._vault = null;
                this._attachmentManager = null;
                this._status = VaultSource.STATUS_LOCKED;
                const dehydratedStr = await this.dehydrate();
                this.emit("locked");
                return dehydratedStr;
            } catch (err) {
                this._credentials = currentCredentials;
                this._datasource = currentDatasource;
                this._vault = currentVault;
                this._status = VaultSource.STATUS_UNLOCKED;
                this._attachmentManager = currentAttachmentMgr;
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
        const { Format, history } = await this._datasource.load(this._credentials);
        const stagedVault = Vault.createFromHistory(history, Format);
        const comparator = new VaultComparator(this._vault, stagedVault);
        const differences = comparator.calculateDifferences();
        // get format
        // const Format = this._vault.format.getFormat();
        // only strip if there are multiple updates
        const stripDestructive = differences.secondary.length > 0;
        const newHistoryMain = stripDestructive
            ? Format.prepareHistoryForMerge(differences.original)
            : differences.original;
        const newHistoryStaged = stripDestructive
            ? Format.prepareHistoryForMerge(differences.secondary)
            : differences.secondary;
        const base = differences.common;
        const newVault = new Vault(Format);
        newVault.format.clear();
        // merge all history and execute on new vault
        // @todo use format to do this
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
     * Save the vault to the remote, ensuring that it's first merged and
     * updated to prevent conflicts or overwrites.
     * @returns {Promise}
     * @memberof VaultSource
     */
    async save() {
        await this._enqueueStateChange(async () => {
            if (await this.localDiffersFromRemote()) {
                await this.mergeFromRemote();
            }
            await this._datasource.save(this._vault.format.history, this._credentials);
            this._vault.format.dirty = false;
            await this._updateInsights();
        }, /* stack */ "saving");
    }

    supportsAttachments() {
        if (this.status !== VaultSource.STATUS_UNLOCKED) return false;
        return this._datasource.supportsAttachments();
    }

    async unlock(vaultCredentials, config = {}) {
        if (!Credentials.isCredentials(vaultCredentials)) {
            throw new VError(`Failed unlocking source: Invalid credentials passed to source: ${this.id}`);
        }
        const { initialiseRemote = false, loadOfflineCopy = false, storeOfflineCopy = true } = config;
        if (this.status !== VaultSource.STATUS_LOCKED) {
            throw new VError(`Failed unlocking source: Source in invalid state (${this.status}): ${this.id}`);
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
                    return processDehydratedCredentials(this._credentials, masterPassword);
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
                        this._waitNonPending()
                            .then(async () => {
                                if (this.status === VaultSource.STATUS_UNLOCKED) {
                                    await this._updateCredentialsFromDatasource();
                                }
                                this.emit("updated");
                            })
                            .catch(err => {
                                console.error(`Error updating datasource credentials for vault: ${this.id}`, err);
                            });
                    });
                    const defaultVault = Vault.createWithDefaults();
                    const loadWork = initialiseRemote
                        ? datasource.save(defaultVault.format.history, credentials).then(() => {
                              this._vault = defaultVault;
                          })
                        : datasource.load(credentials).then(({ Format, history }) => {
                              this._vault = Vault.createFromHistory(history, Format);
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
                            if (loadOfflineCopy) {
                                // Flag the format as read-only
                                this.vault.format._readOnly = true;
                            }
                        })
                        .then(() => {
                            this._status = VaultSource.STATUS_UNLOCKED;
                            this.emit("unlocked");
                            this._attachmentManager = new AttachmentManager(
                                this,
                                Credentials.fromCredentials(credentials, masterPassword)
                            );
                        });
                })
                .catch(err => {
                    this._status = VaultSource.STATUS_LOCKED;
                    this._vault = null;
                    this._datasource = null;
                    this._credentials = originalCredentials;
                    this._attachmentManager = null;
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
     * Write the vault to the remote
     * - This does not perform any merging or sync checks, but simply
     * writes the vault contents to the remote, overwriting whatever
     * was there before.
     * @returns {Promise} A promise that resolves when saving has completed
     * @memberof VaultSource
     */
    async write() {
        await this._enqueueStateChange(async () => {
            await this._datasource.save(this._vault.format.history, this._credentials);
            this._vault.format.dirty = false;
            await this._updateInsights();
        }, /* stack */ "saving");
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

    async _updateCredentialsFromDatasource() {
        if (this.status !== VaultSource.STATUS_UNLOCKED) {
            throw new VError(`Failed updating source credentials: Source is not unlocked: ${this.id}`);
        }
        const { masterPassword } = getCredentials(this._credentials.id);
        this._credentials = Credentials.fromCredentials(this._datasource.credentials, masterPassword);
    }

    async _updateInsights() {
        if (this.status !== VaultSource.STATUS_UNLOCKED) {
            throw new VError(`Failed updating vault insights: Source is not unlocked: ${this.id}`);
        }
        if (!this._datasource.updateInsights) return;
        const insights = generateVaultInsights(this.vault);
        await this._datasource.updateInsights(insights);
    }

    async _updateVaultCredentials(newCredentials) {
        if (this.status !== VaultSource.STATUS_UNLOCKED) {
            throw new VError(`Failed updating vault credentials: Source is not unlocked: ${this.id}`);
        }
        this._credentials = newCredentials;
        await this.write();
    }

    /**
     * Wait for the source to enter a non-pending state
     * @protected
     * @returns {Promise}
     * @memberof VaultSource
     */
    _waitNonPending() {
        return new Promise(resolve => {
            if (this.status !== VaultSource.STATUS_PENDING) return resolve();
            const handleChange = () => {
                this.removeListener("unlocked", handleChange);
                this.removeListener("locked", handleChange);
                resolve();
            };
            this.on("unlocked", handleChange);
            this.on("locked", handleChange);
        });
    }
}

module.exports = VaultSource;
