(function(module) {

	"use strict";

	var Inigo = require(__dirname + "/InigoGenerator.js"),
		ManagedEntry = require(__dirname + "/ManagedEntry.js"),
		encoding = require(GLOBAL.root + "/tools/encoding.js"),
		searching = require(GLOBAL.root + "/tools/searching.js");

	/**
	 * Managed group class
	 * @class ManagedGroup
	 * @param {Westley} westley The Westley instance
	 * @param {Object} remoteObj The remote object reference
	 */
	var ManagedGroup = function(westley, remoteObj) {
		this._westley = westley;
		this._remoteObject = remoteObj;
	};

	ManagedGroup.prototype.createEntry = function(title) {
		var managedEntry = ManagedEntry.createNew(this._getWestley(), this.getID());
		if (title) {
			managedEntry.setProperty("title", title);
		}
		return managedEntry;
	};

	ManagedGroup.prototype.createGroup = function(title) {
		var group = ManagedGroup.createNew(this._getWestley(), this.getID());
		if (title) {
			group.setTitle(title);
		}
		return group;
	};

	ManagedGroup.prototype.delete = function() {
		this._getWestley().execute(
			Inigo.create(Inigo.Command.DeleteGroup)
				.addArgument(this.getID())
				.generateCommand()
		);
		this._getWestley().pad();
		delete this._westley;
		delete this._remoteObject;
	};

	ManagedGroup.prototype.getEntries = function() {
		var westley = this._getWestley();
		return (this._getRemoteObject().entries || []).map(function(rawEntry) {
			return new ManagedEntry(westley, rawEntry);
		});
	};

	ManagedGroup.prototype.getGroups = function() {
		var westley = this._getWestley();
		return (this._getRemoteObject().groups || []).map(function(rawGroup) {
			return new ManagedGroup(westley, rawGroup);
		});
	};

	ManagedGroup.prototype.getID = function() {
		return this._getRemoteObject().id;
	};

	ManagedGroup.prototype.getTitle = function() {
		return this._getRemoteObject().title || "";
	};

	ManagedGroup.prototype.moveToGroup = function(group) {
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

	ManagedGroup.prototype.setTitle = function(title) {
		this._getWestley().execute(
			Inigo.create(Inigo.Command.SetGroupTitle)
				.addArgument(this.getID())
				.addArgument(title)
				.generateCommand()
		);
		this._getWestley().pad();
		return this;
	};

	/**
	 * Export group to object
	 * @returns {Object}
	 * @memberof ManagedGroup
	 */
	ManagedGroup.prototype.toObject = function() {
		return {
			id: this.getID(),
			title: this.getTitle()
		};
	};

	ManagedGroup.prototype._getRemoteObject = function() {
		return this._remoteObject;
	};

	ManagedGroup.prototype._getWestley = function() {
		return this._westley;
	};

	ManagedGroup.createNew = function(westley, parentID) {
		parentID = parentID || "0";
		var id = encoding.getUniqueID();
		westley.execute(
			Inigo.create(Inigo.Command.CreateGroup)
				.addArgument(parentID)
				.addArgument(id)
				.generateCommand()
		);
		var group = searching.findGroupByID(westley.getDataset().groups, id);
		return new ManagedGroup(westley, group);
	};

	module.exports = ManagedGroup;

})(module);
