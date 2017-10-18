"use strict";

const BaseCommand = require("./BaseCommand.js");

/**
 * Command for padding
 * Padding is used to identify "blocks" of history.
 * @class PadCommand
 * @augments BaseCommand
 */
class PadCommand extends BaseCommand {
    execute(/*obj, padID*/) {}
}

module.exports = PadCommand;
