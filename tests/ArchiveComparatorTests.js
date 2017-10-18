var lib = require("../source/node/index.js");

var Archive = lib.Archive;

var Comparator = require("../source/node/system/ArchiveComparator.js");

module.exports = {
    setUp: function(cb) {
        var archiveA = new Archive();
        archiveA._getWestley().execute("cgr 0 1");
        var archiveB = new Archive();
        archiveB._getWestley().execute("cgr 0 2");
        var archiveC = new Archive();
        archiveC._getWestley().execute("cgr 0 1");
        this.archiveA = archiveA;
        this.archiveB = archiveB;
        this.archiveC = archiveC;

        var diffArchiveA = new Archive(),
            diffArchiveB = new Archive(),
            commonCommands = [
                "cgr 0 1",
                'tgr 1 "Main Group"',
                "pad 1",
                "cgr 1 2",
                'tgr 2 "Secondary Group"',
                "pad 2",
                "cen 1 1",
                'sep 1 title "My first entry"',
                "pad 3",
                'sep 1 username "anonymous"',
                'sep 1 password "retro"',
                "pad 4",
                'cmm "after pad"'
            ],
            diffCommandsA = ["cgr 1 3", 'tgr 3 "Third group"', "pad 5", 'cmm "diff a"'],
            diffCommandsB = ["cen 1 2", 'sep 2 title "My second entry"', "pad 6", 'sem 2 "country" "AU"', "pad 7"];

        commonCommands.concat(diffCommandsA).forEach(function(command) {
            diffArchiveA._getWestley().execute(command);
        });
        commonCommands.concat(diffCommandsB).forEach(function(command) {
            diffArchiveB._getWestley().execute(command);
        });

        this.diffArchiveA = diffArchiveA;
        this.diffArchiveB = diffArchiveB;

        cb();
    },

    archivesDiffer: {
        testDifferent: function(test) {
            var comp = new Comparator(this.archiveA, this.archiveB);
            test.ok(comp.archivesDiffer() === true, "Archives should differ");
            test.done();
        },

        testSame: function(test) {
            var comp = new Comparator(this.archiveA, this.archiveC);
            test.ok(comp.archivesDiffer() === false, "Archives should be the same");
            test.done();
        }
    },

    calculateDifferences: {
        testCommonality: function(test) {
            var comp = new Comparator(this.diffArchiveA, this.diffArchiveB),
                differences = comp.calculateDifferences();
            test.strictEqual(
                differences.common[differences.common.length - 1],
                "pad 4",
                "Common history should end with padding"
            );
            test.done();
        },

        testDifferencesCount: function(test) {
            var comp = new Comparator(this.diffArchiveA, this.diffArchiveB),
                differences = comp.calculateDifferences();
            // expected lengths are +1 because of the common commands in the base array (comment)
            test.strictEqual(differences.original.length, 4 + 1, "Archive A should have 4 different commands");
            test.strictEqual(differences.secondary.length, 5 + 1, "Archive B should have 5 different commands");
            test.done();
        }
    }
};
