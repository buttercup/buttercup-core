var lib = require("../../source/module.js"),
	generate = require("../_helpers/generator.js"),
	Archive = lib.Archive,
	Westley = lib.Westley,
	describe = lib.Descriptor;

module.exports = {

	setUp: function(cb) {
		this.archive = new Archive();
		(cb)();
	},

	testDescribesGenerated: function(test) {
		generate(500, this.archive);
		var originalDataset = this.archive._getWestley().getDataset(),
			description = describe(originalDataset),
			newWestley = new Westley();
		description.forEach(newWestley.execute.bind(newWestley));
		test.deepEqual(newWestley.getDataset(), originalDataset, "Datasets should be the same");
		test.done();
	}

};
