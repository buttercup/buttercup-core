const EventEmitter = require("eventemitter3");
const ChannelQueue = require("@buttercup/channel-queue");
const MemoryStorageInterface = require("../storage/MemoryStorageInterface.js");

const DEFAULT_AUTO_UPDATE_DELAY = 1000 * 60 * 2.5; // 2.5 mins
const STORAGE_KEY_PREFIX = "bcup_vaultmgr_";
const STORAGE_KEY_PREFIX_TEST = /^bcup_vaultmgr_[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;

class VaultManager extends EventEmitter {
    constructor(opts = {}) {
        super();
        const {
            autoUpdate = true,
            autoUpdateDelay = DEFAULT_AUTO_UPDATE_DELAY,
            cacheStorage = new MemoryStorageInterface(),
            sourceStorage = new MemoryStorageInterface()
        } = opts;
        this._cacheStorage = cacheStorage;
        this._sourceStorage = sourceStorage;
        this._queue = new ChannelQueue();
        this._autoUpdateEnabled = autoUpdate;
        this._autoUpdateDelay = autoUpdateDelay;
        this._autoUpdateTimer = null;
        this._initialised = false;
    }

    initialise() {
        if (this._initialised) return;
        this._startAutoUpdateTimer();
        this._initialised = true;
    }

    _autoUpdateSources() {
        // @todo
        // this.emit("autoUpdateStart");
        // return this._enqueueStateChange(() => {
        //     const updateableSources = this.updateableSources;
        //     if (updateableSources.length <= 0) {
        //         return Promise.resolve();
        //     }
        //     return Promise.all(
        //         updateableSources.map(source =>
        //             source.workspace.update().catch(err => {
        //                 // we ignore auto-update errors
        //                 console.error(`Failed auto-updating source: ${source.id}`);
        //             })
        //         )
        //     ).then(() => {
        //         this.emit("autoUpdateStop");
        //     });
        // });
    }

    _enqueueStateChange(cb) {
        return this._queue.channel("state").enqueue(cb);
    }

    _startAutoUpdateTimer() {
        clearTimeout(this._autoUpdateTimer);
        this._autoUpdateTimer = setTimeout(() => {
            this._autoUpdateSources().then(() => {
                if (this._autoUpdateEnabled) {
                    this._startAutoUpdateTimer();
                }
            });
        }, this._autoUpdateDelay);
    }

    _storeDehydratedSource(id, dehydratedSource) {
        return this._sourceStorage.setValue(`${STORAGE_KEY_PREFIX}${id}`, dehydratedSource);
    }
}
