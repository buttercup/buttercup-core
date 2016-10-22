"use strict";

const BaseCommand = require("./BaseCommand.js");

class DeleteArchiveAttributeCommand extends BaseCommand {

    execute(obj, attributeName) {
        let attributes = obj.attributes || {};
        if (attributes.hasOwnProperty(attributeName) !== true) {
            throw new Error(`Attribute doesn't exist on archive: ${attributeName}`);
        }
        let deleted = delete attributes[attributeName];
        if (!deleted) {
            throw new Error("Failed deleting attribute");
        }
    }

}

module.exports = DeleteArchiveAttributeCommand;
