(function(module) {

	"use strict";

	var Archive = require("buttercup/classes/Archive.js"),
		Inigo = require("buttercup/classes/InigoGenerator.js"),
		Comparator = require("buttercup/classes/ArchiveComparator.js");

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

	function getCommandType(fullCommand) {
		return (fullCommand && fullCommand.length >= 3) ? fullCommand.substr(0, 3) : "";
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

	function stripDestructiveCommands(history) {
		return history.filter(function(command) {
			return [
				Inigo.Command.DeleteEntry.s,
				Inigo.Command.DeleteGroup.s
			].indexOf(getCommandType(command)) < 0;
		});
	}

	/**
	 * Workspace: handling archive loading, saving and merging
	 * @class Workspace
	 */
	var Workspace = function() {
		this._archive = null;
		this._password = null;
		this._datasource = null;

		this._stagedArchive = null;
	};

	/**
	 * Check if the archive differs from the one in the datasource
	 * @returns {Promise}
	 * @memberof Workspace
	 * @see stageArchiveFromDatasource
	 */
	Workspace.prototype.archiveDiffersFromDatasource = function() {
		checkWorkspace(this);
		var mainArchive = this.getArchive();
		return stageArchiveFromDatasource(this)
			.then(function(stagedArchive) {
				var comparator = new Comparator(mainArchive, stagedArchive);
				return comparator.archivesDiffer();
			});
	};

	/**
	 * Get the archive instance
	 * @returns {Archive}
	 * @memberof Workspace
	 */
	Workspace.prototype.getArchive = function() {
		return this._archive;
	};

	/**
	 * Get the datasource instance
	 * @returns {Object} A datasource instance (FileDatasource/TextDatasource etc.)
	 * @memberof Workspace
	 */
	Workspace.prototype.getDatasource = function() {
		return this._datasource;
	};

	/**
	 * Get the stored password
	 * @returns {String}
	 * @memberof Workspace
	 */
	Workspace.prototype.getPassword = function() {
		return this._password;
	};

	/**
	 * Perform a merge against the remote datasource
	 * @returns {Promise}
	 * @memberof Workspace
	 */
	Workspace.prototype.mergeFromDatasource = function() {
		checkWorkspace(this);
		var mainArchive = this.getArchive(),
			workspace = this;
		return this.archiveDiffersFromDatasource()
			.then(function(differs) {
				if (differs) {
					return stageArchiveFromDatasource(workspace);
				} else {
					return Promise.reject("No differences in archives");
				}
			})
			.then(function(stagedArchive) {
				var comparator = new Comparator(mainArchive, stagedArchive),
					differences = comparator.calculateDifferences();
				var newHistoryMain = stripDestructiveCommands(differences.original),
					newHistoryStaged = stripDestructiveCommands(differences.secondary),
					base = differences.common;
				var newArchive = new Archive();
				newArchive._getWestley().clear();
				base.concat(newHistoryStaged).concat(newHistoryMain).forEach(function(command) {
					newArchive._getWestley().execute(command);
				});
				workspace.setArchive(newArchive);
				return newArchive;
			});
	};

	/**
	 * Save the archive to the datasource
	 * @memberof Workspace
	 * @returns {Workspace} Self
	 */
	Workspace.prototype.save = function() {
		checkWorkspace(this);
		this.getDatasource().save(this.getArchive(), this.getPassword());
		return this;
	};

	/**
	 * Set the archive instance
	 * @param {Archive} archive
	 * @memberof Workspace
	 * @returns {Workspace} Self
	 */
	Workspace.prototype.setArchive = function(archive) {
		this._archive = archive;
		return this;
	};

	/**
	 * Set the datasource instance
	 * @memberof Workspace
	 * @param {Object} datasource
	 * @returns {Workspace} Self
	 */
	Workspace.prototype.setDatasource = function(datasource) {
		this._datasource = datasource;
		return this;
	}

	/**
	 * Set the password
	 * @param {String} password
	 * @returns {Workspace} Self
	 * @memberof Workspace
	 */
	Workspace.prototype.setPassword = function(password) {
		this._password = password;
		return this;
	}

	module.exports = Workspace;

})(module);
