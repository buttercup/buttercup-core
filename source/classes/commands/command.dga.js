(function(module) {

    "use strict";

    var DeleteGroupAttributeCommand = function() {
        this.searching = undefined;
    }

    DeleteGroupAttributeCommand.prototype.execute = function(obj, groupID, attributeName) {
        obj.groups = obj.groups || [];
        var group = this.searching.findGroupByID(obj.groups, groupID);
        if (!group) {
            throw new Error("Group not found for ID");
        }
        group.attributes = group.attributes || {};
        var deleted = delete group.attributes[attributeName];
        if (!deleted) {
            throw new Error("Failed deleting attribute");
        }
    };

    DeleteGroupAttributeCommand.prototype.injectSearching = function(searching) {
        this.searching = searching;
    }

    module.exports = DeleteGroupAttributeCommand;

})(module);
