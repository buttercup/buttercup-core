const BaseCommand = require("./BaseCommand.js");

/**
 * Command for the deletion of property data on an entry
 * @augments BaseCommand
 */
class DeleteEntryPropertyCommand extends BaseCommand {
    /**
     * Execute the deletion of a property
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} entryID The ID of the entry
     * @param {String} propertyName The name of the property to delete
     */
    execute(obj, entryID, propertyName) {
        obj.groups = obj.groups || [];
        const entry = this.searchTools.findEntryByID(obj.groups, entryID);
        if (!entry) {
            throw new Error(`Entry not found for ID: ${entryID}`);
        }
        entry.properties = entry.properties || {};
        const value = entry.properties[propertyName];
        const deleted = delete entry.properties[propertyName];
        if (!deleted) {
            throw new Error(`Failed deleting property: ${propertyName}`);
        }
        entry.history = entry.history || [];
        entry.history.push({
            type: "remove-property",
            property: propertyName,
            value
        });
    }
}

module.exports = DeleteEntryPropertyCommand;
