var lib = require("../source/module.js"),
	Archive = lib.Archive,
	ManagedGroup = lib.ManagedGroup;

module.exports = {

	setUp: function(cb) {
		var archiveA = new Archive(),
			commonCommands = [
				'cgr 0 1',
				'tgr 1 "Main Group"',
				'pad 1',
				'cgr 1 2',
				'tgr 2 "Secondary Group',
				'pad 2',
				'cen 1 1',
				'sep 1 title "My first entry"',
				'pad 3',
				'sep 1 username "anonymous"',
				'sep 1 password "retro"',
				'pad 4',
				'cmm "after pad"',
				'cgr 0 3',
				'tgr 3 "Websites"',
				'pad 5'
			];
		commonCommands.forEach(function(command) {
			archiveA._getWestley().execute(command);
		});

		this.archiveA = archiveA;

		cb();
	},

	getGroups: {

		testGetsAll: function(test) {
			var groups = this.archiveA.getGroups();
			test.strictEqual(groups.length, 2, "Archive root should contain 2 groups");
			test.done();
		},

		testGroupTypes: function(test) {
			var groups = this.archiveA.getGroups();
			groups.forEach(function(group) {
				test.ok(group instanceof ManagedGroup, "Groups should be ManagedGroup instances");
			});
			test.done();
		}

	}

};