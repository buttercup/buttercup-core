const EventEmitter = require("eventemitter3");
const { getSharedAppEnv } = require("../env/appEnv.js");

function notImplemented() {
    throw new Error("Not implemented");
}

class VaultFormat extends EventEmitter {
    static encodeRaw() {
        notImplemented();
    }

    static extractSharesFromHistory() {
        notImplemented();
    }

    static isEncrypted() {
        notImplemented();
    }

    static parseEncrypted() {
        notImplemented();
    }

    static prepareHistoryForMerge() {
        notImplemented();
    }

    dirty = false;
    history = [];
    source = null;

    constructor(source = {}) {
        super();
        this.source = source;
    }

    clear() {
        this.history = [];
        if (this.source) {
            for (const key in this.source) {
                delete this.source[key];
            }
        }
    }

    cloneEntry() {
        notImplemented();
    }

    cloneGroup() {
        notImplemented();
    }

    createEntry() {
        notImplemented();
    }

    createGroup() {
        notImplemented();
    }

    deleteEntry() {
        notImplemented();
    }

    deleteEntryAttribute() {
        notImplemented();
    }

    deleteEntryProperty() {
        notImplemented();
    }

    deleteGroup() {
        notImplemented();
    }

    deleteGroupAttribute() {
        notImplemented();
    }

    deleteVaultAttribute() {
        notImplemented();
    }

    erase() {
        Object.keys(this.source).forEach(sourceKey => {
            this.source[sourceKey] = undefined;
            delete this.source[sourceKey];
        });
        this.history.splice(0, Infinity);
    }

    execute() {
        notImplemented();
    }

    generateID() {
        notImplemented();
    }

    getFormat() {
        return VaultFormat;
    }

    initialise() {
        notImplemented();
    }

    moveEntry() {
        notImplemented();
    }

    moveGroup() {
        notImplemented();
    }

    optimise() {
        notImplemented();
    }

    setEntryAttribute() {
        notImplemented();
    }

    setEntryProperty() {
        notImplemented();
    }

    setGroupAttribute() {
        notImplemented();
    }

    setGroupTitle() {
        notImplemented();
    }

    setVaultAttribute() {
        notImplemented();
    }
}

module.exports = VaultFormat;
