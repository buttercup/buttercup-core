const EE = require("eventemitter3");

class AsyncEventEmitter extends EE {
    emit(...args) {
        setTimeout(() => {
            super.emit(...args);
        }, 0);
    }
}

module.exports = AsyncEventEmitter;
