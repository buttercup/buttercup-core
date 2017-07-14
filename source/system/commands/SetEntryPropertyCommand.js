"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for setting entry properties
 * @class SetEntryPropertyCommand
 * @augments BaseCommand
 */
class SetEntryPropertyCommand extends BaseCommand {

    /**
     * Execute the setting of a property
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} entryID The ID of the entry
     * @param {String} propertyName The name of the property to set
     * @param {String} value The value to set
     */
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

        if (propertyName === "password") {
          entry.attributes = entry.attributes || {};
          entry.attributes["passModifiedTime"] = (new Date()).getTime();

            if (entry.attributes["passExpiry"] !== 0) {
                var passModifiedTime = new Date(entry.attributes["passModifiedTime"]),
                    passExpiryTime = new Date(entry.attributes["passModifiedTime"]);
                passExpiryTime.setDate(passModifiedTime.getDate() + parseInt(entry.attributes["passExpiry"], 10));
                entry.attributes["passExpiryTime"] = passExpiryTime.getTime();
            }
        }

    }

}

module.exports = SetEntryPropertyCommand;
