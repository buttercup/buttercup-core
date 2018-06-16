const ChannelQueue = require("@buttercup/channel-queue");

let __queue;

function getQueue() {
    if (!__queue) {
        __queue = new ChannelQueue();
    }
    return __queue;
}

module.exports = {
    getQueue
};
