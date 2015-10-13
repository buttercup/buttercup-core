(function() {

	"use strict";

	// var Westley = require("./classes/WestleyParser.js"),
	// 	library = require("./module.js"),
	// 	encoding = require("./tools/encoding.js"),
	// 	signing = require("./tools/signing.js");

	// var mainGroupID = encoding.getUniqueID(),
	// 	secondGroupID = encoding.getUniqueID(),
	// 	thirdGroupID = encoding.getUniqueID(),
	// 	firstEntryID = encoding.getUniqueID(),
	// 	secondEntryID = encoding.getUniqueID();

	// var parser = new Westley();
	// [
	// 	'cmm "This is \\\" a new \\\" comment"',
	// 	'fmt ' + signing.getFormat(),
	// 	'cgr 0 ' + mainGroupID,
	// 	'tgr ' + mainGroupID + ' "First group"',
	// 	'cen ' + mainGroupID + ' ' + firstEntryID,
	// 	'sep ' + firstEntryID + ' title "Blog login"',
	// 	'sem ' + firstEntryID + ' "security key" "9924dd--..$#(*&^)&*#^$% ;; !![]\\\"\\\"..."',

	// 	'cgr ' + mainGroupID + ' ' + secondGroupID,
	// 	'tgr ' + secondGroupID + ' "Second group"',
	// 	'cen ' + secondGroupID + ' ' + secondEntryID,
	// 	'sep ' + secondEntryID + ' title "Second entry"',
	// 	'men ' + secondEntryID + ' ' + mainGroupID,

	// 	'cgr ' + secondGroupID + ' ' + thirdGroupID,
	// 	'tgr ' + thirdGroupID + ' "Third group"',
	// 	'mgr ' + thirdGroupID + ' ' + mainGroupID,
	// 	'mgr ' + thirdGroupID + ' ' + '0'
	// ].forEach(function(command) {
	// 	parser.execute(command);
	// });

	// console.log(JSON.stringify(parser._dataset));


	var library = require("./module.js"),
		Archive = library.Archive;

	var archive = new Archive();
	var group = archive.createGroup("test");
	var entry = group.createEntry("Monkey");

	console.log(JSON.stringify(archive._getWestley()._dataset));
	console.log("---\n" + archive._getWestley().getHistory().join("\n") + "\n---");

})();