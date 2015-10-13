(function(module) {

	"use strict";

	var Inigo = require(__dirname + "/InigoGenerator.js");

	var Group = function(westly, remoteObj) {
		this._westley = westly;
		this._remoteObject = remoteObj;
	};

	Group.prototype.getID = function() {
		return this._getRemoteObject().id;
	};

	Group.prototype.setTitle = function(title) {
		this._getWestley().execute(
			Inigo.create(Inigo.Command.SetGroupTitle)
				.addArgument(this.getID())
				.addArgument(title)
				.generateCommand()
		);
		return this;
	};

	Group.prototype._getRemoteObject = function() {
		return this._remoteObject;
	};

	Group.prototype._getWestley = function() {
		return this._westley;
	};

	module.exports = Group;

})(module);
