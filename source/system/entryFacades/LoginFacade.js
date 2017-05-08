const EntryFacade = require("./EntryFacade.js");
const { LOGIN } = require("./types.js");

class LoginFacade extends EntryFacade {
    
    get password() {
        return this.entry.getProperty("password");
    }

    get type() {
        return LOGIN;
    }

    get username() {
        return this.entry.getProperty("username");
    }

}

module.exports = LoginFacade;
