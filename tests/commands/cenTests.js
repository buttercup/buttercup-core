var cen = require("__buttercup/classes/commands/command.cen.js");

module.exports = {
  setUp: function(cb) {
    this.command = new cen();
    (cb)();
  },

  errors: {
    groupNotFoundThrowsError: function (test) {
      var fakeSearching = {
        findGroupByID: function (a, b) {
          return false;
        }
      };

      this.command.injectSearching(fakeSearching);

      test.throws(function() {
        this.command.execute({ }, 1, 1);
      }.bind(this), 'Invalid group ID', 'An error was thrown when no group found');
      test.done();
    }
  },
};
