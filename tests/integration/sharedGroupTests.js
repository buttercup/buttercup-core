"use strict";

var lib = require("../../source/module.js");

var Archive = lib.Archive,
    Workspace = lib.SharedWorkspace,
    TextDatasource = lib.TextDatasource,
    Group = lib.Group;

function createBasicStructure(archive) {
    var mainGroup = archive.createGroup("ParentGroup");
    mainGroup
        .createGroup("Sub1")
            .createEntry("Entry1")
                .setProperty("username", "perry")
                .setProperty("password", "123000");
    mainGroup
        .createGroup("Sub2")
            .createEntry("Entry2")
                .setProperty("username", "root")
                .setProperty("password", "passw0rd");
}

module.exports = {

    setUp: function(cb) {
        this.main = new Archive();
        createBasicStructure(this.main);

        this.shared = new Archive();
        this.sharedGroup = this.shared
            .createGroup("Shared1")
                .setAttribute(Group.Attributes.Role, "shared");

        this.workspace = new Workspace();
        this.workspace
            .setPrimaryArchive(this.main, new TextDatasource(), "1234pass")
            .addSharedArchive(this.shared, new TextDatasource(), "pass5678");

        cb();
    },

    imbuing: {

        doesNotThrow: function(test) {
            test.doesNotThrow(
                () => {
                    this.workspace.imbue()
                },
                Error,
                "Should not throw an error"
            );
            test.done();
        },

        imbuesWithSharedGroups: function(test) {
            this.workspace.imbue();
            test.ok(this.main.findGroupByID(this.sharedGroup.getID()), "Shared group should be found");
            test.done();
        },

        groupsCanBeCleared: function(test) {
            this.workspace.imbue();
            test.strictEqual(this.main.getGroups().length, 2, "Main should contain 2 groups");
            this.main.discardSharedGroups();
            test.strictEqual(this.main.getGroups().length, 1, "Main should contain 1 group after discard");
            test.done();
        }

    }

};
