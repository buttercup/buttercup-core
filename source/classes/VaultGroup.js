(function(module) {

	"use strict";

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
	};

	// VaultGroup.prototype.setParent = function(parentID) {
	// 	this._parentID = parentID;
	// 	return this;
	// };

	VaultGroup.prototype.addChildGroups = function(childGroups) {
		if (typeTools.isArray(childGroups) !== true) {
			childGroups = [childGroups];
		}
		this._children = this._children.concat(childGroups);
		return this;
	};

	VaultGroup.prototype.setTitle = function(title) {
		this._title = title;
		return this;
	};

	module.exports = VaultGroup;
	
})(module);
