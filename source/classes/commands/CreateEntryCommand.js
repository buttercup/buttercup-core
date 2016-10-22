"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for creating entries
 * @class CreateEntryCommand
 * @augments BaseCommand
 */
class CreateEntryCommand extends BaseCommand {

    /**
     * Execute the entry creation
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} groupID The ID of the group to create within
     * @param {String} entryID The ID of the entry to create
     */
    execute(obj, groupID, entryID) {
        obj.groups = obj.groups || [];
        var entry = {
            id: entryID,
            title: ""
        };
        var group = this.searchTools.findGroupByID(obj.groups, groupID);
        if (!group) {
            throw new Error("Invalid group ID");
        }
        group.entries = group.entries || [];
        group.entries.push(entry);
    }

}

module.exports = CreateEntryCommand;
