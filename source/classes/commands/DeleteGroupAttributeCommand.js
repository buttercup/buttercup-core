"use strict";

const BaseCommand = require("./BaseCommand.js");

class DeleteGroupAttributeCommand extends BaseCommand {

    execute(obj, groupID, attributeName) {
        obj.groups = obj.groups || [];
        var group = this.searchTools.findGroupByID(obj.groups, groupID);
        if (!group) {
            throw new Error("Group not found for ID");
        }
        group.attributes = group.attributes || {};
        var deleted = delete group.attributes[attributeName];
        if (!deleted) {
            throw new Error("Failed deleting attribute");
        }
    }

}

module.exports = DeleteGroupAttributeCommand;
