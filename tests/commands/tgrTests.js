var tgr = require("__buttercup/classes/commands/command.tgr.js");

module.exports = {
  errors: {
    groupNotFoundThrowsError: function (test) {
      var command = new tgr();

      var fakeSearching = {
        findGroupByID: function (a, b) {
          return false;
        }
      };

      command.injectSearching(fakeSearching);

      test.throws(function() {
        command.execute({ }, 1, 'a');
      }, 'Group not found for ID', 'An error was thrown when no group found');
      test.done();
    }
  }
};
