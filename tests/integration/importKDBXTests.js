var lib = require("../../source/module.js"),
	KeePass2XMLImporter = lib.KeePass2XMLImporter,
	ManagedGroup = lib.ManagedGroup;

module.exports = {

	setUp: function(cb) {
		var _this = this;
		KeePass2XMLImporter.loadFromFile(__dirname + "/../_resources/test.kdbx.xml")
			.then(function(importer) {
				return importer.exportArchive();
			})
			.then(function(archive) {
				_this.archive = archive;
				_this.history = archive._getWestley().getHistory().join("\n");
				(cb)();
			})
			.catch(function(err) {
				console.error("Failed importing:", err);
			});
	},

	containsInHistory: {

		testContainsNotes: function(test) {
			test.ok(
				this.history.indexOf("Hello. My name is Inigo Montoya. You killed my father. Prepare to die.") > 0,
				"History should contain notes"
			);
			test.done();
		},

		testContainsPassword: function(test) {
			test.ok(this.history.indexOf("test password") > 0, "History should contain password");
			test.done();
		}

	},

	containsItems: {

		testContainsRootGroup: function(test) {
			var buttercupGroup = null;
			this.archive.getGroups().forEach(function(group) {
				if (group.getTitle() === "Buttercup") {
					buttercupGroup = group;
				}
			});
			test.ok(buttercupGroup instanceof ManagedGroup, "Imported archive should contain root group");
			test.done();
		}

	}

};