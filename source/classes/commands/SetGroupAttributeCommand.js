"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for setting group attributes
 * @class SetGroupAttributeCommand
 * @augments BaseCommand
 */
class SetGroupAttributeCommand extends BaseCommand {

    /**
     * Execute the setting of an attribute
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} groupID The ID of the group
     * @param {String} attributeName The name of the attribute to set
     * @param {String} value The value to set
     */
    execute(obj, groupID, attributeName, value) {
        obj.groups = obj.groups || [];
        var group = this.searchTools.findGroupByID(obj.groups, groupID);
        if (!group) {
            throw new Error("Group not found for ID");
        }
        group.attributes = group.attributes || {};
        group.attributes[attributeName] = value;
    }

}

module.exports = SetGroupAttributeCommand;
