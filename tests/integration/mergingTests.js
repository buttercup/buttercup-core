var lib = require("../../source/module.js");
var Workspace = lib.Workspace,
    Archive = lib.Archive,
    createCredentials = lib.createCredentials,
    encodingTools = lib.tools.encoding;

const E = encodingTools.encodeStringValue;

module.exports = {
    setUp: function(cb) {
        var diffArchiveA = new Archive(),
            diffArchiveB = new Archive(),
            diffArchiveC = new Archive(),
            commonCommands = [
                "cgr 0 1",
                'tgr 1 "Main Group"',
                "pad 1",
                "cgr 1 2",
                'tgr 2 "Secondary Group"',
                "pad 2",
                "cen 1 1",
                'sep 1 title "My first entry"',
                "cgr 0 4",
                "pad 10",
                "dgr 4",
                "pad 3",
                'sep 1 username "anonymous"',
                'sep 1 password "retro"',
                'sea 1 "test" "test"',
                'cmm "before pad"',
                "pad 4"
            ],
            diffCommandsA = [
                "cgr 1 3",
                'tgr 3 "Third group"',
                "pad 5",
                'cmm "diff a"',
                "dgr 3",
                "pad 8",
                "dgr 1",
                "pad 9"
            ],
            diffCommandsB = ["cen 1 2", 'sep 2 title "My second entry"', "pad 6", 'sem 2 "country" "AU"', "pad 7"];
        commonCommands.concat(diffCommandsA).forEach(function(command) {
            diffArchiveA._getWestley().execute(command);
        });
        commonCommands.concat(diffCommandsB).forEach(function(command) {
            diffArchiveB._getWestley().execute(command);
        });
        commonCommands.forEach(function(command) {
            diffArchiveC._getWestley().execute(command);
        });

        this.diffArchiveA = diffArchiveA;
        this.diffArchiveB = diffArchiveB;
        this.diffArchiveC = diffArchiveC;

        this.diffWorkspace = new Workspace();
        this.diffWorkspace.setPrimaryArchive(
            diffArchiveB,
            {
                load: function() {
                    return Promise.resolve(diffArchiveA);
                }
            },
            createCredentials.fromPassword("fake")
        );

        this.emptyWorkspace = new Workspace();
        this.emptyWorkspace.setPrimaryArchive(
            diffArchiveA,
            {
                load: function() {
                    return Promise.resolve(diffArchiveC);
                }
            },
            createCredentials.fromPassword("fake")
        );

        cb();
    },

    testMock: function(test) {
        var diffArchiveA = this.diffArchiveA;
        this.diffWorkspace.primary.datasource
            .load()
            .then(function(archive) {
                test.strictEqual(archive, diffArchiveA, "Mock should return correct archive");
                test.done();
            })
            .catch(function(err) {
                console.error("Error:", err);
            });
    },

    doesntDeleteNonDestructiveCommands: function(test) {
        var workspace = this.diffWorkspace;
        workspace
            .mergeSaveablesFromRemote()
            .then(function() {
                var mergedHistory = workspace.primary.archive._getWestley().getHistory();
                test.ok(mergedHistory.indexOf(`tgr 3 "Third group"`) > 0, "Merged from group A");
                test.ok(mergedHistory.indexOf(`sep 2 title "My second entry"`) > 0, "Merged from group B");
                test.ok(mergedHistory.indexOf("pad 4") > 0, "Merged base");
                test.ok(mergedHistory.indexOf("dgr 1") < 0, "Filtered out deletion commands");
                test.ok(mergedHistory.indexOf("dgr 4") > 0, "Shared deletion commands persist");
                test.done();
            })
            .catch(function(err) {
                console.error("Error:", err);
            });
    },

    doesntDeleteDestructiveCommandsWhenNoConflict: function(test) {
        var workspace = this.emptyWorkspace;
        workspace
            .mergeSaveablesFromRemote()
            .then(function() {
                var mergedHistory = workspace.primary.archive._getWestley().getHistory();
                test.ok(mergedHistory.indexOf("dgr 3") > 0, "Group 3 should not have been deleted");
                test.ok(mergedHistory.indexOf("dgr 1") > 0, "Group 1 should not have been deleted");
                test.done();
            })
            .catch(function(err) {
                console.error("Error:", err);
            });
    }
};
