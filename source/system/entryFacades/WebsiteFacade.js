const LoginFacade = require("./LoginFacade.js");
const { WEBSITE } = require("./types.js");
const { createFieldDescriptor } = require("./fields.js");

class WebsiteFacade extends LoginFacade {

    get fields() {
        return [
            ...this.fields,
            createFieldDescriptor(
                this.entry,
                "URL",
                "meta",
                "url"
            )
        ];
    }

    get type() {
        return WEBSITE;
    }

}

module.exports = WebsiteFacade;
