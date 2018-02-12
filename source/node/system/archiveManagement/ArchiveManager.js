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

    get storageInterface() {
        return this._storageInterface;
    }

    get unlockedSources() {
        return this.sources.filter(source => source.status === ArchiveSource.Status.UNLOCKED);
    }

    addSource(archiveSource) {
        this.sources.push(archiveSource);
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
                                this.addSource(source);
                            })
                            .catch(function __handleDehydratedReadError(err) {
                                throw new VError(err, `Failed rehydrating item from storage with key: ${key}`);
                            })
                    )
                )
            )
            .catch(err => {
                throw new VError(err, "Failed rehydrating sources");
            });
    }

    removeSource(sourceID) {
        const sourceIndex = this.sources.findIndex(source => source.id === sourceID);
        if (sourceIndex === -1) {
            throw new VError(`Failed removing source: No source found for ID: ${sourceID}`);
        }
        this.sources.splice(sourceIndex, 1);
    }

    sort() {}
}

module.exports = ArchiveManager;
