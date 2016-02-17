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
  },

  withoutParentId: {
    oneInObjectGroupsWhenZeroInitially: function(test) {
      var expectedLength = 1;

      var fakeObj = {
        groups: []
      };

      this.command.execute(fakeObj, 0, 1);

      test.strictEqual(fakeObj.groups.length, expectedLength, '1 in object groups when no parent and zero initially');
      test.done();
    },

    twoInObjectGroupsWhenOneInitially: function(test) {
      var expectedLength = 2;

      var fakeObj = {
        groups: [{
          id: 1,
          title: 'bla'
        }]
      };

      this.command.execute(fakeObj, 0, 1);

      test.strictEqual(fakeObj.groups.length, expectedLength, '2 in object groups when no parent and one initially');
      test.done();
    }
  }
};
