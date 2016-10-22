const BaseCommand = require("./BaseCommand.js");

class FormatCommand extends BaseCommand {

    execute(obj, format) {
        obj.format = format;
    }

}

module.exports = FormatCommand;
