const { prependSharePrefix, removeSharePrefix } = require("../tools/sharing.js");

class Share {
    constructor(shareID, history) {
        this._id = shareID;
        this._history = removeSharePrefix(history);
    }

    get id() {
        return this._id;
    }

    applyToArchive(archive) {
        if (this.archiveHasAppliedShare(archive)) {
            throw new Error("Target archive has already had share applied");
        }
        const westley = archive._getWestley();
        this.getPrefixedHistory().forEach(line => westley.execute(line));
    }

    archiveHasAppliedShare(archive) {
        return !!archive._getWestley().history.find(line => line.indexOf(`$${this.id}`) === 0);
    }

    getPrefixedHistory() {
        return prependSharePrefix(this._history, this.id);
    }
}

module.exports = Share;
