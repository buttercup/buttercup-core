const BaseCommand = require("./BaseCommand.js");

/**
 * Command for setting the archive ID
 * @class FormatCommand
 * @augments BaseCommand
 */
class ArchiveIDCommand extends BaseCommand {
    /**
     * Execute the setting of the ID
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} id The archive ID
     */
    execute(obj, id) {
        if (obj.archiveID) {
            // ID already set
            throw new Error("ID already set");
        }
        obj.archiveID = id;
    }
}

module.exports = ArchiveIDCommand;
