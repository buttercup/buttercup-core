(function(module) {

	"use strict";

	var encoding = require(GLOBAL.root + "/tools/encoding.js");

	/**
	 * Calculate the common command indexes between 2 archives.
	 * The common index is where a padding ID matches that of the other archive,
	 * at some point. If we assume one archive may have been flattened, we cannot
	 * assume that the entire past history of the archives will be the same, but
	 * we can assume that at that point, the archives produce the same structure.
	 * Because the archives may be different in the future, we use the newest
	 * matching pad ID to create a common link between the 2 histories.
	 * @param {Archive} archiveA
	 * @param {Archive} archiveB
	 * @returns {Boolean|{ a: Number, b: Number, historyA: Array, historyB: Array }} Returns
	 *		false if no common point, or an object with the common information. `a` and `b`
	 *		are the indexes where the common padding occurs, and historyA and historyB are
	 *		the history arrays for the archives.
	 * @private
	 * @static
	 * @memberof Comparator
	 */
	function calculateCommonRecentCommand(archiveA, archiveB) {
		var historyA = archiveA._getWestley().getHistory(),
			historyB = archiveB._getWestley().getHistory(),
			aLen = historyA.length,
			bLen = historyB.length,
			a,
			b;
		for (a = aLen - 1; a >= 0; a -= 1) {
			if (getCommandType(historyA[a]) === "pad") {
				var paddingA = getPaddingID(historyA[a]);
				for (b = bLen - 1; b >= 0; b -= 1) {
					if (getCommandType(historyB[b]) === "pad" &&
						getPaddingID(historyB[b]) === paddingA) {
						return {
							a: a,
							b: b,
							historyA: historyA,
							historyB: historyB
						};
					}
				}
			}
		}
		return false;
	}

	/**
	 * Get the command type/name
	 * @param {String} fullCommand The command
	 * @returns {String} The 3-character command name
	 * @private
	 * @static
	 * @memberof Comparator
	 */
	function getCommandType(fullCommand) {
		return (fullCommand && fullCommand.length >= 3) ? fullCommand.substr(0, 3) : "";
	}

	/**
	 * Get the ID of a padding command
	 * @param {String} command Padding command
	 * @returns {String} The UUID of the padding command
	 * @private
	 * @static
	 * @memberof Comparator
	 */
	function getPaddingID(command) {
		return command.split(" ")[1];
	}

	/**
	 * Archive comparison class
	 * @class Comparator
	 * @param {Archive} originalArchive
	 * @param {Archive} secondaryArchive
	 */
	var Comparator = function(originalArchive, secondaryArchive) {
		this._archiveA = originalArchive;
		this._archiveB = secondaryArchive;
	};

	/**
	 * Check if the current archives differ in any way
	 * @returns {Boolean}
	 * @memberof Comparator
	 */
	Comparator.prototype.archivesDiffer = function archivesDiffer() {
		var historyA = this._archiveA._getWestley().getHistory().join("\n"),
			historyB = this._archiveB._getWestley().getHistory().join("\n"),
			hashA = encoding.hashText(historyA).toString("base64"),
			hashB = encoding.hashText(historyB).toString("base64");
		return (hashA !== hashB);
	};

	/**
	 * Calculate the differences, in commands, between the two archives
	 * @returns {{ original:Array, secondary:Array }|Boolean} Returns false if no common base
	 *		is found, or the command differences as two arrays
	 * @memberof Comparator
	 */
	Comparator.prototype.calculateDifferences = function() {
		var commonIndexes = calculateCommonRecentCommand(this._archiveA, this._archiveB);
		if (commonIndexes === false) {
			return false;
		}
		return {
			original: commonIndexes.historyA.splice(commonIndexes.a + 1, commonIndexes.historyA.length),
			secondary: commonIndexes.historyB.splice(commonIndexes.b + 1, commonIndexes.historyB.length),
			common: commonIndexes.historyA
		};
	};

	module.exports = Comparator;

})(module);
