const EventEmitter = require("eventemitter3");
const { getSharedAppEnv } = require("../env/appEnv.js");

function notImplemented() {
    throw new Error("Not implemented");
}

class VaultFormat extends EventEmitter {
    static encodeRaw() {
        notImplemented();
    }

    static parseEncrypted() {
        notImplemented();
    }

    dirty = false;
    history = [];
    source = null;

    constructor(source) {
        super();
        this.source = source;
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

    initialise() {
        notImplemented();
    }

    moveEntry() {
        notImplemented();
    }

    moveGroup() {
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
