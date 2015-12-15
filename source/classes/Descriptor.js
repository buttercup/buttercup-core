(function(module) {

	"use strict";

	var Inigo = require(__dirname + "/InigoGenerator.js"),
		Commands = Inigo.Command;

	/**
	 * Describe an archive dataset - to history commands
	 * @param {Object} dataset The archive dataset
	 * @param {String} parentGroupID
	 * @returns {Array}
	 * @module Descriptor
	 * @type {Function} 
	 */
	module.exports = function describe(dataset, parentGroupID) {
		var currentGroupID = dataset.id || "0",
			entries = (currentGroupID === "0") ?
				[] :
				(dataset.entries || []);
		var commands = [];
		if (currentGroupID === "0" && dataset.format) {
			commands.push(
				Inigo
					.create(Commands.Format)
					.addArgument(dataset.format)
					.generateCommand()
			);
		}
		if (currentGroupID !== "0") {
			if (!parentGroupID) {
				throw new Error("No parent group ID specified");
			}
			commands.push(
				Inigo
					.create(Commands.CreateGroup)
					.addArgument(parentGroupID)
					.addArgument(currentGroupID)
					.generateCommand()
			);
			if (dataset.title) {
				commands.push(
					Inigo
						.create(Commands.SetGroupTitle)
						.addArgument(currentGroupID)
						.addArgument(dataset.title)
						.generateCommand()
				);
			}
			commands.push(Inigo.generatePaddingCommand());
		}
		entries.forEach(function(entry) {
			commands.push(
				Inigo
					.create(Commands.CreateEntry)
					.addArgument(currentGroupID)
					.addArgument(entry.id)
					.generateCommand()
			);
			["title", "username", "password"].forEach(function(property) {
				if (entry[property]) {
					commands.push(
						Inigo
							.create(Commands.SetEntryProperty)
							.addArgument(entry.id)
							.addArgument(property)
							.addArgument(entry[property])
							.generateCommand()
					);
				}
			});
			if (entry.meta) {
				for (var metaName in entry.meta) {
					if (entry.meta.hasOwnProperty(metaName)) {
						commands.push(
							Inigo
								.create(Commands.SetEntryMeta)
								.addArgument(entry.id)
								.addArgument(metaName)
								.addArgument(entry.meta[metaName])
								.generateCommand()
						);
					}
				}
			}
			commands.push(Inigo.generatePaddingCommand());
		});
		(dataset.groups || []).forEach(function(group) {
			commands = commands.concat(describe(group, currentGroupID));
		});
		return commands;
	};

})(module);
