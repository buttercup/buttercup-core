var lib = require("__buttercup/module.js"),
	encoding = require("__buttercup/tools/encoding.js"),
	ManagedGroup = lib.ManagedGroup;

module.exports = {

	setUp: function(cb) {
		this.id = encoding.getUniqueID();
		this.group = new ManagedGroup(null, {
			id: this.id,
			title: "My group",
			attributes: {
				"test": "value"
			}
		});

		var groupTestArchive = new Archive(),
			groupTestID = encoding.getUniqueID(),
			groupTestEntryID = encoding.getUniqueID();
		[
			'cgr 0 ' + groupTestID,
			'tgr ' + groupTestID + ' "Main"',
			'sga ' + groupTestID + ' testAttr testValue',
			'cen ' + groupTestID + ' ' + groupTestEntryID,
			'sep ' + groupTestEntryID + ' title "My entry"'
		].forEach(function(command) {
			groupTestArchive._getWestley().execute(command);
		});
		this.group2 = groupTestArchive.getGroups()[0];
		this.group2ID = groupTestID;

		this.moveGroup = groupTestArchive.createGroup("Mover");

		(cb)();
	},

	getAttribute: {

		testGetsAttribute: function(test) {
			test.strictEqual(this.group2.getAttribute("testAttr"), "testValue", "Attribute value should be correct");
			test.strictEqual(this.group2.getAttribute("nothere"), undefined, "Non-existent should return undefined");
			test.done();
		}

	},

	getEntries: {

		testGetsEntries: function(test) {
			var entries = this.group2.getEntries();
			test.strictEqual(entries.length, 1, "One entry should be returned");
			test.done();
		}

	},

	getID: {

		testGetsID: function(test) {
			test.strictEqual(this.group2.getID(), this.group2ID, "ID should be correct");
			test.done();
		}

	},

	getTitle: {

		testGetsTitle: function(test) {
			test.strictEqual(this.group2.getTitle(), "Main", "Title should be correct");
			test.done();
		}

	},

	moveToGroup: {

		testMovesToAnotherGroup: function(test) {
			test.ok(this.group2.getGroups().length === 0, "Target group should have no children yet");
			this.moveGroup.moveToGroup(this.group2);
			test.ok(this.group2.getGroups().length === 1, "Target group should have the new child group");
			test.done();
		},

		testThrowsForTrashGroup: function(test) {
			this.moveGroup.setAttribute(ManagedGroup.Attributes.Role, "trash");
			test.throws(function() {
				this.moveGroup.moveToGroup(this.group2);
			}, null, "Should throw when trying to move");
			test.done();
		}

	},

	isTrash: {

		testReturnsCorrectly: function(test) {
			test.strictEqual(this.group2.isTrash(), false, "Group should not be trash yet");
			this.group2.setAttribute(ManagedGroup.Attributes.Role, "trash");
			test.strictEqual(this.group2.isTrash(), true, "Group should be trash");
			test.done();
		}

	},

	setAttribute: {

		testSetsAttribute: function(test) {
			this.group2.setAttribute("number", "two");
			test.strictEqual(this.group2.getAttribute("number"), "two", "Attribute should be set to the correct value");
			test.done();
		}

	},

	toObject: {

		testTransfersProperties: function(test) {
			var obj = this.group.toObject();
			test.strictEqual(obj.id, this.id, "Should transfer id");
			test.strictEqual(obj.title, "My group", "Should transfer title");
			test.strictEqual(Object.keys(obj).length, 3, "Only necessary properties should be transferred");
			test.strictEqual(obj.attributes.test, "value", "Attributes should be transferred");
			test.done();
		}

	}

};
