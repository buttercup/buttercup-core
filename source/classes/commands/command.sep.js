const BaseCommand = require("./BaseCommand.js");

class SetEntryPropertyCommand extends BaseCommand {

    execute(obj, entryID, propertyName, value) {
        obj.groups = obj.groups || [];
        if (!this.entryTools.isValidProperty(propertyName)) {
            throw new Error("Invalid property name for entry: " + propertyName);
        }
        var entry = this.searchTools.findEntryByID(obj.groups, entryID);
        if (!entry) {
            throw new Error("Entry not found for ID");
        }
        entry[propertyName] = value;
    }

}

module.exports = SetEntryPropertyCommand;
