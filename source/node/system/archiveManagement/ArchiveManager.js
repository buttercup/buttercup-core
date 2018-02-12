const VError = require("verror");
const AsyncEventEmitter = require("./events/AsyncEventEmitter.js");
const MemoryStorageInterface = require("./storage/MemoryStorageInterface.js");
const ArchiveSource = require("./ArchiveSource.js");

class ArchiveManager extends AsyncEventEmitter {
    constructor(storageInterface = new MemoryStorageInterface()) {
        super();
        this._storageInterface = storageInterface;
        this._sources = [];
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

    addSource(archiveSource, emitUpdated = true) {
        const existing = this.sources.find(source => source.id === archiveSource.id);
        if (!existing) {
            this.sources.push(archiveSource);
            if (emitUpdated) {
                this._emitSourcesListUpdated();
            }
            archiveSource.on("sourceLocked", details => {
                this.emit("sourceLocked", details);
                this._emitSourcesListUpdated();
            });
            archiveSource.on("sourceUnlocked", details => {
                this.emit("sourceUnlocked", details);
                this._emitSourcesListUpdated();
            });
            this.reorderSources();
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
                                this.addSource(source, /* emit updated event: */ false);
                            })
                            .catch(function __handleDehydratedReadError(err) {
                                throw new VError(err, `Failed rehydrating item from storage with key: ${key}`);
                            })
                    )
                )
            )
            .then(() => {
                // Emit updated event after all added
                this._emitSourcesListUpdated();
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
    }

    reorderSources() {
        this.sources.sort((sourceA, sourceB) => {
            if (sourceA.order > sourceB.order) {
                return -1;
            } else if (sourceB.order > sourceA.order) {
                return 1;
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
