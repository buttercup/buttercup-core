"use strict";

const BaseCommand = require("./BaseCommand.js");

class SetArchiveAttributeCommand extends BaseCommand {

    execute(obj, attributeName, value) {
        obj.attributes = obj.attributes || {};
        obj.attributes[attributeName] = value;
    }

}

module.exports = SetArchiveAttributeCommand;
