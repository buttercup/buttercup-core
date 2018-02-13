const VError = require("verror");
const AsyncEventEmitter = require("../events/AsyncEventEmitter.js");
const MemoryStorageInterface = require("../storage/MemoryStorageInterface.js");
const ArchiveSource = require("./ArchiveSource.js");

const STORAGE_KEY_PREFIX = "bcup_archivemgr_";
const STORAGE_KEY_PREFIX_TEST = /^bcup_archivemgr_[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

class ArchiveManager extends AsyncEventEmitter {
    constructor(storageInterface = new MemoryStorageInterface()) {
        super();
        this._storageInterface = storageInterface;
        this._sources = [];
    }

    get nextSourceOrder() {
        return this.sources.length;
    }

    get sources() {
        return this._sources;
    }

    get sourcesList() {
        return this.sources.map(source => source.description);
    }

    get storageInterface() {
        return this._storageInterface;
    }

    get unlockedSources() {
        return this.sources.filter(source => source.status === ArchiveSource.Status.UNLOCKED);
    }

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
        }
    }

    dehydrate() {
        return Promise.all(
            this.sources.map(source =>
                source.dehydrate().then(dehydratedSource => {
                    this.storageInterface.setValue(`${STORAGE_KEY_PREFIX}${source.id}`, dehydratedSource);
                })
            )
        );
    }

    getSourceForID(sourceID) {
        const source = this.sources.find(target => target.id && target.id === sourceID);
        return source || null;
    }

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
}

module.exports = ArchiveManager;
