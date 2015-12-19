(function(module) {

	"use strict";

	var Inigo = require("buttercup/classes/InigoGenerator.js"),
		encoding = require("buttercup/tools/encoding.js"),
		searching = require("buttercup/tools/searching.js"),
		entryTools = require("buttercup/tools/entry.js");

	/**
	 * Managed entry class
	 * @class ManagedEntry
	 * @param {Westley} westley The Westley instance
	 * @param {Object} remoteObj The remote object reference
	 */
	var ManagedEntry = function(westley, remoteObj) {
		this._westley = westley;
		this._remoteObject = remoteObj;
	};

	/**
	 * Delete the entry - removes from the archive
	 * @memberof ManagedEntry
	 */
	ManagedEntry.prototype.delete = function() {
		this._getWestley().execute(
			Inigo.create(Inigo.Command.DeleteEntry)
				.addArgument(this.getID())
				.generateCommand()
		);
		this._getWestley().pad();
		delete this._westley;
		delete this._remoteObject;
	};

	/**
	 * Delete a meta item
	 * @param {String} property The property name
	 * @throws {Error} Throws if property doesn't exist, or cannot be deleted
	 * @returns {ManagedEntry}
	 * @memberof ManagedEntry
	 */
	ManagedEntry.prototype.deleteMeta = function(property) {
		this._getWestley().execute(
			Inigo.create(Inigo.Command.DeleteEntryMeta)
				.addArgument(this.getID())
				.addArgument(property)
				.generateCommand()
		);
		this._getWestley().pad();
		return this;
	};

	/**
	 * Get the entry ID
	 * @returns {String}
	 * @memberof ManagedEntry
	 */
	ManagedEntry.prototype.getID = function() {
		return this._getRemoteObject().id;
	};

	ManagedEntry.prototype.getMeta = function(property) {
		var raw = this._getRemoteObject();
		return raw.meta && raw.meta.hasOwnProperty(property) ?
			raw.meta[property] : undefined;
	};

	ManagedEntry.prototype.getProperty = function(property) {
		var raw = this._getRemoteObject();
		return raw.hasOwnProperty(property) && entryTools.isValidProperty(property) ?
			raw[property] : undefined;
	};

	ManagedEntry.prototype.moveToGroup = function(group) {
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

	ManagedEntry.prototype.setMeta = function(prop, value) {
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

	ManagedEntry.prototype.setProperty = function(prop, value) {
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

	/**
	 * Export entry to object
	 * @returns {Object}
	 * @memberof ManagedEntry
	 */
	ManagedEntry.prototype.toObject = function() {
		var properties = {},
			meta = {},
			remoteMeta = this._getRemoteObject().meta || {},
			_this = this;
		entryTools.getValidProperties().forEach(function(propName) {
			var val = _this.getProperty(propName);
			if (val !== undefined) {
				properties[propName] = val;
			}
		});
		for (var metaName in remoteMeta) {
			if (remoteMeta.hasOwnProperty(metaName)) {
				meta[metaName] = remoteMeta[metaName];
			}
		}
		return {
			id: this.getID(),
			properties: properties,
			meta: meta
		};
	};

	ManagedEntry.prototype.toString = function() {
		return JSON.stringify(this.toObject());
	};

	ManagedEntry.prototype._getRemoteObject = function() {
		return this._remoteObject;
	};

	ManagedEntry.prototype._getWestley = function() {
		return this._westley;
	};

	ManagedEntry.createNew = function(westley, groupID) {
		var id = encoding.getUniqueID();
		westley.execute(
			Inigo.create(Inigo.Command.CreateEntry)
				.addArgument(groupID)
				.addArgument(id)
				.generateCommand()
		);
		var entry = searching.findEntryByID(westley.getDataset().groups, id);
		return new ManagedEntry(westley, entry);
	};

	module.exports = ManagedEntry;

})(module);
