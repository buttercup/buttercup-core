(function(module) {

	"use strict";

	var Promise = require("promise-polyfill");

	var Dataset = function() {
		this._title = "";
		this._groups = [];
		this._entries = [];
	};

	Dataset.prototype.addVaultEntry = function(entry) {

	};

	Dataset.prototype.getEntriesData = function() {
		return this._entries;
	};

	Dataset.prototype.getGroupsData = function() {
		return this._groups;
	};

	Dataset.prototype.getTitle = function() {
		return this._title;
	};

	Dataset.prototype.saveToDatasource = function(datasource, password) {
		var groups = this.getGroupsData(),
			entries = this.getEntriesData(),
			title = this.getTitle();
		return datasource.setData(
			password,
			{
				title: title
			},
			groups,
			entries
		);
	};

	Dataset.loadFromDatasource = function(datasource, password) {
		var _this = this;
		return datasource.getData(password).then(function(data) {
			console.log("Loaded data:", data);
		});
	};	

	module.exports = Dataset;
	
})(module);
