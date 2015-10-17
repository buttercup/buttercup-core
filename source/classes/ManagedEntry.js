(function(module) {

	"use strict";

	var Inigo = require(__dirname + "/InigoGenerator.js"),
		encoding = require(GLOBAL.root + "/tools/encoding.js"),
		searching = require(__dirname + "/commands/searching.js");

	var Entry = function(westley, remoteObj) {
		this._westley = westley;
		this._remoteObject = remoteObj;
	};

	Entry.prototype.delete = function() {
		this._getWestley().execute(
			Inigo.create(Inigo.Command.DeleteEntry)
				.addArgument(this.getID())
				.generateCommand()
		);
		this._getWestley().pad();
		delete this._westley;
		delete this._remoteObject;
	};

	Entry.prototype.getID = function() {
		return this._getRemoteObject().id;
	};

	Entry.prototype.moveToGroup = function(group) {
		var targetID = group.getID();
		this._getWestley().execute(
			Inigo.create(Inigo.Command.MoveEntry)
				.addArgument(this.getID())
				.addArgument(targetID)
				.generateCommand()
		);
		this._getWestley().pad();
		return this;
	};

	Entry.prototype.setMeta = function(prop, value) {
		this._getWestley().execute(
			Inigo.create(Inigo.Command.SetEntryMeta)
				.addArgument(this.getID())
				.addArgument(prop)
				.addArgument(value)
				.generateCommand()
		);
		this._getWestley().pad();
		return this;
	};

	Entry.prototype.setProperty = function(prop, value) {
		this._getWestley().execute(
			Inigo.create(Inigo.Command.SetEntryProperty)
				.addArgument(this.getID())
				.addArgument(prop)
				.addArgument(value)
				.generateCommand()
		);
		this._getWestley().pad();
		return this;
	};

	Entry.prototype._getRemoteObject = function() {
		return this._remoteObject;
	};

	Entry.prototype._getWestley = function() {
		return this._westley;
	};

	Entry.createNew = function(westley, groupID) {
		var id = encoding.getUniqueID();
		westley.execute(
			Inigo.create(Inigo.Command.CreateEntry)
				.addArgument(groupID)
				.addArgument(id)
				.generateCommand()
		);
		var entry = searching.findEntryByID(westley.getDataset().groups, id);
		return new Entry(westley, entry);
	};

	module.exports = Entry;

})(module);
