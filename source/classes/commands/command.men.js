(function(module) {

    "use strict";

    var MoveEntryCommand = function() {
        this.searching = undefined;
    }

    MoveEntryCommand.prototype.execute = function(obj, entryID, targetGroupID) {
        obj.groups = obj.groups || [];
        var location = this.searching.findGroupContainingEntryID(obj.groups, entryID),
            originGroup = location.group,
            originIndex = location.index;
        if (!originGroup) {
            throw new Error("Invalid entry ID");
        }
        var targetGroup = this.searching.findGroupByID(obj.groups, targetGroupID);
        if (!targetGroup) {
            throw new Error("Invalid group ID");
        }
        var movedEntry = originGroup.entries.splice(originIndex, 1)[0];
        targetGroup.entries = targetGroup.entries || [];
        targetGroup.entries.push(movedEntry);
    };

    MoveEntryCommand.prototype.injectSearching = function(searching) {
        this.searching = searching;
    }

    module.exports = MoveEntryCommand;

})(module);
