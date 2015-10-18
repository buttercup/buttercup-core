var lib = require("../../source/module.js"),
	KeePass2XMLImporter = lib.KeePass2XMLImporter,
	ManagedGroup = lib.ManagedGroup,
	ManagedEntry = lib.ManagedEntry;

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
			var buttercupGroup = this.archive.getGroups()[0];
			test.ok(buttercupGroup instanceof ManagedGroup, "Imported archive should contain root group");
			test.done();
		},

		testContainsSubGroup: function(test) {
			var buttercupGroup = this.archive.getGroups()[0],
				generalGroup = buttercupGroup.getGroups().filter(function(group) {
					return group.getTitle() === "General";
				})[0];
			test.ok(generalGroup instanceof ManagedGroup, "Imported archive should contain sub group");
			test.done();
		},

		testContainsSampleEntry: function(test) {
			var buttercupGroup = this.archive.getGroups()[0],
				sampleEntry = buttercupGroup.getEntries()[0];
			test.ok(sampleEntry instanceof ManagedEntry, "Imported archive should contain sample entry");
			test.strictEqual(sampleEntry.getProperty("title"), "Buttercup test", "Sample title should match");
			test.strictEqual(sampleEntry.getProperty("username"), "buttercup", "Sample username should match");
			test.strictEqual(sampleEntry.getProperty("password"), "test password", "Sample password should match");
			test.ok(sampleEntry.getMeta("Notes").indexOf("You killed my father.") > 0,
				"Sample entry should contain notes");
			test.strictEqual(sampleEntry.getMeta("Buttercup"), "I will never love again.",
				"Sample entry should contain meta properties");
			test.done();
		}

	}

};