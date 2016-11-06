var lib = require("../../source/module.js"),
    generate = require("../_helpers/generator.js");

var Archive = lib.Archive,
    Westley = lib.Westley,
    describe = lib.Descriptor;

function stripEmptyArrays(dataset) {
    if (dataset.entries && dataset.entries.length <= 0) {
        delete dataset.entries;
    }
    if (dataset.groups) {
        if (dataset.groups.length <= 0) {
            delete dataset.groups;
        } else {
            dataset.groups.forEach(stripEmptyArrays);
        }
    }
}

module.exports = {

    setUp: function(cb) {
        this.archive = new Archive();
        (cb)();
    },

    describesGenerated: function(test) {
        generate(500, this.archive);
        var originalDataset = this.archive._getWestley().getDataset(),
            description = describe(originalDataset),
            newWestley = new Westley();
        stripEmptyArrays(originalDataset);
        description.forEach(newWestley.execute.bind(newWestley));
        test.deepEqual(newWestley.getDataset(), originalDataset, "Datasets should be the same");
        test.done();
    },

    preservesArchiveID: function(test) {
        generate(500, this.archive);
        var archiveID = this.archive.getID(),
            originalDataset = this.archive._getWestley().getDataset(),
            description = describe(originalDataset),
            newWestley = new Westley();
        stripEmptyArrays(originalDataset);
        description.forEach(newWestley.execute.bind(newWestley));
        test.strictEqual(newWestley.getDataset().archiveID, archiveID, "Archive ID should be present");
        test.done();
    }

};
