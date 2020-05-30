const { mergeHistories, prependSharePrefix, removeSharePrefix } = require("../tools/sharing.js");
const { hashHistory } = require("../tools/hash.js");

class Share {
    constructor(shareID, history, permissions = []) {
        this._id = shareID;
        this._history = removeSharePrefix(history);
        this._lastHash = hashHistory(this._history);
        this._dirty = false;
        this._permissions = permissions;
    }

    get id() {
        return this._id;
    }

    get permissions() {
        return [...this._permissions];
    }

    applyToArchive(archive) {
        if (this.archiveHasAppliedShare(archive)) {
            throw new Error("Target archive has already had share applied");
        }
        const westley = archive._getWestley();
        westley.executionOptions = {
            permissions: this.permissions
        };
        this.getPrefixedHistory().forEach(line => westley.execute(line));
        westley.executionOptions = {};
    }

    archiveHasAppliedShare(archive) {
        return !!archive._getWestley().history.find(line => line.indexOf(`$${this.id}`) === 0);
    }

    getPrefixedHistory() {
        return prependSharePrefix(this._history, this.id);
    }

    updateHistory(history) {
        const incoming = removeSharePrefix(history);
        const incomingHash = hashHistory(incoming);
        if (incomingHash === this._lastHash) {
            return false;
        }
        this._history = mergeHistories(this._history, incoming);
        this._lastHash = hashHistory(this._history);
        this._dirty = true;
        return true;
    }
}

module.exports = Share;
