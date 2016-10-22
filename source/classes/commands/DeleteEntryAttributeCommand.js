"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for the deletion of entry attributes
 * @class DeleteEntryAttributeCommand
 * @augments BaseCommand
 */
class DeleteEntryAttributeCommand extends BaseCommand {

    /**
     * Execute the deletion of an attribute
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} entryID The ID of the entry
     * @param {String} attributeName The name of the attribute to delete
     */
    execute(obj, entryID, attributeName) {
        obj.groups = obj.groups || [];
        var entry = this.searchTools.findEntryByID(obj.groups, entryID);
        if (!entry) {
            throw new Error("Entry not found for ID");
        }
        entry.attributes = entry.attributes || {};
        var deleted = delete entry.attributes[attributeName];
        if (!deleted) {
            throw new Error("Failed deleting attribute");
        }
    }

}

module.exports = DeleteEntryAttributeCommand;
