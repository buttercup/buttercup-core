"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for deleting attributes stored on the archive object
 * @class DeleteArchiveAttributeCommand
 * @augments BaseCommand
 */
class DeleteArchiveAttributeCommand extends BaseCommand {

    /**
     * Execute the deletion of an attribute
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} attributeName The name of the attribute to delete
     */
    execute(obj, attributeName) {
        let attributes = obj.attributes || {};
        if (attributes.hasOwnProperty(attributeName) !== true) {
            throw new Error(`Attribute doesn't exist on archive: ${attributeName}`);
        }
        let deleted = delete attributes[attributeName];
        if (!deleted) {
            throw new Error("Failed deleting attribute");
        }
    }

}

module.exports = DeleteArchiveAttributeCommand;
