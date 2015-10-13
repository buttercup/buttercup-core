(function(module) {

	"use strict";

	var Inigo = require(__dirname + "/InigoGenerator.js"),
		encoding = require(__dirname + "/../tools/encoding.js"),
		searching = require(__dirname + "/commands/searching.js");

	var Group = function(westly, remoteObj) {
		this._westley = westly;
		this._remoteObject = remoteObj;
	};

	Group.prototype.createGroup = function(title) {
		var group = Group.createNew(this._getWestley(), this.getID());
		if (title) {
			group.setTitle(title);
		}
		return group;
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

	Group.createNew = function(westly, parentID) {
		parentID = parentID || "0";
		var id = encoding.getUniqueID();
		westly.execute(
			Inigo.create(Inigo.Command.CreateGroup)
				.addArgument(parentID)
				.addArgument(id)
				.generateCommand()
		);
		var group = searching.findGroupByID(westly.getDataset().groups, id);
		return new Group(westly, group);
	};

	module.exports = Group;

})(module);
