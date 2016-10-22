const BaseCommand = require("./BaseCommand.js");

class TitleGroupCommand extends BaseCommand {

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
