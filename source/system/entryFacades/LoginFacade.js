const EntryFacade = require("./EntryFacade.js");
const { LOGIN } = require("./types.js");

class LoginFacade extends EntryFacade {

    get type() {
        return LOGIN;
    }

}

module.exports = LoginFacade;
