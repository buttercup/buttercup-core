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

    dehydrate() {}

    rehydrate() {}

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
