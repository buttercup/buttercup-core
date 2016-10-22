"use strict";

const BaseCommand = require("./BaseCommand.js");

class CreateGroupCommand extends BaseCommand {

    execute(obj, parentID, newID) {
        obj.groups = obj.groups || [];
        var group = {
            id: newID,
            title: ""
        };
        if ("" + parentID === "0") {
            obj.groups.push(group);
        } else {
            var parentGroup = this.searchTools.findGroupByID(obj.groups, parentID);
            if (!parentGroup) {
                throw new Error("Invalid parent group ID: not found");
            }
            parentGroup.groups = parentGroup.groups || [];
            parentGroup.groups.push(group);
        }
    }

}

module.exports = CreateGroupCommand;
