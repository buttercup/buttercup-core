var lib = require("../source/module.js"),
	generate = require("./_helpers/generator.js");
	Archive = lib.Archive,
	describe = lib.Descriptor,
	encoding = require(GLOBAL.root + "/tools/encoding.js"),
	getUniqueID = encoding.getUniqueID;

module.exports = {

	setUp: function(cb) {
		(cb)();
	},

	basicStructures : {

		testDescribesBasicStructures: function(test) {
			var groupID = getUniqueID(),
				entryID = getUniqueID();
			var dataset = {
				groups: [
					{
						id: groupID,
						title: "Main",
						entries: [
							{
								id: entryID,
								title: "Website",
								username: "name",
								password: "code"
							}
						]
					}
				]
			};
			var description = describe(dataset);
			test.ok(description.indexOf("cgr 0 " + groupID) >= 0, "Group should be created");
			test.ok(description.indexOf("tgr " + groupID + " \"Main\"") >= 0, "Group should be titled");
			test.ok(description.indexOf("cen " + groupID + " " + entryID) >= 0, "Entry should be created");
			test.ok(description.indexOf("sep " + entryID + " title \"Website\"") >= 0, "Entry should have title");
			test.ok(description.indexOf("sep " + entryID + " username \"name\"") >= 0, "Entry should have username");
			test.ok(description.indexOf("sep " + entryID + " password \"code\"") >= 0, "Entry should have password");
			test.done();
		}

	}

};
