const BaseCommand = require("./BaseCommand.js");

class MoveGroupCommand extends BaseCommand {

    execute(obj, groupID, targetGroupID) {
        obj.groups = obj.groups || [];
        var location = this.searchTools.findGroupContainingGroupID(obj, groupID),
            originGroup = location.group,
            originIndex = location.index;
        if (!originGroup) {
            throw new Error("Invalid group ID");
        }

        var targetGroup = (targetGroupID.length === 1 && parseInt(targetGroupID, 10) === 0) ?
            obj : this.searchTools.findGroupByID(obj.groups, targetGroupID);

        if (!targetGroup) {
            throw new Error("Invalid group ID");
        }
        var movedGroup = originGroup.groups.splice(originIndex, 1)[0];
        targetGroup.groups = targetGroup.groups || [];
        targetGroup.groups.push(movedGroup);
    }

}

module.exports = MoveGroupCommand;
