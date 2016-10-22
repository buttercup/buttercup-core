"use strict";

const BaseCommand = require("./BaseCommand.js");

class DeleteEntryCommand extends BaseCommand {

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
