var cgr = require("__buttercup/classes/commands/command.cgr.js");

module.exports = {
  setUp: function(cb) {
    this.command = new cgr();
    (cb)();
  },

  errors: {
    parentGroupIdNotFound: function(test) {
      var fakeSearching = {
        findGroupByID: function(a, b) {
          return false;
        }
      };

      var parentId = 1;

      test.throws(function() {
        this.command.execute({ }, parentId, 0);
      }.bind(this), 'Invalid parent group ID: not found', 'An error was thrown when no group found');
      test.done();
    }
  }
};
