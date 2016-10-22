"use strict";

const BaseCommand = require("./BaseCommand.js");

class CommentCommand extends BaseCommand {

    execute(obj, comment) {
        this.executeCallbacks("comment", comment);
    }

}

module.exports = CommentCommand;
