const BaseCommand = require("./BaseCommand.js");

/**
 * Command for the deletion of meta data on an entry
 * @class DeleteEntryMetaCommand
 * @augments BaseCommand
 * @deprecated To be removed
 */
class DeleteEntryMetaCommand extends BaseCommand {
    /**
     * Execute the deletion of a meta property
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} entryID The ID of the entry
     * @param {String} propertyName The name of the meta property to delete
     */
    execute(obj, entryID, propertyName) {
        obj.groups = obj.groups || [];
        const entry = this.searchTools.findEntryByID(obj.groups, entryID);
        if (!entry) {
            throw new Error("Entry not found for ID");
        }
        entry.properties = entry.properties || {};
        const value = entry.properties[propertyName];
        const deleted = delete entry.properties[propertyName];
        if (!deleted) {
            throw new Error("Failed deleting meta property");
        }
        entry.history = entry.history || [];
        entry.history.push({
            type: "remove-property",
            property: propertyName,
            value
        });
    }
}

module.exports = DeleteEntryMetaCommand;
