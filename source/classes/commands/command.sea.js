(function(module) {

    "use strict";

    var SetAttributeCommand = function() {
        this.searching = undefined;
    }

    SetAttributeCommand.prototype.execute = function(obj, entryID, attributeName, value) {
        obj.groups = obj.groups || [];
        var entry = this.searching.findEntryByID(obj.groups, entryID);
        if (!entry) {
            throw new Error("Entry not found for ID");
        }
        entry.attributes = entry.attributes || {};
        entry.attributes[attributeName] = value;
    };

    SetAttributeCommand.prototype.injectSearching = function(searching) {
        this.searching = searching;
    }

    module.exports = SetAttributeCommand;

})(module);
