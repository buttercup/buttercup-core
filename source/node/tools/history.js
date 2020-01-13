const { COMMAND_MANIFEST } = require("./command.js");

/**
 * @typedef {Object} EntryHistoryItem
 * @property {String} property The property/attribute name
 * @property {String} propertyType Either "property" or "attribute"
 * @property {String|null} originalValue The original value or null if it did not exist
 *  before this change
 * @property {String|null} newValue The new value or null if it was deleted
 */

/**
 * Generate a new entry history item
 * @param {String} property The property/attribute name
 * @param {String} propertyType Either "property" or "attribute"
 * @param {String|null} originalValue The original value or null if it did not exist
 *  before this change
 * @param {String|null} newValue The new value or null if it was deleted
 * @returns {EntryHistoryItem}
 */
function generateEntryHistoryItem(property, propertyType, originalValue = null, newValue = null) {
    return Object.freeze({
        property,
        propertyType,
        originalValue,
        newValue
    });
}

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
    generateEntryHistoryItem,
    historyArrayToString,
    historyStringToArray,
    stripDestructiveCommands
};
