const BaseCommand = require("./BaseCommand.js");

/**
 * Command for setting archive attributes
 * @class SetArchiveAttributeCommand
 * @augments BaseCommand
 */
class SetArchiveAttributeCommand extends BaseCommand {
    /**
     * Execute the setting of an attribute
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} attributeName The name of the attribute to set
     * @param {String} value The value to set
     */
    execute(obj, attributeName, value) {
        obj.attributes = obj.attributes || {};
        obj.attributes[attributeName] = value;
    }
}

module.exports = SetArchiveAttributeCommand;
