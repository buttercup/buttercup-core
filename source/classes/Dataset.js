(function(module) {

	"use strict";

	var Promise = require("promise-polyfill"),
		VaultGroup = require(__dirname + "/VaultGroup.js");

	function renderRawToGroups(groupsData) {
		groupsData = groupsData || [];
		var groups = [];
		groupsData.forEach(function(groupData) {
			var group = new VaultGroup({
				title: groupData.title || "Unnamed group"
			});
			groups.push(group);
			if (groupData.groups) {
				group.addChildGroups(renderRawToGroups(groupData.groups));
			}
			if (groupData.entries) {
				
			}
		});
		return groups;
	}

	function renderGroupsToRaw(groups) {

	}

	var Dataset = function(data) {
		data = data || {};
		this._title = data.title || "";
		this._groups = renderRawToGroups(data.groups);
	};

	// Dataset.prototype.addVaultEntry = function(entry) {

	// };

	// Dataset.prototype.addVaultGroup = function(group) {

	// };

	// Dataset.prototype.getEntriesData = function() {
	// 	return this._entries;
	// };

	Dataset.prototype.getGroups = function() {
		return this._groups;
	};

	Dataset.prototype.getGroupsData = function() {
		return renderGroupsToRaw(this.getGroups());
	};

	Dataset.prototype.getTitle = function() {
		return this._title;
	};

	Dataset.prototype.saveToDatasource = function(datasource, password) {
		var groups = this.getGroupsData(),
			title = this.getTitle();
		return datasource.setData(
			password,
			{
				title: title
			},
			groups
		);
	};

	Dataset.loadFromDatasource = function(datasource, password) {
		var _this = this;
		return datasource.getData(password).then(function(data) {
			return new Dataset({
				title: data.title,
				format: data.format,
				groups: data.groups || []
			});
		});
	};	

	module.exports = Dataset;
	
})(module);
