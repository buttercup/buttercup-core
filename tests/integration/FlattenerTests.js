var lib = require("../../source/module.js"),
    generate = require("../_helpers/generator.js");

var Archive = lib.Archive,
    Flattener = lib.Flattener;

module.exports = {
    setUp: function(cb) {
        this.archive = new Archive();
        this.flattener = new Flattener(this.archive._getWestley());
        cb();
    },

    testFlattensLargeArchive: function(test) {
        generate(5000, this.archive);
        test.ok(this.flattener.canBeFlattened(), "Archive should be flattenable");
        var historyCountBefore = this.archive._getWestley().getHistory().length;
        this.flattener.flatten();
        var historyCountAfter = this.archive._getWestley().getHistory().length;
        test.ok(historyCountAfter < historyCountBefore, "History should be shorter after flattening");
        test.done();
    }
};
