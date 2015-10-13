(function(module) {

	"use strict";

	var VALID_COMMAND_EXP = 			/^[a-z]{3}[ ].+$/;

	function extractCommandComponents(command) {
		var patt = /("[^"]*")/,
			quotedStringPlaceholder = "__QUOTEDSTR__",
			escapedQuotePlaceholder = "__ESCAPED_QUOTE__",
			matches = [],
			match;

		command = command.replace(/\\\"/g, escapedQuotePlaceholder);

		while (match = patt.exec(command)) {
			var matched = match[0];
			command = command.substr(0, match.index) +
				quotedStringPlaceholder +
				command.substr(match.index + matched.length);
			matches.push(matched.substring(1, matched.length - 1));
		}

		var parts = command.split(" ");
		parts = parts.map(function(part) {
			var item = part.trim();
			if (item === quotedStringPlaceholder) {
				item = matches.shift();  
			}
			item = item.replace(new RegExp(escapedQuotePlaceholder, 'g'), '"');
			return item;
		});

		return parts;
	}

	var Westley = function() {
		this._dataset = {};
		this._history = [];
	};

	Westley.prototype.execute = function(command) {
		if (!VALID_COMMAND_EXP.test(command)) {
			throw new Error("Invalid command");
		}
		var commandComponents = extractCommandComponents(command),
			commandKey = commandComponents.shift(),
			commandFilename = "command." + commandKey + ".js",
			commandExecute;
		try {
			commandExecute = require(__dirname + "/commands/" + commandFilename);
		} catch (err) {
			throw new Error("Unrecognised command: " + commandKey);
		}
		this._history.push(command);
		this._dataset = commandExecute.apply(commandExecute, [this._dataset].concat(commandComponents))
			|| this._dataset;
	};

	Westley.prototype.getDataset = function() {
		return this._dataset;
	};

	Westley.prototype.getHistory = function() {
		return this._history;
	};

	module.exports = Westley;

})(module);