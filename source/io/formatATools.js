const { encodeStringValue } = require("../tools/encoding.js");
const { generateUUID } = require("../tools/uuid.js");

const COMMAND_ARGUMENT = {
    ItemID: {
        test: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i,
        wrap: function(txt) {
            return txt;
        },
        encode: false
    },
    ItemIDOrRoot: {
        test: /^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|0)$/i,
        wrap: function(txt) {
            return txt;
        },
        encode: false
    },
    StringKey: {
        test: /\S+/,
        wrap: function(txt) {
            return encodeStringValue(txt);
        },
        encode: true
    },
    StringValue: {
        test: /(^[\s\S]+$|^$)/,
        wrap: function(txt) {
            return encodeStringValue(txt);
        },
        encode: true
    }
};
const ARG = COMMAND_ARGUMENT;
const COMMAND_MANIFEST = {
    ArchiveID: { s: "aid", d: false, args: [ARG.ItemID] },
    Comment: { s: "cmm", d: false, args: [ARG.StringValue] },
    CreateEntry: { s: "cen", d: false, args: [ARG.ItemID, ARG.ItemID] },
    CreateGroup: { s: "cgr", d: false, args: [ARG.ItemIDOrRoot, ARG.ItemID] },
    DeleteArchiveAttribute: { s: "daa", d: true, args: [ARG.StringValue] },
    DeleteEntry: { s: "den", d: true, args: [ARG.ItemID] },
    DeleteEntryAttribute: { s: "dea", d: true, args: [ARG.ItemID, ARG.StringValue] },
    DeleteEntryMeta: { s: "dem", d: true, args: [ARG.ItemID, ARG.StringValue] },
    DeleteEntryProperty: { s: "dep", d: true, args: [ARG.ItemID, ARG.StringValue] },
    DeleteGroup: { s: "dgr", d: true, args: [ARG.ItemID] },
    DeleteGroupAttribute: { s: "dga", d: true, args: [ARG.ItemID, ARG.StringValue] },
    Format: { s: "fmt", d: false, args: [ARG.StringValue] },
    MoveEntry: { s: "men", d: false, args: [ARG.ItemID, ARG.ItemID] },
    MoveGroup: { s: "mgr", d: false, args: [ARG.ItemID, ARG.ItemIDOrRoot] },
    Pad: { s: "pad", d: false, args: [ARG.ItemID] },
    SetArchiveAttribute: { s: "saa", d: false, args: [ARG.StringValue, ARG.StringValue] },
    SetEntryAttribute: { s: "sea", d: false, args: [ARG.ItemID, ARG.StringValue, ARG.StringValue] },
    SetEntryMeta: { s: "sem", d: false, args: [ARG.ItemID, ARG.StringValue, ARG.StringValue] },
    SetEntryProperty: { s: "sep", d: false, args: [ARG.ItemID, ARG.StringKey, ARG.StringValue] },
    SetGroupAttribute: { s: "sga", d: false, args: [ARG.ItemID, ARG.StringValue, ARG.StringValue] },
    SetGroupTitle: { s: "tgr", d: false, args: [ARG.ItemID, ARG.StringValue] }
};
const PLACEHOLDER_ESCAPED = "__ESCAPED_QUOTE__";
const PLACEHOLDER_QUOTED = "__QUOTEDSTR__";

class InigoCommand {
    static Command = COMMAND_MANIFEST;

    static create(cmd) {
        return new InigoCommand(cmd);
    }

    static generatePaddingCommand() {
        const inigo = InigoCommand.create(COMMAND_MANIFEST.Pad);
        return inigo.addArgument(generateUUID()).generateCommand();
    }

    constructor(cmdKey) {
        this._commandKey = cmdKey;
        this._commandArgs = [];
    }

    addArgument(arg) {
        const newArgIndex = this._commandArgs.length;
        const argRules = this._commandKey.args;
        const newArgRule = argRules.length <= newArgIndex ? false : argRules[newArgIndex];
        if (newArgRule === false) {
            throw new Error(`Failed adding argument for command "${this._commandKey.s}": too many arguments`);
        }
        if (!newArgRule.test.test(arg)) {
            throw new Error(
                `Failed adding argument for command "${this._commandKey.s}": argument ${newArgIndex} is of invalid format`
            );
        }
        this._commandArgs.push(newArgRule.wrap(arg));
        return this;
    }

    generateCommand() {
        return [this._commandKey.s].concat(this._commandArgs).join(" ");
    }
}

/**
 * Extract command components from a string
 * @param {String} command The command to extract from
 * @returns {String[]} The separated parts
 */
function extractCommandComponents(cmd) {
    const patt = /("[^"]*")/;
    const matches = [];
    let match;
    let command = cmd.replace(/\\\"/g, PLACEHOLDER_ESCAPED);
    // Replace complex command segments
    while ((match = patt.exec(command))) {
        const [matched] = match;
        command = command.substr(0, match.index) + PLACEHOLDER_QUOTED + command.substr(match.index + matched.length);
        matches.push(matched.substring(1, matched.length - 1));
    }
    // Split command, map back to original values
    return command.split(" ").map(part => {
        let item = part.trim();
        if (item === PLACEHOLDER_QUOTED) {
            item = matches.shift();
        }
        item = item.replace(new RegExp(PLACEHOLDER_ESCAPED, "g"), '"');
        return item;
    });
}

module.exports = {
    COMMAND_ARGUMENT,
    COMMAND_MANIFEST,
    InigoCommand,
    extractCommandComponents
};
