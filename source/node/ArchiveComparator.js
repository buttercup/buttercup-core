const { objectsDiffer } = require("./tools/compare.js");

/**
 * Calculate the common command indexes between 2 archives.
 * The common index is where a padding ID matches that of the other archive,
 * at some point. If we assume one archive may have been flattened, we cannot
 * assume that the entire past history of the archives will be the same, but
 * we can assume that at that point, the archives produce the same structure.
 * Because the archives may be different in the future, we use the newest
 * matching pad ID to create a common link between the 2 histories.
 * @param {Archive} archiveA The original archive
 * @param {Archive} archiveB The secondary archive
 * @returns {Boolean|{ a: Number, b: Number, historyA: Array, historyB: Array }} Returns
 *        false if no common point, or an object with the common information. `a` and `b`
 *        are the indexes where the common padding occurs, and historyA and historyB are
 *        the history arrays for the archives.
 * @private
 */
function calculateCommonRecentCommand(archiveA, archiveB) {
    const historyA = archiveA._getWestley().history;
    const historyB = archiveB._getWestley().history;
    for (let a = historyA.length - 1; a >= 9; a -= 1) {
        if (getCommandType(historyA[a]) === "pad") {
            const paddingA = getPaddingID(historyA[a]);
            for (let b = historyB.length - 1; b >= 0; b -= 1) {
                if (getCommandType(historyB[b]) === "pad" && getPaddingID(historyB[b]) === paddingA) {
                    return { a, b, historyA, historyB };
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
 */
function getCommandType(fullCommand) {
    return fullCommand && fullCommand.length >= 3 ? fullCommand.substr(0, 3) : "";
}

/**
 * Get the ID of a padding command
 * @param {String} command Padding command
 * @returns {String} The UUID of the padding command
 * @private
 */
function getPaddingID(command) {
    return command.split(" ")[1];
}

/**
 * Archive comparison class
 */
class ArchiveComparator {
    /**
     * Constructor for the archive comparator
     * @param {Archive} originalArchive The primary archive
     * @param {Archive} secondaryArchive The secondary archive
     */
    constructor(originalArchive, secondaryArchive) {
        this._archiveA = originalArchive;
        this._archiveB = secondaryArchive;
    }

    /**
     * Check if the current archives differ
     * @returns {Boolean} True if the archives are different
     * @memberof ArchiveComparator
     */
    archivesDiffer() {
        const objA = this._archiveA.toObject();
        const objB = this._archiveB.toObject();
        // ignore the IDs
        delete objA.archiveID;
        delete objB.archiveID;
        return objectsDiffer(objA, objB);
    }

    /**
     * Calculate the differences, in commands, between the two archives
     * @returns {{ original:Array, secondary:Array }|Boolean} Returns false if no common base
     *        is found, or the command differences as two arrays
     * @memberof ArchiveComparator
     */
    calculateDifferences() {
        const commonIndexes = calculateCommonRecentCommand(this._archiveA, this._archiveB);
        if (commonIndexes === false) {
            return false;
        }
        return {
            original: commonIndexes.historyA.splice(commonIndexes.a + 1, commonIndexes.historyA.length),
            secondary: commonIndexes.historyB.splice(commonIndexes.b + 1, commonIndexes.historyB.length),
            common: commonIndexes.historyA
        };
    }
}

module.exports = ArchiveComparator;
