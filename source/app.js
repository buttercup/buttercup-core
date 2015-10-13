(function() {

	"use strict";

	var Westley = require("./classes/WestleyParser.js"),
		library = require("./module.js"),
		encoding = require("./tools/encoding.js"),
		signing = require("./tools/signing.js");

	var mainGroupID = encoding.getUniqueID(),
		secondGroupID = encoding.getUniqueID(),
		thirdGroupID = encoding.getUniqueID(),
		firstEntryID = encoding.getUniqueID(),
		secondEntryID = encoding.getUniqueID();

	var parser = new Westley();
	[
		'cmm "This is \\\" a new \\\" comment"',
		'fmt ' + signing.getFormat(),
		'cgr 0 ' + mainGroupID,
		'tgr ' + mainGroupID + ' "First group"',
		'cen ' + mainGroupID + ' ' + firstEntryID,
		'sep ' + firstEntryID + ' title "Blog login"',
		'sem ' + firstEntryID + ' "security key" "9924dd--..$#(*&^)&*#^$% ;; !![]\\\"\\\"..."',

		'cgr ' + mainGroupID + ' ' + secondGroupID,
		'tgr ' + secondGroupID + ' "Second group"',
		'cen ' + secondGroupID + ' ' + secondEntryID,
		'sep ' + secondEntryID + ' title "Second entry"',
		'men ' + secondEntryID + ' ' + mainGroupID,

		'cgr ' + secondGroupID + ' ' + thirdGroupID,
		'tgr ' + thirdGroupID + ' "Third group"',
		'mgr ' + thirdGroupID + ' ' + mainGroupID,
		'mgr ' + thirdGroupID + ' ' + '0'
	].forEach(function(command) {
		parser.execute(command);
	});

	console.log(JSON.stringify(parser._dataset));

	/*var Buttercup = require(__dirname + "/module.js"),
		Dataset = require(__dirname + "/classes/Dataset.js"),
		VaultGroup = require(__dirname + "/classes/VaultGroup.js"),
		VaultEntry = require(__dirname + "/classes/VaultEntry.js"),
		FileDatasource = require(__dirname + "/classes/FileDatasource.js");

	var datasource = new FileDatasource("/Users/pez/temp.bcp");

	var dataset = new Dataset();
	dataset._title = "Perry's archive";

	var mainGroup = new VaultGroup({ title: "Main group" }),
		subGroup = new VaultGroup({ title: "Sub group" });
	mainGroup.addChildGroups(subGroup);
	dataset.addGroup(mainGroup);

	var entry1 = new VaultEntry({
		title: "hotmail email",
		username: "perry@hotmail.com",
		password: "123&dd. #"
	});
	subGroup.addEntries(entry1);

	dataset
		.saveToDatasource(datasource, "encryption is amazing...")
		.then(function() {
			Dataset.loadFromDatasource(datasource, "encryption is amazing...")
				.then(function(datasource2) {
					console.log("D2", JSON.stringify(datasource2.toRaw()));
				});
		});*/

})();