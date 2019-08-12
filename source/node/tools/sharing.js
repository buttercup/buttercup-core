const { describeArchiveDataset } = require("./describe.js");

const SHARE_COMMAND_EXP = /^\$[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\s/;
const UUID_LEN = 36;

/**
 * Extract shares from a history collection
 * @param {String[]} history A history collection, containing shares
 * @returns {Object} The resulting separated histories. The object will
 *  always contain a `base` property containing the non-share history.
 *  Each share detected is set on the object under its share ID - being
 *  set to an array of history lines (non-prefixed) for that share.
 */
function extractSharesFromHistory(history) {
    return history.reduce(
        (output, line) => {
            if (SHARE_COMMAND_EXP.test(line)) {
                const shareID = line.substring(1, 1 + UUID_LEN);
                const command = line.replace(SHARE_COMMAND_EXP, "");
                output[shareID] = output[shareID] || [];
                output[shareID].push(command);
            } else {
                output.base.push(line);
            }
            return output;
        },
        { base: [] }
    );
}

/**
 * Move a group between archives
 * @param {Group} movingGroup The group to move
 * @param {Group|Archive} target The group to move to
 * @throws {Error} Throws if the remote type is not recognised
 */
function moveGroupBetweenArchives(movingGroup, target) {
    let targetArchive, groupDesc;
    if (target.type === "Archive") {
        // destination is an archive
        targetArchive = target;
        groupDesc = describeArchiveDataset(movingGroup._getRemoteObject(), "0");
    } else if (target.type === "Group") {
        // destination is a group
        targetArchive = target._getArchive();
        groupDesc = describeArchiveDataset(movingGroup._getRemoteObject(), target.getID());
    } else {
        throw new Error(`Unknown remote type: ${target.type}`);
    }
    // execute each command in the destination archive
    const targetWestley = targetArchive._getWestley();
    groupDesc.forEach(function(command) {
        targetWestley.execute(command);
        targetWestley.pad();
    });
    // delete
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
    extractSharesFromHistory,
    moveGroupBetweenArchives,
    prependSharePrefix,
    removeSharePrefix
};
