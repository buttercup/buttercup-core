"use strict";

var encoding = require("../tools/encoding.js");

var InigoCommand = function(cmdKey) {
    this._commandKey = cmdKey;
    this._commandArgs = [];
};

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

InigoCommand.CommandArgument = {
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
        test: /^\w+$/,
        wrap: function(txt) {
            return encoding.encodeStringValue(txt);
        },
        encode: true
    },
    StringValue: {
        test: /(^[\s\S]+$|^$)/,
        wrap: function(txt) {
            return encoding.encodeStringValue(txt);
        },
        encode: true
    }
};
var ARG = InigoCommand.CommandArgument;

// Commands:
//      s - command slug
//      d - destructive
//      args - arguments accepted by the command

InigoCommand.Command = {
    ArchiveID: { s: "aid", d: false, args: [ARG.ItemID] },
    Comment: { s: "cmm", d: false, args: [ARG.StringValue] },
    CreateEntry: { s: "cen", d: false, args: [ARG.ItemID, ARG.ItemID] },
    CreateGroup: { s: "cgr", d: false, args: [ARG.ItemIDOrRoot, ARG.ItemID] },
    DeleteArchiveAttribute: { s: "daa", d: true, args: [ARG.StringValue] },
    DeleteEntry: { s: "den", d: true, args: [ARG.ItemID] },
    DeleteEntryAttribute: { s: "dea", d: true, args: [ARG.ItemID, ARG.StringValue] },
    DeleteEntryMeta: { s: "dem", d: true, args: [ARG.ItemID, ARG.StringValue] },
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

InigoCommand.create = function(cmd) {
    return new InigoCommand(cmd);
};

InigoCommand.generatePaddingCommand = function() {
    var inigo = InigoCommand.create(InigoCommand.Command.Pad);
    return inigo.addArgument(encoding.getUniqueID()).generateCommand();
};

module.exports = InigoCommand;
