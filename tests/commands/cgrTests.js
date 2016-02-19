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
    },

    correctIdWhenGroupAddedWithIdOne: function(test) {
      var expectedId = 1;

      var fakeObj = {
        groups: []
      };

      this.command.execute(fakeObj, 0, expectedId);

      test.strictEqual(fakeObj.groups[0].id, expectedId, 'New group has correct id when added with id ' + expectedId);
      test.done();
    },

    correctIdWhenGroupAddedWithIdFifty: function(test) {
      var expectedId = 50;

      var fakeObj = {
        groups: []
      };

      this.command.execute(fakeObj, 0, expectedId);

      test.strictEqual(fakeObj.groups[0].id, expectedId, 'New group has correct id when added with id ' + expectedId);
      test.done();
    }
  },

  withParentId: {
    searchesForParentIdWhenParentIdOne: function(test) {
      var submittedParentId = 1;
      var searchingCalled = false;

      var fakeSearching = {
        findGroupByID: function(groups, id) {
          if (id === submittedParentId) {
            searchingCalled = true;
          }

          return {};
        }
      };

      this.command.injectSearching(fakeSearching);

      this.command.execute({ }, submittedParentId, 5);

      test.strictEqual(searchingCalled, true, 'Searched for parent id ' + submittedParentId);
      test.done();
    },

    searchesForParentIdWhenParentIdTwenty: function(test) {
      var submittedParentId = 20;
      var searchingCalled = false;

      var fakeSearching = {
        findGroupByID: function(groups, id) {
          if (id === submittedParentId) {
            searchingCalled = true;
          }

          return {};
        }
      };

      this.command.injectSearching(fakeSearching);

      this.command.execute({ }, submittedParentId, 5);

      test.strictEqual(searchingCalled, true, 'Searched for parent id ' + submittedParentId);
      test.done();
    },

    oneGroupInParentWhenInitiallyEmpty: function(test) {
      var fakeParent = {
        groups: []
      };

      var fakeSearching = {
        findGroupByID: function(groups, id) {
          return fakeParent;
        }
      };

      this.command.injectSearching(fakeSearching);

      this.command.execute({ }, 1, 1);

      test.strictEqual(fakeParent.groups.length, 1, 'One group in the parent when executed on an empty group');
      test.done();
    },

    threeGroupsInParentWhenInitiallyTwo: function(test) {
      var fakeParent = {
        groups: [{}, {}]
      };

      var fakeSearching = {
        findGroupByID: function(groups, id) {
          return fakeParent;
        }
      };

      this.command.injectSearching(fakeSearching);

      this.command.execute({ }, 1, 1);

      test.strictEqual(fakeParent.groups.length, 3, 'Three group in the parent when executed on a group with two');
      test.done();
    }
  }
};
