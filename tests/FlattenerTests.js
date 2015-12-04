var lib = require("../source/module.js"),
	generate = require("./_helpers/generator.js");
	Archive = lib.Archive,
	Flattener = lib.Flattener;

module.exports = {

	setUp: function(cb) {
		this.archive = new Archive();
		this.flattener = new Flattener(this.archive._getWestley());
		(cb)();
	},

	stripping: {

		testStripsDeletionCommands: function(test) {
			generate(500, this.archive);
			this.archive._getWestley().getHistory().splice(500, 1000);
			test.ok(this.archive._getWestley().getHistory().length <= 500);
			this.flattener.flatten();
			var deleteCommands = 0;
			this.archive._getWestley().getHistory().forEach(function(command) {
				if (command.indexOf("den") === 0) {
					deleteCommands += 1;
				}
			});
			test.strictEqual(deleteCommands, 0,
				"There should be no delete-entry commands, but there were " + deleteCommands);
			test.done();
		}

	}

};
