const { getUniqueID } = require("./tools/encoding.js");
const { COMMAND_MANIFEST } = require("./tools/command.js");

/**
 * @class Inigo command generator
 * @constructor
 * @param {String} cmdKey The key for the command
 */
function InigoCommand(cmdKey) {
    this._commandKey = cmdKey;
    this._commandArgs = [];
}

InigoCommand.prototype.addArgument = function(arg) {
    var newArgIndex = this._commandArgs.length,
        argRules = this._commandKey.args,
        newArgRule = argRules.length <= newArgIndex ? false : argRules[newArgIndex];
    if (newArgRule === false) {
        throw new Error(`Failed adding argument for command "${this._commandKey.s}": too many arguments for command`);
    }
    if (!newArgRule.test.test(arg)) {
        throw new Error(
            `Failed adding argument for command "${this._commandKey.s}": argument ${newArgIndex} is of invalid format`
        );
    }
    this._commandArgs.push(newArgRule.wrap(arg));
    return this;
};

InigoCommand.prototype.generateCommand = function() {
    return [this._commandKey.s].concat(this._commandArgs).join(" ");
};

InigoCommand.Command = COMMAND_MANIFEST;

InigoCommand.create = function(cmd) {
    return new InigoCommand(cmd);
};

InigoCommand.generatePaddingCommand = function() {
    const inigo = InigoCommand.create(COMMAND_MANIFEST.Pad);
    return inigo.addArgument(getUniqueID()).generateCommand();
};

module.exports = InigoCommand;
