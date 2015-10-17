(function(module) {

	"use strict";

	var Archive = require(__dirname + "/ButtercupArchive.js");

	function checkWorkspace(workspace) {
		if (workspace.getArchive() instanceof Archive !== true) {
			throw new Error("No instance of an archive in workspace");
		}
		if (typeof workspace.getPassword() !== "string") {
			throw new Error("No password in workspace");
		}
		if (!workspace.getDatasource()) {
			throw new Error("No datasource in workspace");
		}
	}

	function clearStagedArchive(workspace) {
		workspace._stagedArchive = null;
	}

	function stageArchiveFromDatasource(workspace) {
		return (workspace._stagedArchive instanceof Archive) ?
			Promise.resolve(workspace._stagedArchive) :
			workspace.getDatasource().load(workspace.getPassword())
				.then(function(archive) {
					workspace._stagedArchive = archive;
					return archive;
				});
	}

	var Workspace = function() {
		this._archive = null;
		this._password = null;
		this._datasource = null;

		this._stagedArchive = null;
	};

	Workspace.prototype.archiveDiffersFromDatasource = function() {
		return stageArchiveFromDatasource(this)
			.then(function(stagedArchive) {

			});
	};

	Workspace.prototype.getArchive = function() {
		return this._archive;
	};

	Workspace.prototype.getDatasource = function() {
		return this._datasource;
	};

	Workspace.prototype.getPassword = function() {
		return this._password;
	};

	Workspace.prototype.setArchive = function(archive) {
		this._archive = archive;
		return this;
	};

	Workspace.prototype.setDatasource = function(datasource) {
		this._datasource = datasource;
		return this;
	}

	Workspace.prototype.setPassword = function(password) {
		this._password = password;
		return this;
	}

	module.exports = Workspace;

})(module);
