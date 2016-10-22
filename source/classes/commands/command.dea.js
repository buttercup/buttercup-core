const BaseCommand = require("./BaseCommand.js");

class DeleteEntryAttributeCommand extends BaseCommand {

    execute(obj, entryID, attributeName) {
        obj.groups = obj.groups || [];
        var entry = this.searchTools.findEntryByID(obj.groups, entryID);
        if (!entry) {
            throw new Error("Entry not found for ID");
        }
        entry.attributes = entry.attributes || {};
        var deleted = delete entry.attributes[attributeName];
        if (!deleted) {
            throw new Error("Failed deleting attribute");
        }
    }

}

module.exports = DeleteEntryAttributeCommand;
