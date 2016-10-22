"use strict";

const BaseCommand = require("./BaseCommand.js");

class SetEntryMetaCommand extends BaseCommand {

    execute(obj, entryID, propertyName, value) {
        obj.groups = obj.groups || [];
        var entry = this.searchTools.findEntryByID(obj.groups, entryID);
        if (!entry) {
            throw new Error("Entry not found for ID");
        }
        entry.meta = entry.meta || {};
        entry.meta[propertyName] = value;
    }

}

module.exports = SetEntryMetaCommand;
