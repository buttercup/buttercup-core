"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for titling groups
 * @class TitleGroupCommand
 * @augments BaseCommand
 */
class TitleGroupCommand extends BaseCommand {

    /**
     * Execute the setting of the title
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} groupID The ID of the group to set
     * @param {String} title The title to set
     */
    execute(obj, groupID, title) {
        obj.groups = obj.groups || [];
        var group = this.searchTools.findGroupByID(obj.groups, groupID);
        if (!group) {
            throw new Error("Group not found for ID");
        }
        group.title = title;
    }

}

module.exports = TitleGroupCommand;
