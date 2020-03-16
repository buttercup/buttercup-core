const EventEmitter = require("eventemitter3");

function notImplemented() {
    throw new Error("Not implemented");
}

class VaultFormat extends EventEmitter {
    dirty = false;
    history = [];
    source = null;

    constructor(source) {
        super();
        this.source = source;
    }

    createGroup() {
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

    moveGroup() {
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
