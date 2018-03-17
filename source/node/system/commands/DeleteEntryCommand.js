const BaseCommand = require("./BaseCommand.js");

/**
 * Command for the deletion of entries
 * @class DeleteEntryCommand
 * @augments BaseCommand
 */
class DeleteEntryCommand extends BaseCommand {
    /**
     * Execute the entry deletion
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} entryID The ID of the entry to delete
     */
    execute(obj, entryID) {
        obj.groups = obj.groups || [];
        var location = this.searchTools.findGroupContainingEntryID(obj.groups, entryID),
            containerGroup = location.group,
            containerIndex = location.index;
        if (!containerGroup) {
            throw new Error("Invalid entry ID");
        }
        containerGroup.entries.splice(containerIndex, 1);
    }
}

module.exports = DeleteEntryCommand;
