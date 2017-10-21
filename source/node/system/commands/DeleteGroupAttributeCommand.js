"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for deleting group attributes
 * @class DeleteGroupAttributeCommand
 * @augments BaseCommand
 */
class DeleteGroupAttributeCommand extends BaseCommand {
    /**
     * Execute the deletion of a group attribute
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} groupID The ID of the group
     * @param {String} attributeName The attribute to delete
     */
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
