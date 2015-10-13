(function(module) {

	"use strict";

	var Westley = require(__dirname + "/WestleyParser.js"),
		Inigo = require(__dirname + "/InigoGenerator.js"),
		ManagedGroup = require(__dirname + "/ManagedGroup.js"),
		encoding = require(__dirname + "/../tools/encoding.js"),
		searching = require(__dirname + "/commands/searching.js");

	var Archive = function() {
		this._westley = new Westley();
		this._getWestley().execute(
			Inigo.create(Inigo.Command.Comment)
				.addArgument('Buttercup archive created (todo: date)')
				.generateCommand()
		);
	};

	Archive.prototype.createGroup = function(title) {
		var id = encoding.getUniqueID();
		this._getWestley().execute(
			Inigo.create(Inigo.Command.CreateGroup)
				.addArgument("0")
				.addArgument(id)
				.generateCommand()
		);
		var group = searching.findGroupByID(this._getWestley().getDataset().groups, id),
			managedGroup = new ManagedGroup(this._getWestley(), group);
		managedGroup.setTitle(title);
		return managedGroup;
	};

	Archive.prototype._getWestley = function() {
		return this._westley;
	};

	module.exports = Archive;

})(module);
