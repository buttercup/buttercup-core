const SHARE_COMMAND_EXP = /^\$[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\s/;
const UUID_LEN = 36;

function mergeHistories(initial, incoming) {
    // @todo Share merging
}

/**
 * Move a group between archives
 * @param {Group} movingGroup The group to move
 * @param {Group|Vault} targetGroup The group to move to
 * @throws {Error} Throws if the remote type is not recognised
 */
function moveGroupBetweenVaults(movingGroup, targetGroup) {
    // Clone
    const targetVault = targetGroup.type === "Vault" ? targetGroup : targetGroup.vault;
    targetVault.format.cloneGroup(movingGroup, targetGroup.type === "Vault" ? "0" : targetGroup.id);
    // Delete original
    movingGroup.delete(/* skip trash */ true);
}

/**
 * Prepend the share prefix to every line that doesn't have it
 * @param {String[]} history Array of history lines
 * @returns {String[]} Prefixed history lines
 */
function prependSharePrefix(history, shareID) {
    return history.map(line => (SHARE_COMMAND_EXP.test(line) ? line : `$${shareID} ${line}`));
}

/**
 * Remove the share prefix to every line that has it
 * @param {String[]} history Array of history lines
 * @returns {String[]} Non-prefixed history lines
 */
function removeSharePrefix(history) {
    return history.map(line => (SHARE_COMMAND_EXP.test(line) ? line.replace(SHARE_COMMAND_EXP, "") : line));
}

module.exports = {
    mergeHistories,
    moveGroupBetweenVaults,
    prependSharePrefix,
    removeSharePrefix
};
