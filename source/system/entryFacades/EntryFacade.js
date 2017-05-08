class EntryFacade {

    constructor(entry) {
        this._entry = entry;
    }

    get entry() {
        return entry;
    }

    get title() {
        return this.entry.getProperty("title");
    }

    get type() {
        return "";
    }

}

module.exports = EntryFacade;
