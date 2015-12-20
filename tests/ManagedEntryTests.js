var lib = require("buttercup/module.js"),
	encoding = require("buttercup/tools/encoding.js"),
	entryTools = require("buttercup/tools/entry.js"),
	Archive = lib.Archive;

module.exports = {

	setUp: function(cb) {
		var archive = new Archive(),
			group = archive.createGroup("test group");
			entry = group.createEntry("My entry");
		entry
			.setProperty("username", "some-user")
			.setProperty("password", "passw0rd")
			.setMeta("accessKey", "12345")
			.setMeta("user prop", "user val")
			.setAttribute("BC_ENTRY_SEQ", "sequence");
		this.id = entry.getID();
		this.entry = entry;
		(cb)();
	},

	deleteMeta: {

		testDeletesProperties: function(test) {
			test.strictEqual(this.entry.getMeta("accessKey"), "12345", "Entry should contain meta item");
			this.entry.deleteMeta("accessKey");
			test.strictEqual(this.entry.getMeta("accessKey"), undefined, "Meta item should be deleted");
			test.done();
		}

	},

	getMeta: {

		testGetsMeta: function(test) {
			test.strictEqual(this.entry.getMeta("accessKey"), "12345", "Entry should contain meta");
			test.strictEqual(this.entry.getMeta("user prop"), "user val", "Entry should contain meta");
			test.done();
		},

		testUnsetReturnsUndefined: function(test) {
			test.strictEqual(this.entry.getMeta("not set"), undefined, "Should return undefined");
			test.done();
		}

	},

	getAttribute: {

		testGetsAttribute: function(test) {
			test.strictEqual(this.entry.getAttribute("BC_ENTRY_SEQ"), "sequence", "Entry should contain attribute");
			test.done();
		},

		testUnsetReturnsUndefined: function(test) {
			test.strictEqual(this.entry.getAttribute("not set"), undefined, "Should return undefined");
			test.done();
		}

	},

	getProperty: {

		testGetsProperties: function(test) {
			test.strictEqual(this.entry.getProperty("title"), "My entry", "Should return title");
			test.strictEqual(this.entry.getProperty("username"), "some-user", "Should return username");
			test.strictEqual(this.entry.getProperty("password"), "passw0rd", "Should return password");
			test.done();
		},

		testUnsetReturnsUndefined: function(test) {
			test.strictEqual(this.entry.getProperty("unset"), undefined, "Should return undefined");
			test.done();
		}

	},

	toObject: {

		testTransfersProperties: function(test) {
			var obj = this.entry.toObject();
			test.strictEqual(obj.id, this.id, "Should transfer id");
			test.strictEqual(obj.properties.title, "My entry", "Should transfer title");
			test.strictEqual(obj.properties.username, "some-user", "Should transfer username");
			test.strictEqual(obj.properties.password, "passw0rd", "Should transfer password");
			test.strictEqual(Object.keys(obj).length, 3, "Only id, properties and meta should be transferred");
			test.done();
		},

		testTransfersMeta: function(test) {
			var meta = this.entry.toObject().meta;
			test.strictEqual(meta.accessKey, "12345", "Should transfer meta");
			test.strictEqual(meta["user prop"], "user val", "Should transfer custom meta values");
			test.strictEqual(Object.keys(meta).length, 2, "Should only transfer necessary meta properties");
			test.done();
		}

	}

};
