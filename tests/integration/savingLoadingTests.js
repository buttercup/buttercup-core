var lib = require("../../source/module.js"),
	Archive = lib.Archive,
	FileDatasource = lib.FileDatasource,
	fs = require("fs");

module.exports = {

	setUp: function(cb) {
		(cb)();
	},

	testSavesAndLoads: function(test) {
		var archiveBefore = new Archive(),
			mainGroupBefore = archiveBefore.createGroup("1 2 3"),
			fds = new FileDatasource("./test-archive.bcup");
		for (var i = 0; i < 100; i += 1) {
			mainGroupBefore.createEntry("Entry #" + i);
		}
		fds.save(archiveBefore, "my pass12")
			.then(function() {
				return fds.load("my pass12")
					.then(function(archiveAfter) {
						var groups = archiveAfter.getGroups();
						test.strictEqual(groups.length, 1, "There should be 1 group");
						test.strictEqual(groups[0].getTitle(), "1 2 3", "Group should have the correct title");
						fs.unlinkSync("./test-archive.bcup");
						test.done();
					});
			});
	}

};
