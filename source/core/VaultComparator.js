const { calculateHistoryDifferences, objectsDiffer } = require("./tools/compare.js");
const { createVaultFacade } = require("../facades/vault.js");

/**
 * Vault comparison class
 */
class VaultComparator {
    /**
     * Constructor for the archive comparator
     * @param {Vault} originalVault The primary archive
     * @param {Vault} secondaryVault The secondary archive
     */
    constructor(originalVault, secondaryVault) {
        this._vaultA = originalVault;
        this._vaultB = secondaryVault;
    }

    /**
     * Check if the current archives differ
     * @returns {Boolean} True if the archives are different
     * @memberof VaultComparator
     */
    archivesDiffer() {
        const objA = createVaultFacade(this._vaultA);
        const objB = createVaultFacade(this._vaultB);
        // ignore the IDs
        delete objA.archiveID;
        delete objB.archiveID;
        return objectsDiffer(objA, objB);
    }

    /**
     * Calculate the differences, in commands, between the two archives
     * @returns {{ original:Array, secondary:Array }|null} Returns null if no common base
     *        is found, or the command differences as two arrays
     * @memberof VaultComparator
     */
    calculateDifferences() {
        return calculateHistoryDifferences(this._vaultA.format.history, this._vaultB.format.history);
    }
}

module.exports = VaultComparator;
