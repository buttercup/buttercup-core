(function(module) {

	"use strict";

	/**
	 * Command related tools
	 * @module command
	 */
	module.exports = {

		/**
		 * Extract command components from a string
		 * @param {String} command The command to extract from
		 * @returns {String[]} The separated parts
		 */
		extractCommandComponents: function(command) {
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

	};

})(module);
