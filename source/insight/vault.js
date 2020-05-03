/**
 * @typedef {Object} VaultInsights
 * @property {Number=} avgPassLen Average password length
 * @property {Number=} entries Number of entries in the vault
 * @property {Number=} groups Number of groups in the vault
 * @property {Number=} longPassLen Longest password length
 * @property {Number=} shortPassLen Shortest password length
 * @property {Number=} trashEntries Number of entries in trash
 * @property {Number=} trashGroups Number of groups in trash
 */

/**
 * @typedef {VaultInsights} Insights
 */

/**
 * Generate insights for a vault instance
 * @param {Vault} vault The vault instance
 * @returns {VaultInsights}
 * @private
 */
function generateVaultInsights(vault) {
    let groupCount = 0,
        entryCount = 0,
        trashEntryCount = 0,
        trashGroupCount = 0,
        longestPasswordLength = null,
        shortestPasswordLength = null;
    const entryPasswordLengths = [];
    const processGroup = group => {
        const entries = group.getEntries();
        groupCount += 1;
        entryCount += entries.length;
        entries.forEach(entry => {
            const password = entry.getProperty("password");
            if (typeof password === "string") {
                entryPasswordLengths.push(password.length);
                if (longestPasswordLength === null || password.length > longestPasswordLength) {
                    longestPasswordLength = password.length;
                }
                if (shortestPasswordLength === null || password.length < shortestPasswordLength) {
                    shortestPasswordLength = password.length;
                }
            }
        });
        group.getGroups().forEach(subGroup => processGroup(subGroup));
    };
    vault.getGroups().forEach(group => processGroup(group));
    const avgPassLen = entryPasswordLengths.reduce((total, next) => total + next, 0) / entryPasswordLengths.length;
    const trashGroup = vault.getTrashGroup();
    if (trashGroup) {
        const processTrashGroup = group => {
            const subGroups = group.getGroups();
            trashGroupCount += subGroups.length;
            subGroups.forEach(subGroup => processTrashGroup(subGroup));
            trashEntryCount += group.getEntries().length;
        };
        processTrashGroup(trashGroup);
    }
    return {
        avgPassLen,
        entries: entryCount,
        groups: groupCount,
        longPassLen: longestPasswordLength,
        shortPassLen: shortestPasswordLength,
        trashEntries: trashEntryCount,
        trashGroups: trashGroupCount
    };
}

module.exports = {
    generateVaultInsights
};
