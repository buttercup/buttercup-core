(function(module) {

	"use strict";

	var Inigo = require(__dirname + "/InigoGenerator.js"),
		encoding = require(__dirname + "/../tools/encoding.js"),
		searching = require(__dirname + "/commands/searching.js");

	var Entry = function(westly, remoteObj) {
		this._westley = westly;
		this._remoteObject = remoteObj;
	};

	Entry.prototype.delete = function() {
		this._getWestley().execute(
			Inigo.create(Inigo.Command.DeleteEntry)
				.addArgument(this.getID())
				.generateCommand()
		);
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
		return this;
	};

	Entry.prototype._getRemoteObject = function() {
		return this._remoteObject;
	};

	Entry.prototype._getWestley = function() {
		return this._westley;
	};

	Entry.createNew = function(westly, groupID) {
		var id = encoding.getUniqueID();
		westly.execute(
			Inigo.create(Inigo.Command.CreateEntry)
				.addArgument(groupID)
				.addArgument(id)
				.generateCommand()
		);
		var entry = searching.findEntryByID(westly.getDataset().groups, id);
		return new Entry(westly, entry);
	};

	module.exports = Entry;

})(module);
