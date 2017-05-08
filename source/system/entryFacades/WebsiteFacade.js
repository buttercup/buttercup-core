const LoginFacade = require("./LoginFacade.js");
const { WEBSITE } = require("./types.js");

class WebsiteFacade extends LoginFacade {

    get type() {
        return WEBSITE;
    }

    get URL() {
        return this.entry.getMeta("URL") ||
            this.entry.getMeta("url") ||
            this.entry.getMeta("Url") ||
            undefined;
    }

}

module.exports = WebsiteFacade;
