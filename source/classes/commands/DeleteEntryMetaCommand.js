"use strict";

const BaseCommand = require("./BaseCommand.js");

class DeleteEntryMetaCommand extends BaseCommand {

    execute(obj, entryID, propertyName) {
        obj.groups = obj.groups || [];
        var entry = this.searchTools.findEntryByID(obj.groups, entryID);
        if (!entry) {
            throw new Error("Entry not found for ID");
        }
        entry.meta = entry.meta || {};
        var deleted = delete entry.meta[propertyName];
        if (!deleted) {
            throw new Error("Failed deleting meta property");
        }
    }

}

module.exports = DeleteEntryMetaCommand;
