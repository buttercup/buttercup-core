const BaseCommand = require("./BaseCommand.js");

/**
 * Command for the moving of entries
 * @class MoveEntryCommand
 * @augments BaseCommand
 */
class MoveEntryCommand extends BaseCommand {
    /**
     * Execute the move
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} entryID The ID of the entry to move
     * @param {String} targetGroupID The ID of the group to move the entry to
     */
    execute(obj, entryID, targetGroupID) {
        obj.groups = obj.groups || [];
        var location = this.searchTools.findGroupContainingEntryID(obj.groups, entryID),
            originGroup = location.group,
            originIndex = location.index;
        if (!originGroup) {
            throw new Error("Invalid entry ID");
        }
        var targetGroup = this.searchTools.findGroupByID(obj.groups, targetGroupID);
        if (!targetGroup) {
            throw new Error("Invalid group ID");
        }
        var movedEntry = originGroup.entries.splice(originIndex, 1)[0];
        targetGroup.entries = targetGroup.entries || [];
        targetGroup.entries.push(movedEntry);
        movedEntry.history = movedEntry.history || [];
        movedEntry.history.push({
            type: "move-group",
            origin: originGroup,
            destination: targetGroupID
        });
    }
}

module.exports = MoveEntryCommand;
