const BaseCommand = require("./BaseCommand.js");

class SetGroupAttributeCommand extends BaseCommand {

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
