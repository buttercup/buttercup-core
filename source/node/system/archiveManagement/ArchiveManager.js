const VError = require("verror");
const AsyncEventEmitter = require("../events/AsyncEventEmitter.js");
const MemoryStorageInterface = require("../storage/MemoryStorageInterface.js");
const ArchiveSource = require("./ArchiveSource.js");

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
            // Store the source
            this.sources.push(archiveSource);
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
        }
        return Promise.resolve();
    }

    /**
     * Dehydrate all sources and write them to storage
     * @returns {Promise} A promise that resolves once all sources have been dehydrated
     * @memberof ArchiveManager
     */
    dehydrate() {
        return Promise.all(
            this.sources.map(source =>
                source.dehydrate().then(dehydratedSource => this._storeDehydratedSource(source.id, dehydratedSource))
            )
        );
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
                            .then(source => {
                                this.addSource(source, { emitUpdated: false, order: source.order });
                            })
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
        const sourceIndex = this.sources.findIndex(source => source.id === sourceID);
        if (sourceIndex === -1) {
            throw new VError(`Failed removing source: No source found for ID: ${sourceID}`);
        }
        const source = this.sources[sourceIndex];
        source.removeAllListeners();
        this.sources.splice(sourceIndex, 1);
        this._emitSourcesListUpdated();
        return this.storageInterface.removeKey(`${STORAGE_KEY_PREFIX}${sourceID}`).catch(err => {
            throw new VError(err, `Failed removing source with ID: ${sourceID}`);
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

    _emitSourcesListUpdated() {
        this.emit("sourcesUpdated", this.sourcesList);
    }

    _storeDehydratedSource(id, dehydratedSource) {
        return this.storageInterface.setValue(`${STORAGE_KEY_PREFIX}${id}`, dehydratedSource);
    }
}

ArchiveManager.STORAGE_KEY_PREFIX = STORAGE_KEY_PREFIX;

module.exports = ArchiveManager;
