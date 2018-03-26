const BaseCommand = require("./BaseCommand.js");

/**
 * Command for group deletion
 * @class DeleteGroupCommand
 * @augments BaseCommand
 */
class DeleteGroupCommand extends BaseCommand {
    /**
     * Execute the deletion of a group
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} groupID The ID of the group to delete
     */
    execute(obj, groupID) {
        obj.groups = obj.groups || [];
        var location = this.searchTools.findGroupContainingGroupID(obj, groupID),
            containerGroup = location.group,
            containerIndex = location.index;
        if (!containerGroup) {
            throw new Error("Invalid group ID");
        }
        containerGroup.groups.splice(containerIndex, 1);
    }
}

module.exports = DeleteGroupCommand;
