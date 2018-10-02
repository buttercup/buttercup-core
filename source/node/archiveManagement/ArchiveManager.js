const VError = require("verror");
const ChannelQueue = require("@buttercup/channel-queue");
const isPromise = require("is-promise");
const AsyncEventEmitter = require("../events/AsyncEventEmitter.js");
const MemoryStorageInterface = require("../storage/MemoryStorageInterface.js");
const ArchiveSource = require("./ArchiveSource.js");

const DEFAULT_AUTO_UPDATE_DELAY = 1000 * 60 * 2.5; // 2.5 mins
const NOOP = () => {};
const STORAGE_KEY_PREFIX = "bcup_archivemgr_";
const STORAGE_KEY_PREFIX_TEST = /^bcup_archivemgr_[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

/**
 * Archive manager class
 * @augments AsyncEventEmitter
 */
class ArchiveManager extends AsyncEventEmitter {
    /**
     * Constructor for the archive manager
     * @param {StorageInterface=} storageInterface The storage interface to use -
     *  defaults to storing in memory
     */
    constructor(storageInterface = new MemoryStorageInterface()) {
        super();
        this._storageInterface = storageInterface;
        this._sources = [];
        this._queue = new ChannelQueue();
        this._autoUpdateTimer = null;
        this._autoUpdateDelay = null;
    }

    /**
     * Detect if auto-updating is enabled
     * @type {Boolean}
     * @memberof ArchiveManager
     * @readonly
     */
    get autoUpdateEnabled() {
        return this._autoUpdateDelay && this._autoUpdateDelay > 0;
    }

    /**
     * The next available source order
     * @type {Number}
     * @memberof ArchiveManager
     * @readonly
     */
    get nextSourceOrder() {
        return this.sources.length;
    }

    /**
     * The current sources
     * @type {Array.<ArchiveSource>}
     * @memberof ArchiveManager
     * @readonly
     */
    get sources() {
        return this._sources;
    }

    /**
     * All sources, listed by their descriptions
     * @type {Array.<ArchiveSourceDescription>}
     * @memberof ArchiveManager
     * @readonly
     */
    get sourcesList() {
        return this.sources.map(source => source.description);
    }

    /**
     * The current storage interface
     * @type {StorageInterface}
     * @memberof ArchiveManager
     * @readonly
     */
    get storageInterface() {
        return this._storageInterface;
    }

    /**
     * All unlocked sources
     * @type {Array.<ArchiveSource>}
     * @memberof ArchiveManager
     * @readonly
     */
    get unlockedSources() {
        return this.sources.filter(source => source.status === ArchiveSource.Status.UNLOCKED);
    }

    /**
     * All auto-updateable sources
     * @type {Array.<ArchiveSource>}
     * @memberof ArchiveManager
     * @readonly
     */
    get updateableSources() {
        return this.sources.filter(source => source.canBeUpdated);
    }

    /**
     * Add a source to the manager
     * @param {ArchiveSource} archiveSource The source to add
     * @param {Object=} obj Optional configuration
     * @param {Boolean=} obj.emitUpdated - Whether or not to emit an updated event (default: true)
     * @param {Number=} obj.order - Override the order of the new source
     * @memberof ArchiveManager
     */
    addSource(archiveSource, { emitUpdated = true, order = this.nextSourceOrder } = {}) {
        const existing = this.sources.find(source => source.id === archiveSource.id);
        if (!existing) {
            return this._enqueueStateChange(() => {
                // Store the source
                this.sources.push(archiveSource);
                archiveSource._storageInterface = this.storageInterface;
                // Configure the order
                archiveSource.order = order;
                // Emit an updated event for the source having been added
                if (emitUpdated) {
                    this._emitSourcesListUpdated();
                }
                // Attach event listeners
                const handleDetailsChange = (event, sourceDetails) => {
                    this.emit(event, sourceDetails);
                    this._emitSourcesListUpdated();
                };
                archiveSource.on("sourceLocked", details => handleDetailsChange("sourceLocked", details));
                archiveSource.on("sourceUnlocked", details => handleDetailsChange("sourceUnlocked", details));
                archiveSource.on("sourceColourUpdated", details => handleDetailsChange("sourceColourUpdated", details));
                return archiveSource
                    .dehydrate()
                    .then(dehydratedSource => this._storeDehydratedSource(archiveSource.id, dehydratedSource));
            });
        }
        return Promise.resolve();
    }

    /**
     * Dehydrate all sources and write them to storage
     * @returns {Promise} A promise that resolves once all sources have been dehydrated
     * @memberof ArchiveManager
     */
    dehydrate() {
        return this._enqueueStateChange(() => {
            return Promise.all(this.sources.map(source => this.dehydrateSource(source)));
        });
    }

    /**
     * Dehydrate a single archive source
     * @param {String} sourceID The ID of the source
     * @returns {Promise} A promise that resolves once the source has been dehydrated
     */
    dehydrateSource(sourceOrSourceID) {
        const source = typeof sourceOrSourceID === "string" ? this.getSourceForID(sourceOrSourceID) : sourceOrSourceID;
        return source.dehydrate().then(dehydratedSource => this._storeDehydratedSource(source.id, dehydratedSource));
    }

    /**
     * Get a source for an ID
     * @param {String} sourceID The source ID
     * @returns {ArchiveSource|null} The source with the matching ID or null if not found
     * @memberof ArchiveManager
     */
    getSourceForID(sourceID) {
        const source = this.sources.find(target => target.id && target.id === sourceID);
        return source || null;
    }

    /**
     * Wait for and interrupt state changes when auto-update is running
     * @returns {Promise} A promise that resolves when ready
     * @memberof ArchiveManager
     * @example
     *  archiveManager.interruptAutoUpdate(() => {
     *      // Do something with auto-updating paused
     *  });
     */
    interruptAutoUpdate(cb) {
        return this._enqueueStateChange(NOOP).then(() =>
            this._queue.channel("autoUpdateInterrupt").enqueue(() => {
                const enabled = this.autoUpdateEnabled;
                const delay = this._autoUpdateDelay;
                this.toggleAutoUpdating(false);
                const restoreAutoUpdating = () => {
                    this.toggleAutoUpdating(enabled, delay);
                };
                let retVal;
                try {
                    retVal = cb();
                } catch (err) {
                    restoreAutoUpdating();
                    throw err;
                }
                if (!isPromise(retVal)) {
                    restoreAutoUpdating();
                    return retVal;
                }
                return retVal
                    .then(res => {
                        restoreAutoUpdating();
                        return res;
                    })
                    .catch(err => {
                        restoreAutoUpdating();
                        throw err;
                    });
            })
        );
    }

    /**
     * Rehydrate sources from storage
     * @returns {Promise} A promise that resolves once rehydration has completed
     * @memberof ArchiveManager
     * @throws {VError} Rejects if rehydrating from storage fails
     */
    rehydrate() {
        return this.storageInterface
            .getAllKeys()
            .then(keys =>
                Promise.all(
                    keys.filter(key => STORAGE_KEY_PREFIX_TEST.test(key)).map(key =>
                        this.storageInterface
                            .getValue(key)
                            .then(dehydratedSource => ArchiveSource.rehydrate(dehydratedSource))
                            .then(source => this.addSource(source, { emitUpdated: false, order: source.order }))
                            .catch(function __handleDehydratedReadError(err) {
                                throw new VError(err, `Failed rehydrating item from storage with key: ${key}`);
                            })
                    )
                )
            )
            .then(() => {
                // Reorder all sources
                this.reorderSources();
                // We don't need to explicitly call for emitting an updated event,
                // as that will happen at the end of reordering.
            })
            .catch(err => {
                // Or after all failed
                this._emitSourcesListUpdated();
                throw new VError(err, "Failed rehydrating sources");
            });
    }

    /**
     * Remove a source from the storage
     * @param {String} sourceID The ID of the source to remove
     * @returns {Promise} A promise that resolves once the source has been removed
     * @memberof ArchiveManager
     */
    removeSource(sourceID) {
        return this._enqueueStateChange(() => {
            const sourceIndex = this.sources.findIndex(source => source.id === sourceID);
            if (sourceIndex === -1) {
                return Promise.reject(new VError(`Failed removing source: No source found for ID: ${sourceID}`));
            }
            const source = this.sources[sourceIndex];
            source.removeAllListeners();
            this.sources.splice(sourceIndex, 1);
            this._emitSourcesListUpdated();
            return this.storageInterface.removeKey(`${STORAGE_KEY_PREFIX}${sourceID}`).catch(err => {
                throw new VError(err, `Failed removing source with ID: ${sourceID}`);
            });
        });
    }

    /**
     * Reorder a source
     * @param {String} sourceID The ID of the source to reorder
     * @param {Number} position The 0-based position to move the source to
     * @memberof ArchiveManager
     * @throws {VError} Throws if no source is found
     */
    reorderSource(sourceID, position) {
        const source = this.getSourceForID(sourceID);
        if (!source) {
            throw new VError(`Failed reordering source: No source found for ID: ${sourceID}`);
        }
        if (position === source.order) {
            return;
        }
        const originalOrder = source.order;
        source.order = position;
        const movingUp = position < originalOrder;
        this.sources.forEach(otherSource => {
            if (otherSource.id !== sourceID) {
                if (movingUp && otherSource.order >= position) {
                    otherSource.order += 1;
                } else if (!movingUp && otherSource.order <= position) {
                    otherSource.order -= 1;
                }
            }
        });
        this.reorderSources();
    }

    /**
     * Reorder all sources
     * @memberof ArchiveManager
     */
    reorderSources() {
        this.sources.sort((sourceA, sourceB) => {
            if (sourceA.order > sourceB.order) {
                return 1;
            } else if (sourceB.order > sourceA.order) {
                return -1;
            }
            return 0;
        });
        this.sources.forEach((source, index) => {
            source.order = index;
        });
        this._emitSourcesListUpdated();
    }

    /**
     * Toggle auto updating of sources
     * @param {Boolean=} enable Enable or disable auto updating. Leave empty
     *  to invert the setting
     * @param {Number} delay Milliseconds between updates
     * @memberof ArchiveManager
     */
    toggleAutoUpdating(enable = !this.autoUpdateEnabled, delay = DEFAULT_AUTO_UPDATE_DELAY) {
        if (enable) {
            this._autoUpdateDelay = delay;
            this._startAutoUpdateTimer();
        } else {
            this._autoUpdateDelay = null;
            clearTimeout(this._autoUpdateTimer);
            this._autoUpdateTimer = null;
        }
    }

    _autoUpdateSources() {
        return this._enqueueStateChange(() => {
            const updateableSources = this.updateableSources;
            if (updateableSources.length <= 0) {
                return Promise.resolve();
            }
            return Promise.all(
                updateableSources.map(source =>
                    source.workspace.update().catch(err => {
                        // we ignore auto-update errors
                        console.error(`Failed auto-updating source: ${source.id}`);
                    })
                )
            );
        });
    }

    _emitSourcesListUpdated() {
        this.emit("sourcesUpdated", this.sourcesList);
    }

    _enqueueStateChange(cb) {
        return this._queue.channel("state").enqueue(cb);
    }

    _startAutoUpdateTimer() {
        clearTimeout(this._autoUpdateTimer);
        this._autoUpdateTimer = setTimeout(() => {
            this._autoUpdateSources().then(() => {
                if (this.autoUpdateEnabled) {
                    this._startAutoUpdateTimer();
                }
            });
        }, this._autoUpdateDelay);
    }

    _storeDehydratedSource(id, dehydratedSource) {
        return this.storageInterface.setValue(`${STORAGE_KEY_PREFIX}${id}`, dehydratedSource);
    }
}

ArchiveManager.STORAGE_KEY_PREFIX = STORAGE_KEY_PREFIX;

module.exports = ArchiveManager;
