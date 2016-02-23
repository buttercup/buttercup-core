var sga = require("__buttercup/classes/commands/command.sga.js");

module.exports = {
  setUp: function(cb) {
    this.command = new sga();
    (cb)();
  }
};
