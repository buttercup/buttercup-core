"use strict";

var describe = require("../classes/Descriptor.js");

module.exports = {

    /**
     * Move a group between archives
     * @param {Group} movingGroup The group to move
     * @param {Group} targetGroup The group to move to
     */
    moveGroupBetweenArchives: function(movingGroup, targetGroup) {
        let targetArchive = targetGroup._getArchive(),
            groupDesc = describe(movingGroup._getRemoteObject(), targetGroup.getID());
        groupDesc.forEach(function(command) {
            targetArchive._getWestley().execute(command);
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
