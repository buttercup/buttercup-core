var lib = require("../source/module.js"),
	encoding = require(GLOBAL.root + "/tools/encoding.js"),
	entryTools = require(GLOBAL.root + "/tools/entry.js"),
	ManagedEntry = lib.ManagedEntry;

module.exports = {

	setUp: function(cb) {
		this.id = encoding.getUniqueID();
		var entryData = {
			id: this.id,
			title: "My entry",
			username: "some-user",
			password: "passw0rd",
			meta: {
				accessKey: "12345",
				"user prop": "user val"
			}
		};
		this.entry = new ManagedEntry(null, entryData);
		(cb)();
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
