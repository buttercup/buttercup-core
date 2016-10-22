"use strict";

const BaseCommand = require("./BaseCommand.js");

class MoveEntryCommand extends BaseCommand {

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
    }

}

module.exports = MoveEntryCommand;
