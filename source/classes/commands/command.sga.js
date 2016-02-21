(function(module) {

    "use strict";

    var SetGroupAttributeCommand = function() {
        this.searching = undefined;
    }

    SetGroupAttributeCommand.prototype.execute = function(obj, groupID, attributeName, value) {
        obj.groups = obj.groups || [];
        var group = this.searching.findGroupByID(obj.groups, groupID);
        if (!group) {
            throw new Error("Group not found for ID");
        }
        group.attributes = group.attributes || {};
        group.attributes[attributeName] = value;
    };

    SetGroupAttributeCommand.prototype.injectSearching = function(searching) {
        this.searching = searching;
    }

    module.exports = SetGroupAttributeCommand;

})(module);
