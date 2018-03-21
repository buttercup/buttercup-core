var tgr = require("../../source/node/system/commands/TitleGroupCommand.js");

module.exports = {
    setUp: function(cb) {
        this.command = new tgr();
        cb();
    },

    errors: {
        testGroupNotFoundThrowsError: function(test) {
            var fakeSearching = {
                findGroupByID: function(a, b) {
                    return false;
                }
            };

            this.command.searchTools = fakeSearching;

            test.throws(
                function() {
                    this.command.execute({}, 1, "a");
                }.bind(this),
                "Group not found for ID",
                "An error was thrown when no group found"
            );
            test.done();
        }
    },

    titleSet: {
        testTitleSetCorrectlyForBla: function(test) {
            var expectedTitle = "Bla";
            var command = new tgr();

            var fakeGroup = {
                title: ""
            };

            var fakeSearching = {
                findGroupByID: function(a, b) {
                    return fakeGroup;
                }
            };

            this.command.searchTools = fakeSearching;

            this.command.execute({}, 1, expectedTitle);

            test.strictEqual(fakeGroup.title, expectedTitle, "The title was set to " + expectedTitle + " correctly");
            test.done();
        },

        testTitleSetCorrectlyForJames: function(test) {
            var expectedTitle = "James";
            var command = new tgr();

            var fakeGroup = {
                title: ""
            };

            var fakeSearching = {
                findGroupByID: function(a, b) {
                    return fakeGroup;
                }
            };

            command.searchTools = fakeSearching;

            command.execute({}, 1, expectedTitle);

            test.strictEqual(fakeGroup.title, expectedTitle, "The title was set to " + expectedTitle + " correctly");
            test.done();
        }
    }
};
