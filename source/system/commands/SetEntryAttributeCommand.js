"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for setting entry attributes
 * @class SetEntryAttributeCommand
 * @augments BaseCommand
 */
class SetEntryAttributeCommand extends BaseCommand {
    /**
     * Execute the setting of an attribute
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} entryID The ID of the entry
     * @param {String} attributeName The name of the attribute to set
     * @param {String} value The value to set
     */
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
