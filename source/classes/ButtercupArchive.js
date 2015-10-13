(function(module) {

	"use strict";

	var Westley = require(__dirname + "/WestleyParser.js"),
		Inigo = require(__dirname + "/InigoGenerator.js"),
		ManagedGroup = require(__dirname + "/ManagedGroup.js");

	var Archive = function() {
		this._westley = new Westley();
		this._getWestley().execute(
			Inigo.create(Inigo.Command.Comment)
				.addArgument('Buttercup archive created (todo: date)')
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

	Archive.prototype._getWestley = function() {
		return this._westley;
	};

	module.exports = Archive;

})(module);
