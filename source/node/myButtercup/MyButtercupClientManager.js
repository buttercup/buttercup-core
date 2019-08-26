let __sharedManager = null;

class MyButtercupClientManager {
    constructor() {
        this._clients = {};
    }

    attachClient(trackingID, client) {
        this._clients[trackingID] = client;
    }

    detachClient(trackingID) {
        this._clients[trackingID] = null;
        delete this._clients[trackingID];
    }

    getClientForID(trackingID) {
        const client = this._clients[trackingID];
        if (!client) {
            throw new Error(`No client for ID: ${trackingID}`);
        }
        return client;
    }
}

MyButtercupClientManager.getSharedManager = function getSharedManager() {
    if (!__sharedManager) {
        __sharedManager = new MyButtercupClientManager();
    }
    return __sharedManager;
};

module.exports = MyButtercupClientManager;
