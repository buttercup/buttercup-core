(function(module) {

	"use strict";

	var encoding = require(__dirname + "/../tools/encoding.js");

	var InigoCommand = function(cmdKey) {
		this._commandKey = cmdKey;
		this._commandArgs = [];
	};

	InigoCommand.prototype.addArgument = function(arg) {
		var newArgIndex = this._commandArgs.length,
			argRules = this._commandKey.args,
			newArgRule = (argRules.length <= newArgIndex) ? false : argRules[newArgIndex];
		if (newArgRule === false) {
			throw new Error("Too many arguments for command");
		}
		if (!newArgRule.test.test(arg)) {
			throw new Error("Argument is of invalid format");
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
			wrap: function(txt) { return txt; }
		},
		ItemIDOrRoot: {
			test: /^([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|0)$/i,
			wrap: function(txt) { return txt; }
		},
		StringKey: {
			test: /^\w+$/,
			wrap: function(txt) { return txt; }
		},
		StringValue: {
			test: /(^.+$|^$)/,
			wrap: function(txt) { return '"' + encoding.escapeTextValue(txt) + '"' }
		}
	};
	var ARG = InigoCommand.CommandArgument;

	InigoCommand.Command = {
		Comment: 					{ s:"cmm", args:[ARG.StringValue] },
		CreateEntry: 				{ s:"cen", args:[ARG.ItemID, ARG.ItemID] },
		CreateGroup: 				{ s:"cgr", args:[ARG.ItemIDOrRoot, ARG.ItemID] },
		DeleteEntry: 				{ s:"den", args:[ARG.ItemID] },
		DeleteGroup: 				{ s:"dgr", args:[ARG.ItemID] },
		Format: 					{ s:"fmt", args:[ARG.StringValue] },
		MoveEntry: 					{ s:"men", args:[ARG.ItemID, ARG.ItemID] },
		MoveGroup: 					{ s:"mgr", args:[ARG.ItemID, ARG.ItemIDOrRoot] },
		Pad: 						{ s:"pad", args:[ARG.ItemID] },
		SetEntryMeta: 				{ s:"sem", args:[ARG.ItemID, ARG.StringValue, ARG.StringValue] },
		SetEntryProperty: 			{ s:"sep", args:[ARG.ItemID, ARG.StringKey, ARG.StringValue] },
		SetGroupTitle: 				{ s:"tgr", args:[ARG.ItemID, ARG.StringValue] }
	};

	InigoCommand.create = function(cmd) {
		return new InigoCommand(cmd);
	};

	InigoCommand.generatePaddingCommand = function() {
		var inigo = InigoCommand.create(InigoCommand.Command.Pad);
		return inigo
			.addArgument(encoding.getUniqueID())
			.generateCommand();
	};

	module.exports = InigoCommand;

})(module);
