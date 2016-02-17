var lib = require("__buttercup/module.js"),
	encoding = require("__buttercup/tools/encoding.js"),
	Archive = lib.Archive,
	ManagedGroup = lib.ManagedGroup;

module.exports = {

	setUp: function(cb) {
		var archiveA = new Archive(),
			mainGroupID = encoding.getUniqueID(),
			secondaryGroupID = encoding.getUniqueID(),
			entry1ID = encoding.getUniqueID(),
			thirdGroupID = encoding.getUniqueID(),
			commonCommands = [
				'cgr 0 ' + mainGroupID,
				'tgr ' + mainGroupID + ' "Main Group"',
				'pad ' + encoding.getUniqueID(),
				'cgr ' + mainGroupID + ' ' + secondaryGroupID,
				'tgr ' + secondaryGroupID + ' "Secondary Group"',
				'pad ' + encoding.getUniqueID(),
				'cen ' + mainGroupID + ' ' + entry1ID,
				'sep ' + entry1ID + ' title "My first entry"',
				'pad ' + encoding.getUniqueID(),
				'sep ' + entry1ID + ' username "anonymous"',
				'sep ' + entry1ID + ' password "retro"',
				'pad ' + encoding.getUniqueID(),
				'cmm "after pad"',
				'cgr 0 ' + thirdGroupID,
				'tgr ' + thirdGroupID + ' "Websites"',
				'pad ' + encoding.getUniqueID()
			];
		commonCommands.forEach(function(command) {
			archiveA._getWestley().execute(command);
		});

		this.archiveA = archiveA;
		this.entry1ID = entry1ID;
		this.group2ID = secondaryGroupID;
		this.group3ID = thirdGroupID;

		cb();
	},

	createWithDefaults: {

		testCreatesGeneralGroup: function(test) {
			var archive = Archive.createWithDefaults(),
				firstGroup = archive.getGroups()[0];
			test.strictEqual(firstGroup.getTitle(), "General", "First group should be 'General'");
			test.done();
		},

		testCreatesTrashGroup: function(test) {
			var archive = Archive.createWithDefaults(),
				firstGroup = archive.getGroups()[1];
			test.strictEqual(firstGroup.getTitle(), "Trash", "First group should be 'Trash'");
			test.strictEqual(firstGroup.isTrash(), true, "First group should be of type 'trash'");
			test.done();
		}

	},

	getEntryByID: {

		testGetsEntryIfExists: function(test) {
			var entry = this.archiveA.getEntryByID(this.entry1ID);
			test.strictEqual(entry.getProperty("title"), "My first entry");
			test.strictEqual(entry.getProperty("username"), "anonymous");
			test.strictEqual(entry.getProperty("password"), "retro");
			test.done();
		},

		testGetsNullIfNotFound: function(test) {
			var entry = this.archiveA.getEntryByID("999");
			test.strictEqual(entry, null, "Entry should not exist");
			test.done();
		}

	},

	getGroupByID: {

		testGetsGroupIfExists: function(test) {
			var group = this.archiveA.getGroupByID(this.group2ID);
			test.strictEqual(group.getTitle(), "Secondary Group");
			test.done();
		},

		testGetsNullIfNotFound: function(test) {
			var group = this.archiveA.getGroupByID("999");
			test.strictEqual(group, null, "Group should not exist");
			test.done();
		}

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

	},

	getTrashGroup: {

		testReturnsNullIfNotPresent: function(test) {
			var trashGroup = this.archiveA.getTrashGroup();
			test.strictEqual(trashGroup, null, "No trash group should be present");
			test.done();
		},

		testReturnsGroupIfPresent: function(test) {
			var group = this.archiveA.getGroupByID(this.group3ID);
			group.setAttribute(ManagedGroup.Attributes.Role, "trash");
			var trashGroup = this.archiveA.getTrashGroup();
			test.strictEqual(trashGroup.getID(), group.getID(), "Trash group should be present");
			test.done();
		}

	},

	containsGroupWithTitle: {

		testReturnsTrueForMainGroup: function(test) {
			var hasMainGroup = this.archiveA.containsGroupWithTitle('Main Group');
			test.strictEqual(hasMainGroup, true, "Archive should have group 'Main Group'");
			test.done();
		},

		testReturnsTrueForSecondaryGroup: function(test) {
			var hasSecondaryGroup = this.archiveA.containsGroupWithTitle('Secondary Group');
			test.strictEqual(hasSecondaryGroup, true, "Archive should have group 'Secondary Group'");
			test.done();
		},

		testReturnsFalseForNonExistentTestGroup: function(test) {
			var hasNonExistentTestGroup = this.archiveA.containsGroupWithTitle('Non Existent Test Group');
			test.strictEqual(hasNonExistentTestGroup, false, "Archive should not have group 'Non Existent Test Group'");
			test.done();
		}

	}

};
