const BaseCommand = require("./BaseCommand.js");

/**
 * Command for creating groups
 * @class CreateGroupCommand
 * @augments BaseCommand
 */
class CreateGroupCommand extends BaseCommand {
    /**
     * Execute the group creation
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} parentID The ID of the parent group to create within
     * @param {String} newID The ID of the new group
     */
    execute(obj, parentID, newID) {
        obj.groups = obj.groups || [];
        var group = {
            id: newID,
            title: ""
        };
        if ("" + parentID === "0") {
            obj.groups.push(group);
        } else {
            var parentGroup = this.searchTools.findGroupByID(obj.groups, parentID);
            if (!parentGroup) {
                throw new Error("Invalid parent group ID: not found");
            }
            parentGroup.groups = parentGroup.groups || [];
            parentGroup.groups.push(group);
        }
    }
}

module.exports = CreateGroupCommand;
