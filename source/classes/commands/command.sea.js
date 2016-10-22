"use strict";

const BaseCommand = require("./BaseCommand.js");

class SetEntryAttributeCommand extends BaseCommand {

    execute(obj, entryID, attributeName, value) {
        obj.groups = obj.groups || [];
        var entry = this.searchTools.findEntryByID(obj.groups, entryID);
        if (!entry) {
            throw new Error("Entry not found for ID");
        }
        entry.attributes = entry.attributes || {};
        entry.attributes[attributeName] = value;
    }

}

module.exports = SetEntryAttributeCommand;
