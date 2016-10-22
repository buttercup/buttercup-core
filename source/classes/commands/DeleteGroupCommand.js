"use strict";

const BaseCommand = require("./BaseCommand.js");

class DeleteGroupCommand extends BaseCommand {

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
