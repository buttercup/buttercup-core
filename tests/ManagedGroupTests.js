var lib = require("../source/module.js"),
	encoding = require(GLOBAL.root + "/tools/encoding.js"),
	ManagedGroup = lib.ManagedGroup;

module.exports = {

	setUp: function(cb) {
		this.id = encoding.getUniqueID();
		this.group = new ManagedGroup(null, {
			id: this.id,
			title: "My group"
		});
		(cb)();
	},

	toObject: {

		testTransfersProperties: function(test) {
			var obj = this.group.toObject();
			test.strictEqual(obj.id, this.id, "Should transfer id");
			test.strictEqual(obj.title, "My group", "Should transfer title");
			test.strictEqual(Object.keys(obj).length, 2, "Only necessary properties should be transferred");
			test.done();
		}

	}

};
