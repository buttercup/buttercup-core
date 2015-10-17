(function(module) {

	"use strict";

	var Inigo = require(__dirname + "/InigoGenerator.js"),
		ManagedEntry = require(__dirname + "/ManagedEntry.js"),
		encoding = require(GLOBAL.root + "/tools/encoding.js"),
		searching = require(__dirname + "/commands/searching.js");

	var Group = function(westly, remoteObj) {
		this._westley = westly;
		this._remoteObject = remoteObj;
	};

	Group.prototype.createEntry = function(title) {
		var managedEntry = ManagedEntry.createNew(this._getWestley(), this.getID());
		if (title) {
			managedEntry.setProperty("title", title);
		}
		return managedEntry;
	};

	Group.prototype.createGroup = function(title) {
		var group = Group.createNew(this._getWestley(), this.getID());
		if (title) {
			group.setTitle(title);
		}
		return group;
	};

	Group.prototype.delete = function() {
		this._getWestley().execute(
			Inigo.create(Inigo.Command.DeleteGroup)
				.addArgument(this.getID())
				.generateCommand()
		);
		this._getWestley().pad();
		delete this._westley;
		delete this._remoteObject;
	};

	Group.prototype.getID = function() {
		return this._getRemoteObject().id;
	};

	Group.prototype.moveToGroup = function(group) {
		var targetID = group.getID();
		this._getWestley().execute(
			Inigo.create(Inigo.Command.MoveGroup)
				.addArgument(this.getID())
				.addArgument(targetID)
				.generateCommand()
		);
		this._getWestley().pad();
		return this;
	};

	Group.prototype.setTitle = function(title) {
		this._getWestley().execute(
			Inigo.create(Inigo.Command.SetGroupTitle)
				.addArgument(this.getID())
				.addArgument(title)
				.generateCommand()
		);
		this._getWestley().pad();
		return this;
	};

	Group.prototype._getRemoteObject = function() {
		return this._remoteObject;
	};

	Group.prototype._getWestley = function() {
		return this._westley;
	};

	Group.createNew = function(westley, parentID) {
		parentID = parentID || "0";
		var id = encoding.getUniqueID();
		westley.execute(
			Inigo.create(Inigo.Command.CreateGroup)
				.addArgument(parentID)
				.addArgument(id)
				.generateCommand()
		);
		var group = searching.findGroupByID(westley.getDataset().groups, id);
		return new Group(westley, group);
	};

	module.exports = Group;

})(module);
