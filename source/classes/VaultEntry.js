(function(module) {

	"use strict";

	var clone = require('clone');

	var VaultEntry = function(data) {
		data = data || {};
		this._data = {
			properties: {},
			meta: data.meta || {}
		};
		for (var propName in data) {
			if (data.hasOwnProperty(propName) && propName !== "meta") {
				this._data.properties[propName] = data[propName];
			}
		}
	};

	VaultEntry.prototype.setMeta = function(name, value) {
		this._data.meta[name] = value;
	};

	VaultEntry.prototype.setProperty = function(name, value) {
		if (!VaultEntry.isValidProperty(name)) {
			throw new Error("Invalid property name: " + name);
		}
		this._data.properties[name] = value;
		return this;
	};

	VaultEntry.prototype.toRaw = function() {
		var rawData = clone(this._data.properties);
		rawData.meta = clone(this._data.meta);
		return rawData;
	};

	// Static

	VaultEntry.isValidProperty = function(name) {
		for (var keyname in VaultEntry.Property) {
			if (VaultEntry.Property.hasOwnProperty(keyname)) {
				if (VaultEntry.Property[keyname] === name) {
					return true;
				}
			}
		}
		return false;
	};

	VaultEntry.Property = {
		Password: 					"password",
		Title: 						"title",
		Username: 					"username"
	};

	module.exports = VaultEntry;
	
})(module);
