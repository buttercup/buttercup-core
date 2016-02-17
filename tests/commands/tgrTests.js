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
  },

  titleSet: {
    titleSetCorrectlyForBla: function (test) {
      var expectedTitle = 'Bla';
      var command = new tgr();

      var fakeGroup = {
        title: ''
      };

      var fakeSearching = {
        findGroupByID: function (a, b) {
          return fakeGroup;
        }
      };

      command.injectSearching(fakeSearching);

      command.execute({ }, 1, expectedTitle);

      test.strictEqual(fakeGroup.title, expectedTitle, 'The title was set to ' + expectedTitle + ' correctly');
      test.done();
    },

    titleSetCorrectlyForJames: function (test) {
      var expectedTitle = 'James';
      var command = new tgr();

      var fakeGroup = {
        title: ''
      };

      var fakeSearching = {
        findGroupByID: function (a, b) {
          return fakeGroup;
        }
      };

      command.injectSearching(fakeSearching);

      command.execute({ }, 1, expectedTitle);

      test.strictEqual(fakeGroup.title, expectedTitle, 'The title was set to ' + expectedTitle + ' correctly');
      test.done();
    }
  }
};
