"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for archive comments
 * @class CommentCommand
 * @augments BaseCommand
 */
class CommentCommand extends BaseCommand {
    /**
     * Execute comment callbacks
     * @param {ArchiveDataset} obj The archive dataset
     * @param {String} comment The comment
     * @see BaseCommand.executeCallbacks
     */
    execute(obj, comment) {
        this.executeCallbacks("comment", comment);
    }
}

module.exports = CommentCommand;
