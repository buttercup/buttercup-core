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

    initialise() {
        notImplemented();
    }
}

module.exports = VaultFormat;
