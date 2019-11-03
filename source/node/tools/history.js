const { COMMAND_MANIFEST } = require("./command.js");

function historyArrayToString(historyArray) {
    return historyArray.join("\n");
}

function historyStringToArray(historyString) {
    return historyString.split("\n");
}

/**
 * Strip destructive commands from a history collection
 * @param {Array.<String>} history The history
 * @returns {Array.<String>} The history minus any destructive commands
 */
function stripDestructiveCommands(history) {
    const getCommandType = fullCommand => (fullCommand && fullCommand.length >= 3 ? fullCommand.substr(0, 3) : "");
    const destructiveSlugs = Object.keys(COMMAND_MANIFEST)
        .map(key => COMMAND_MANIFEST[key])
        .filter(command => command.d)
        .map(command => command.s);
    return history.filter(command => {
        return destructiveSlugs.indexOf(getCommandType(command)) < 0;
    });
}

module.exports = {
    historyArrayToString,
    historyStringToArray,
    stripDestructiveCommands
};
