const { InigoCommand: Inigo } = require("./tools");

const { Command } = Inigo;

/**
 * Describe a vault dataset - to history commands
 * @param {Object} dataset The vault dataset
 * @param {String} parentGroupID The ID of the parent group
 * @returns {Array.<String>} An array of commands
 */
function describeVaultDataset(dataset, parentGroupID) {
    var currentGroupID = dataset.format ? "0" : dataset.id,
        entries = currentGroupID === "0" ? [] : dataset.entries || [];
    var commands = [];
    if (currentGroupID === "0") {
        // Vault
        if (dataset.format) {
            commands.push(
                Inigo.create(Command.Format)
                    .addArgument(dataset.format)
                    .generateCommand()
            );
        }
        if (dataset.id) {
            commands.push(
                Inigo.create(Command.ArchiveID)
                    .addArgument(dataset.id)
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
        if (entry.properties) {
            Object.keys(entry.properties).forEach(propertyName => {
                commands.push(
                    Inigo.create(Command.SetEntryProperty)
                        .addArgument(entry.id)
                        .addArgument(propertyName)
                        .addArgument(entry.properties[propertyName])
                        .generateCommand()
                );
            });
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
        commands = commands.concat(describeVaultDataset(group, currentGroupID));
    });
    return commands;
}

module.exports = {
    describeVaultDataset
};
