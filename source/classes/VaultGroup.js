(function(module) {

	"use strict";

	var clone = require('clone');

	var typeTools = require(GLOBAL.root + "/tools/type.js");

	// var encoding = require(GLOBAL.root + "/tools/encoding.js");

	// function generateID() {
	// 	return encoding.hashText(
	// 		"" +
	// 		(Math.random() * 100000) +
	// 		Date.now() +
	// 		GLOBAL.root
	// 	);
	// }

	var VaultGroup = function(data) {
		data = data || {};
		this._title = data.title || "";
		this._children = [];
		this._entries = [];
	};

	// VaultGroup.prototype.setParent = function(parentID) {
	// 	this._parentID = parentID;
	// 	return this;
	// };

	VaultGroup.prototype.addChildGroups = function(childGroups) {
		//if (typeTools.isArray(childGroups) !== true) {
		if (Array.isArray(childGroups) !== true) {
			childGroups = [childGroups];
		}
		this._children = this._children.concat(childGroups);
		return this;
	};

	VaultGroup.prototype.addEntries = function(entries) {
		if (Array.isArray(entries) !== true) {
			entries = [entries];
		}
		this._entries = this._entries.concat(entries);
		return this;
	};

	VaultGroup.prototype.getChildGroups = function() {
		return this._children;
	};

	VaultGroup.prototype.getEntries = function() {
		return this._entries;
	},

	VaultGroup.prototype.getTitle = function() {
		return this._title;
	};

	VaultGroup.prototype.setTitle = function(title) {
		this._title = title;
		return this;
	};

	VaultGroup.prototype.toRaw = function() {
		var raw = {
			title: this.getTitle(),
			groups: [],
			entries: []
		};
		this.getChildGroups().forEach(function(group) {
			raw.groups.push(group.toRaw());
		});
		this.getEntries().forEach(function(entry) {
			raw.entries.push(entry.toRaw());
		});
		return raw;
	};

	module.exports = VaultGroup;
	
})(module);
