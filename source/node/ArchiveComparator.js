const { calculateHistoryDifferences, objectsDiffer } = require("./tools/compare.js");

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
     * @returns {{ original:Array, secondary:Array }|null} Returns null if no common base
     *        is found, or the command differences as two arrays
     * @memberof ArchiveComparator
     */
    calculateDifferences() {
        return calculateHistoryDifferences(this._archiveA._getWestley().history, this._archiveB._getWestley().history);
    }
}

module.exports = ArchiveComparator;
