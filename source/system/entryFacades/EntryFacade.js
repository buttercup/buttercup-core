const { applyFieldDescriptor, createFieldDescriptor } = require("./fields.js");

class EntryFacade {

    constructor(entry) {
        this._entry = entry;
    }

    get entry() {
        return entry;
    }

    get fields() {
        return [
            createFieldDescriptor(
                this.entry,
                "Username",
                "property",
                "username"
            ),
            createFieldDescriptor(
                this.entry,
                "Password",
                "property",
                "password",
                { protected: true }
            )
        ];
    }

    get title() {
        return this.entry.getProperty("title");
    }

    get type() {
        return "";
    }

    consumeInputHarness(harness) {
        if (harness && harness.type) {
            (harness.fields || []).forEach(field => applyFieldDescriptor(field));
        } else {
            throw new Error("Invalid item passed as a harness");
        }
    }

    generateInputHarness() {
        return {
            type: this.type,
            fields: this.fields
        };
    }

}

module.exports = EntryFacade;
