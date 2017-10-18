"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for moving groups
 * @class MoveGroupCommand
 * @augments BaseCommand
 */
class MoveGroupCommand extends BaseCommand {
    /**
     * Execute the move
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} groupID The ID of the group to move
     * @param {String} targetGroupID The ID of the group to move to
     */
    execute(obj, groupID, targetGroupID) {
        obj.groups = obj.groups || [];
        var location = this.searchTools.findGroupContainingGroupID(obj, groupID),
            originGroup = location.group,
            originIndex = location.index;
        if (!originGroup) {
            throw new Error("Invalid group ID");
        }

        var targetGroup =
            targetGroupID.length === 1 && parseInt(targetGroupID, 10) === 0
                ? obj
                : this.searchTools.findGroupByID(obj.groups, targetGroupID);

        if (!targetGroup) {
            throw new Error("Invalid group ID");
        }
        var movedGroup = originGroup.groups.splice(originIndex, 1)[0];
        targetGroup.groups = targetGroup.groups || [];
        targetGroup.groups.push(movedGroup);
    }
}

module.exports = MoveGroupCommand;
