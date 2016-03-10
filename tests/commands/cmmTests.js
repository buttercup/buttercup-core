var cmm = require("__buttercup/classes/commands/command.cmm.js");

module.exports = {
    setUp: function(cb) {
        this.command = new cmm();
        (cb)();
    }
};
