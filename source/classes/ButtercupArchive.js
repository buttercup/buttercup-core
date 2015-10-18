(function(module) {

	"use strict";

	var Westley = require(__dirname + "/WestleyParser.js"),
		Inigo = require(__dirname + "/InigoGenerator.js"),
		ManagedGroup = require(__dirname + "/ManagedGroup.js");

	var signing = require(GLOBAL.root + "/tools/signing.js"),
		searching = require(GLOBAL.root + "/tools/searching.js");

	var Archive = function() {
		this._westley = new Westley();
		this._getWestley().execute(
			Inigo.create(Inigo.Command.Comment)
				.addArgument('Buttercup archive created (todo: date)')
				.generateCommand()
		);
		this._getWestley().execute(
			Inigo.create(Inigo.Command.Format)
				.addArgument(signing.getFormat())
				.generateCommand()
		);
	};

	Archive.prototype.createGroup = function(title) {
		var managedGroup = ManagedGroup.createNew(this._getWestley());
		if (title) {
			managedGroup.setTitle(title);
		}
		return managedGroup;
	};

	Archive.prototype.getGroups = function() {
		var westley = this._getWestley();
		return (westley.getDataset().groups || []).map(function(rawGroup) {
			return new ManagedGroup(westley, rawGroup);
		});
	};

	Archive.prototype._getWestley = function() {
		return this._westley;
	};

	module.exports = Archive;

})(module);
