"use strict";

const VError = require("verror");
const AsyncEventEmitter = require("./events/AsyncEventEmitter.js");
const createCredentials = require("./credentials.js");
const credentialsToSource = require("./archiveManagement/marshalling.js").credentialsToSource;
const getUniqueID = require("../tools/encoding.js").getUniqueID;
const createDebug = require("../tools/debug.js");
const MemoryStorageInterface = require("./storage/MemoryStorageInterface.js");

const debug = createDebug("archive-manager");

const STORAGE_KEY_PREFIX = "bcup_archivemgr_";
const STORAGE_KEY_PREFIX_TEST = /^bcup_archivemgr_[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

const SourceStatus = {
    LOCKED: "locked",
    UNLOCKED: "unlocked",
    PENDING: "pending"
};

/**
 * Status of a source: locked/unlocked/pending
 * @typedef {String} ArchiveManagerSourceStatus
 */

/**
 * @typedef {Object} UnlockedArchiveManagerSource
 * @property {String} name - The name of the source
 * @property {String} id - The ID of the source (UUID)
 * @property {ArchiveManagerSourceStatus} status - The current status of the source
 * @property {String} type - The type of source (eg. dropbox/mybuttercup etc.)
 * @property {Workspace} workspace - The archive's workspace
 * @property {Credentials} sourceCredentials - Credentials for the remote datasource
 * @property {Credentials} archiveCredentials - Credentials for unlocking the archive
 */

/**
 * @typedef {Object} LockedArchiveManagerSource
 * @property {String} name - The name of the source
 * @property {String} id - The ID of the source (UUID)
 * @property {ArchiveManagerSourceStatus} status - The current status of the source
 * @property {String} type - The type of source (eg. dropbox/mybuttercup etc.)
 * @property {String} sourceCredentials - Encrypted credentials for the remote datasource
 * @property {String} archiveCredentials - Encrypted credentials for unlocking the archive
 */

/**
 * Archive manager for managing archives and connections to sources
 */
class ArchiveManager extends AsyncEventEmitter {
    /**
     * Constructor for ArchiveManager
     * @param {StorageInterface=} storageInterface An optional StorageInterface instance. Defaults
     *  to a new MemoryStorageInterface instance if not provided
     */
    constructor(storageInterface = new MemoryStorageInterface()) {
        super();
        debug("new manager");
        this._storageInterface = storageInterface;
        this._sources = [];
    }

    /**
     * All sources handled by the manager
     * @type {Array.<UnlockedArchiveManagerSource|LockedArchiveManagerSource>}
     */
    get sources() {
        return this._sources;
    }

    /**
     * Reference to the storage interface
     * @type {StorageInterface}
     */
    get storageInterface() {
        return this._storageInterface;
    }

    /**
     * Array of unlocked sources
     * @type {Array.<UnlockedArchiveManagerSource|LockedArchiveManagerSource>}
     */
    get unlockedSources() {
        return this.sources.filter(source => source.status === SourceStatus.UNLOCKED);
    }

    /**
     * Add a new source
     * @param {String} name The name of the source
     * @param {Credentials} sourceCredentials Archive source credentials (remote system)
     * @param {Credentials} archiveCredentials Credentials for unlocking the archive
     * @param {Boolean=} initialise Optionally initialise a blank archive (defaults to false)
     * @returns {Promise.<String>} A promise that resolves with the source's new ID
     */
    addSource(name, sourceCredentials, archiveCredentials, initialise = false) {
        debug(`add source: ${name}`);
        return credentialsToSource(sourceCredentials, archiveCredentials, initialise)
            .then(sourceInfo => {
                const id = getUniqueID();
                const sourceMajorInfo = {
                    id,
                    name,
                    status: SourceStatus.UNLOCKED,
                    type: sourceCredentials.type
                };
                this._sources.push(Object.assign(sourceInfo, sourceMajorInfo));
                return this.dehydrateSource(id).then(() => {
                    debug("added source");
                    this.emit("sourceAdded", sourceMajorInfo);
                    return id;
                });
            })
            .catch(function __handleAddSourceError(err) {
                throw new VError(err, "Failed adding source");
            });
    }

    /**
     * Dehydrate a source and write it to storage
     * Does not lock the source
     * @param {String} id The ID of the source to lock
     * @returns {Promise} A promise that resolves once dehydration has completed
     */
    dehydrateSource(id) {
        debug(`dehydrate source: ${id}`);
        let source;
        return Promise.resolve()
            .then(() => {
                const index = this.indexOfSource(id);
                if (index < 0) {
                    throw new VError("Source not found for ID");
                }
                source = this.sources[index];
                if (source.status === SourceStatus.LOCKED) {
                    debug("source already locked");
                    return source;
                } else if (source.status === SourceStatus.UNLOCKED) {
                    debug("secure credentials");
                    return Promise.all([
                        source.sourceCredentials.toSecureString(source.archiveCredentials.password),
                        source.archiveCredentials.toSecureString(source.archiveCredentials.password)
                    ]).then(([encParentCreds, encArchiveCreds] = []) => ({
                        id: source.id,
                        name: source.name,
                        type: source.type,
                        status: SourceStatus.LOCKED,
                        sourceCredentials: encParentCreds,
                        archiveCredentials: encArchiveCreds
                    }));
                } else {
                    throw new VError(`Source state invalid: ${source.status}`);
                }
            })
            .then(lockedSource =>
                this.storageInterface.setValue(`${STORAGE_KEY_PREFIX}${lockedSource.id}`, JSON.stringify(lockedSource))
            )
            .then(() => {
                debug(`source dehydrated: ${id}`);
                this.emit("sourceDehydrated", {
                    id: source.id,
                    name: source.name,
                    type: source.type,
                    status: SourceStatus.LOCKED
                });
            })
            .catch(function __handleDehydrateError(err) {
                throw new VError(err, `Failed dehydrating source with ID: ${id}`);
            });
    }

    /**
     * Get an index for a source with an ID
     * @param {String} id The ID of the source
     * @returns {Number} The index or -1 if not found
     */
    indexOfSource(id) {
        return this.sources.findIndex(source => source.id === id);
    }

    /**
     * Lock a source by its ID
     * @param {String} id The ID of the source
     * @returns {Promise} A promise that resolves once the source is locked
     */
    lock(id) {
        debug(`lock source: ${id}`);
        let source;
        return Promise.resolve()
            .then(() => {
                const index = this.indexOfSource(id);
                if (index < 0) {
                    throw new VError("Source not found for ID");
                }
                source = this.sources[index];
                if (source.status !== SourceStatus.UNLOCKED) {
                    throw new VError(`Source state invalid: ${source.status}`);
                }
                source.status = SourceStatus.PENDING;
            })
            .then(() =>
                Promise.all([
                    source.sourceCredentials.toSecureString(source.archiveCredentials.password),
                    source.archiveCredentials.toSecureString(source.archiveCredentials.password)
                ])
            )
            .then(([encParentCreds, encArchiveCreds] = []) => {
                this._replace(source.id, {
                    id: source.id,
                    name: source.name,
                    type: source.type,
                    status: SourceStatus.LOCKED,
                    sourceCredentials: encParentCreds,
                    archiveCredentials: encArchiveCreds
                });
                return this.dehydrateSource(source.id);
            })
            .then(() => {
                debug("source locked");
                this.emit("sourceLocked", {
                    id: source.id,
                    name: source.name,
                    type: source.type,
                    status: SourceStatus.LOCKED
                });
            })
            .catch(function __handleLockError(err) {
                if (source) {
                    // reset status
                    source.status = SourceStatus.UNLOCKED;
                }
                throw new VError(err, `Failed to lock source with ID: ${id}`);
            });
    }

    /**
     * Rehydrate all sources from storage
     * @returns {Promise} A promise that resolves once all sources have been rehydrated
     */
    rehydrate() {
        debug("rehydrate sources");
        this._sources = [];
        return this.storageInterface
            .getAllKeys()
            .then(keys =>
                Promise.all(
                    keys.filter(key => STORAGE_KEY_PREFIX_TEST.test(key)).map(key =>
                        this.storageInterface
                            .getValue(key)
                            .then(JSON.parse)
                            .then(lockedSource => {
                                this.sources.push(lockedSource);
                                this.emit("sourceRehydrated", {
                                    id: lockedSource.id,
                                    name: lockedSource.name,
                                    status: SourceStatus.LOCKED,
                                    type: lockedSource.type
                                });
                            })
                            .catch(function __handleDehydratedReadError(err) {
                                throw new VError(err, `Failed rehydrating item from storage with key: ${key}`);
                            })
                    )
                )
            )
            .then(() => {
                debug("sources rehydrated");
            })
            .catch(function __handleRehydrateError(err) {
                throw new VError(err, "Failed rehydrating sources");
            });
    }

    /**
     * Remove a source
     * @param {String} id The source ID
     * @returns {Promise} A promise that resolves once the source has been removed
     */
    remove(id) {
        debug(`remove source: ${id}`);
        let source, sourceIndex;
        return Promise.resolve()
            .then(() => {
                sourceIndex = this.indexOfSource(id);
                if (sourceIndex < 0) {
                    throw new VError("Source not found for ID");
                }
                source = this.sources[sourceIndex];
                return this.storageInterface.removeKey(`${STORAGE_KEY_PREFIX}${source.id}`);
            })
            .then(() => {
                this.emit("sourceRemoved", {
                    id: source.id
                });
                this.sources.splice(sourceIndex, 1);
                debug("source removed");
            })
            .catch(function __handleRemoveError(err) {
                throw new VError(err, "Failed removing sources");
            });
    }

    /**
     * Rename an archive
     * @param {String} id The source ID
     * @param {String} newName The new name for the source
     * @throws {VError} Throws if the source ID does not exist
     */
    rename(id, newName) {
        debug(`rename source (${id}): ${newName}`);
        const sourceIndex = this.indexOfSource(id);
        if (sourceIndex >= 0) {
            const originalName = this.sources[sourceIndex].name;
            this.sources[sourceIndex].name = newName;
            this.emit("sourceRenamed", {
                id,
                originalName,
                newName
            });
        } else {
            throw new VError(`Failed renaming source: Source with ID not found: ${id}`);
        }
    }

    /**
     * Unlock a source
     * @param {String} id The ID of the source to unlock
     * @param {String} masterPassword The password to unlock the source
     * @returns {Promise} A promise that resolves once the source is unlocked
     */
    unlock(id, masterPassword) {
        debug("unlock source");
        let source;
        return Promise.resolve()
            .then(() => {
                const index = this.indexOfSource(id);
                if (index < 0) {
                    throw new VError("Source not found for ID");
                }
                source = this.sources[index];
                if (source.status !== SourceStatus.LOCKED) {
                    throw new VError(`Source state invalid: ${source.status}`);
                }
                source.status = SourceStatus.PENDING;
                return Promise.all([
                    createCredentials.fromSecureString(source.sourceCredentials, masterPassword),
                    createCredentials.fromSecureString(source.archiveCredentials, masterPassword)
                ]);
            })
            .then(([sourceCredentials, archiveCredentials] = []) => {
                return credentialsToSource(sourceCredentials, archiveCredentials, /* initialise */ false)
                    .then(sourceInfo => {
                        this._replace(
                            source.id,
                            Object.assign(sourceInfo, {
                                id: source.id,
                                name: source.name,
                                status: SourceStatus.UNLOCKED,
                                type: sourceCredentials.type
                            })
                        );
                    })
                    .catch(function __handleCredentialsMapError(err) {
                        throw new VError(err, "Failed mapping credentials to a source");
                    });
            })
            .then(() => {
                debug("source unlocked");
                this.emit("sourceUnlocked", {
                    id: source.id,
                    name: source.name,
                    status: SourceStatus.UNLOCKED,
                    type: source.type
                });
            })
            .catch(function __handleUnlockError(err) {
                if (source && source.status) {
                    // reset status
                    source.status = SourceStatus.LOCKED;
                }
                throw new VError(err, `Failed to unlock source with ID: ${id}`);
            });
    }

    /**
     * Update the master credentials for an archive source
     * @param {String} sourceID The source ID
     * @param {Credentials} masterCredentials The new credentials to use
     * @throws {VError} Throws if the source is not unlocked
     * @throws {VError} Throws if no source is found for the provided ID
     */
    updateArchiveCredentials(sourceID, masterCredentials) {
        debug(`update archive credentials: ${sourceID}`);
        return Promise.resolve().then(() => {
            const sourceIndex = this.indexOfSource(sourceID);
            if (sourceIndex >= 0) {
                const source = this.sources[sourceIndex];
                if (source.status !== SourceStatus.UNLOCKED) {
                    throw new VError(`Failed updating archive credentials: Source is not unlocked: ${sourceID}`);
                }
                // First update the credentials stored here
                Object.assign(source, {
                    archiveCredentials: masterCredentials
                });
                // Then update the credentials in the workspace
                source.workspace.updatePrimaryCredentials(masterCredentials);
                // Finally, dehydrate the source to save changes in the manager
                return this.dehydrateSource(sourceID);
            } else {
                throw new VError(`Failed updating archive credentials: Source with ID not found: ${sourceID}`);
            }
        });
    }

    /**
     * Replace a source by its ID
     * @protected
     * @param {String} id The ID of the source
     * @param {UnlockedArchiveManagerSource|LockedArchiveManagerSource} source The source to replace it with
     */
    _replace(id, source) {
        const index = this.indexOfSource(id);
        if (index < 0) {
            throw new VError(`Failed replacing source: Source not found`);
        }
        this.sources[index] = source;
    }
}

ArchiveManager.SourceStatus = SourceStatus;

module.exports = ArchiveManager;
