"use strict";

var describe = require("../classes/Descriptor.js");

module.exports = {

    /**
     * Move a group between archives
     * @param {Group} movingGroup The group to move
     * @param {Group|Archive} target The group to move to
     * @throws {Error} Throws if the remote type is not recognised
     */
    moveGroupBetweenArchives: function(movingGroup, target) {
        let targetArchive,
            groupDesc;
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
        groupDesc.forEach(function(command) {
            targetArchive._getWestley()
                .execute(command)
                .pad();
        });
        // remove from shared groups
        let index = -1;
        targetArchive.sharedGroups.some(function(group, ind) {
            if (group.getID() === movingGroup.getID()) {
                index = ind;
                return true;
            }
            return false;
        });
        if (index >= 0) {
            targetArchive.sharedGroups.splice(index, 1);
        }
        // delete
        movingGroup.delete(/* skip trash */ true);
    }

};
