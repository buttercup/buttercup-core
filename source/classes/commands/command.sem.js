(function(module) {

    "use strict";

    var SetMetaPropertyCommand = function() {
        this.searching = undefined;
    }

    SetMetaPropertyCommand.prototype.execute = function(obj, entryID, propertyName, value) {
        obj.groups = obj.groups || [];
        var entry = this.searching.findEntryByID(obj.groups, entryID);
        if (!entry) {
            throw new Error("Entry not found for ID");
        }
        entry.meta = entry.meta || {};
        entry.meta[propertyName] = value;
    };

    SetMetaPropertyCommand.prototype.injectSearching = function(searching) {
        this.searching = searching;
    }

    module.exports = SetMetaPropertyCommand;

})(module);
