const Entry = require("./Entry.js");
const types = require("./entryFacades/types.js");
const LoginFacade = require("./entryFacades/LoginFacade.js");

function createEntryFacade(entry) {
    if (entry instanceof Entry !== true) {
        throw new Error("Failed creating entry facade: Provided item is not an Entry");
    }
    const facadeType = entry.getAttribute(Entry.Attributes.FacadeType);
    const Facade = resolveFacadeClass(facadeType);
    return new Facade(entry);
}

function resolveFacadeClass(facadeType) {
    switch (facadeType) {
        case types.LOGIN:
            /* fall-through */
        default:
            return LoginFacade;
    }
}

module.exports = {
    createEntryFacade
};
