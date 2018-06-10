const Inigo = require("./InigoGenerator.js");

const { Command } = Inigo;

/**
 * Describe an archive dataset - to history commands
 * @param {Object} dataset The archive dataset
 * @param {String} parentGroupID The ID of the parent group
 * @returns {Array.<String>} An array of commands
 * @module Descriptor
 * @type {Function}
 */
module.exports = function describe(dataset, parentGroupID) {
    /*eslint complexity: 0*/
    var currentGroupID = dataset.id || "0",
        entries = currentGroupID === "0" ? [] : dataset.entries || [];
    var commands = [];
    if (currentGroupID === "0") {
        // Archive
        if (dataset.format) {
            commands.push(
                Inigo.create(Command.Format)
                    .addArgument(dataset.format)
                    .generateCommand()
            );
        }
        if (dataset.archiveID) {
            commands.push(
                Inigo.create(Command.ArchiveID)
                    .addArgument(dataset.archiveID)
                    .generateCommand()
            );
        }
        if (dataset.attributes) {
            Object.keys(dataset.attributes).forEach(function(attributeName) {
                commands.push(
                    Inigo.create(Command.SetArchiveAttribute)
                        .addArgument(attributeName)
                        .addArgument(dataset.attributes[attributeName])
                        .generateCommand()
                );
            });
        }
    }
    if (currentGroupID !== "0") {
        if (!parentGroupID) {
            throw new Error("No parent group ID specified");
        }
        commands.push(
            Inigo.create(Command.CreateGroup)
                .addArgument(parentGroupID)
                .addArgument(currentGroupID)
                .generateCommand()
        );
        if (dataset.title) {
            commands.push(
                Inigo.create(Command.SetGroupTitle)
                    .addArgument(currentGroupID)
                    .addArgument(dataset.title)
                    .generateCommand()
            );
        }
        if (dataset.attributes) {
            for (var attributeName in dataset.attributes) {
                if (dataset.attributes.hasOwnProperty(attributeName)) {
                    commands.push(
                        Inigo.create(Command.SetGroupAttribute)
                            .addArgument(currentGroupID)
                            .addArgument(attributeName)
                            .addArgument(dataset.attributes[attributeName])
                            .generateCommand()
                    );
                }
            }
        }
        commands.push(Inigo.generatePaddingCommand());
    }
    entries.forEach(function(entry) {
        commands.push(
            Inigo.create(Command.CreateEntry)
                .addArgument(currentGroupID)
                .addArgument(entry.id)
                .generateCommand()
        );
        // Deprecated: this will soon be removed (v3):
        ["title", "username", "password"].forEach(function(property) {
            if (entry[property]) {
                commands.push(
                    Inigo.create(Command.SetEntryProperty)
                        .addArgument(entry.id)
                        .addArgument(property)
                        .addArgument(entry[property])
                        .generateCommand()
                );
            }
        });
        if (entry.properties) {
            for (let propertyName in entry.properties) {
                if (entry.properties.hasOwnProperty(propertyName)) {
                    commands.push(
                        Inigo.create(Command.SetEntryProperty)
                            .addArgument(entry.id)
                            .addArgument(propertyName)
                            .addArgument(entry.properties[propertyName])
                            .generateCommand()
                    );
                }
            }
        }
        if (entry.meta) {
            for (var metaName in entry.meta) {
                if (entry.meta.hasOwnProperty(metaName)) {
                    commands.push(
                        Inigo.create(Command.SetEntryMeta)
                            .addArgument(entry.id)
                            .addArgument(metaName)
                            .addArgument(entry.meta[metaName])
                            .generateCommand()
                    );
                }
            }
        }
        if (entry.attributes) {
            for (var attributeName in entry.attributes) {
                if (entry.attributes.hasOwnProperty(attributeName)) {
                    commands.push(
                        Inigo.create(Command.SetEntryAttribute)
                            .addArgument(entry.id)
                            .addArgument(attributeName)
                            .addArgument(entry.attributes[attributeName])
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
