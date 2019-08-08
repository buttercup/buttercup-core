const describe = require("../Descriptor.js");

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
        groupDesc = describe(movingGroup._getRemoteObject(), "0");
    } else if (target.type === "Group") {
        // destination is a group
        targetArchive = target._getArchive();
        groupDesc = describe(movingGroup._getRemoteObject(), target.getID());
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

module.exports = {
    moveGroupBetweenArchives
};
