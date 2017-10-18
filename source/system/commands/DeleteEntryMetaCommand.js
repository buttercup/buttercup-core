"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for the deletion of meta data on an entry
 * @class DeleteEntryMetaCommand
 * @augments BaseCommand
 */
class DeleteEntryMetaCommand extends BaseCommand {
    /**
     * Execute the deletion of a meta property
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} entryID The ID of the entry
     * @param {String} propertyName The name of the meta property to delete
     */
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
