var cen = require("../../source/classes/commands/CreateEntryCommand.js");

module.exports = {

    setUp: function(cb) {
        this.command = new cen();
        (cb)();
    },

    errors: {

        testGroupNotFoundThrowsError: function (test) {
            var fakeSearching = {
                findGroupByID: function (a, b) {
                    return false;
                }
            };

            this.command.searchTools = fakeSearching;

            test.throws(
                function() {
                    this.command.execute({ }, 1, 1);
                }.bind(this),
                'Invalid group ID',
                'An error was thrown when no group found'
            );
            test.done();
        }

    },

    entry: {

        testOneEntryWhenInitiallyEmpty: function (test) {
            var fakeGroup = {
                entries: []
            };

            var fakeSearching = {
                findGroupByID: function (a, b) {
                    return fakeGroup;
                }
            };

            this.command.searchTools = fakeSearching;

            this.command.execute({ }, 1, 1);

            test.strictEqual(fakeGroup.entries.length, 1, 'One entry when initially empty');
            test.done();
        },

        testTwoEntriesWhenInitiallyOne: function (test) {
            var fakeGroup = {
                entries: [{
                    id: 1,
                    title: "a test entry"
                }]
            };

            var fakeSearching = {
                findGroupByID: function (a, b) {
                    return fakeGroup;
                }
            };

            this.command.searchTools = fakeSearching;

            this.command.execute({ }, 1, 2);

            test.strictEqual(fakeGroup.entries.length, 2, 'Two entries when initially one');
            test.done();
        },

        testExpectedIdWhenGiven1: function (test) {
            var expectedId = 1;
            var fakeGroup = {
                entries: []
            };

            var fakeSearching = {
                findGroupByID: function (a, b) {
                    return fakeGroup;
                }
            };

            var pushedId;
            fakeGroup.entries.push = function (entry) {
                pushedId = entry.id;
            };

            this.command.searchTools = fakeSearching;

            this.command.execute({ }, 1, expectedId);

            test.strictEqual(pushedId, expectedId, 'Entry pushed with expected id of ' + expectedId);
            test.done();
        },

        testExpectedIdWhenGiven50: function (test) {
            var expectedId = 50;
            var fakeGroup = {
                entries: []
            };

            var fakeSearching = {
                findGroupByID: function (a, b) {
                    return fakeGroup;
                }
            };

            var pushedId;
            fakeGroup.entries.push = function (entry) {
                pushedId = entry.id;
            };

            this.command.searchTools = fakeSearching;

            this.command.execute({ }, 1, expectedId);

            test.strictEqual(pushedId, expectedId, 'Entry pushed with expected id of ' + expectedId);
            test.done();
        }
    }
};
