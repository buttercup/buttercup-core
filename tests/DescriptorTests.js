var lib = require("buttercup/module.js"),
	describe = lib.Descriptor,
	encoding = require("buttercup/tools/encoding.js"),
	getUniqueID = encoding.getUniqueID;

module.exports = {

	setUp: function(cb) {
		(cb)();
	},

	basicStructures : {

		testDescribesBasicStructures: function(test) {
			var groupID = getUniqueID(),
				subGroupID = getUniqueID(),
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
								password: "code",
								meta: {
									metaItem1: "123 456"
								},
								attributes: {
									"my attribute": "attr value"
								}
							}
						],
						groups: [
							{
								id: subGroupID,
								title: "Sub"
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
			test.ok(description.indexOf("sem " + entryID + " \"metaItem1\" \"123 456\"") >= 0, "Entry should have meta");
			test.ok(description.indexOf("sea " + entryID + " \"my attribute\" \"attr value\"") >= 0, "Entry should have attribute");
			test.ok(description.indexOf("cgr " + groupID + " " + subGroupID) >= 0, "Sub-group should be created");
			test.ok(description.indexOf("tgr " + subGroupID + " \"Sub\"") >= 0, "Sub-group should be titled");
			test.done();
		}

	}

};
