var lib = require("buttercup/module.js"),
	generate = require("./_helpers/generator.js");
	Archive = lib.Archive,
	Flattener = lib.Flattener;

module.exports = {

	setUp: function(cb) {
		this.archive = new Archive();
		this.flattener = new Flattener(this.archive._getWestley());
		(cb)();
	},

	preservation : {

		testRecognisesSmallHistorySets: function(test) {
			generate(450, this.archive);
			test.ok(!this.flattener.canBeFlattened(), "Should not be flattenable at too smaller size");
			generate(450, this.archive);
			test.ok(this.flattener.canBeFlattened(), "Should be flattenable at larger sizes");
			test.done();
		},

		testIgnoresIfTooLittleHistory: function(test) {
			generate(450, this.archive);
			var length = this.archive._getWestley().getHistory().length;
			test.ok(length <= this.flattener.getPreservationCount(),
				"Total generated length should be less than the preservation count (" + length + ")");
			this.flattener.flatten();
			test.strictEqual(this.archive._getWestley().getHistory().length, length,
				"Length should remain unchanged");
			test.done();
		}

	},

	stripping: {

		testStripsDeletionCommands: function(test) {
			generate(500, this.archive);
			this.archive._getWestley().getHistory().splice(500, 1000);
			test.ok(this.archive._getWestley().getHistory().length <= 500);
			this.flattener.flatten(true);
			var deleteCommands = 0;
			this.archive._getWestley().getHistory().forEach(function(command) {
				if (command.indexOf("den") === 0) {
					deleteCommands += 1;
				} else if (command.indexOf("dgr") === 0) {
					deleteCommands += 1;
				}
			});
			test.strictEqual(deleteCommands, 0,
				"There should be no delete-entry commands, but there were " + deleteCommands);
			test.done();
		},

		testKeepsFormatAndComments: function(test) {
			generate(500, this.archive);
			this.archive._getWestley().getHistory().splice(500, 1000);
			this.flattener.flatten(true);
			var fmt = 0,
				cmm = 0;
			this.archive._getWestley().getHistory().forEach(function(command) {
				if (command.indexOf("fmt") === 0) {
					fmt += 1;
				} else if (command.indexOf("cmm") === 0) {
					cmm += 1;
				}
			});
			test.strictEqual(fmt, 1, "There should be exactly 1 format command");
			test.ok(cmm > 0, "There should be at least 1 comment");
			test.done();
		}

	}

};
