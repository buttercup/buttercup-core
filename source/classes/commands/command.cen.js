const BaseCommand = require("./BaseCommand.js");

class CreateEntryCommand extends BaseCommand {

    execute(obj, groupID, entryID) {
        obj.groups = obj.groups || [];
        var entry = {
            id: entryID,
            title: ""
        };
        var group = this.searchTools.findGroupByID(obj.groups, groupID);
        if (!group) {
            throw new Error("Invalid group ID");
        }
        group.entries = group.entries || [];
        group.entries.push(entry);
    }

}

module.exports = CreateEntryCommand;
