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

    },

    moving: {

        movesFromSharedToMain: function(test) {
            var targetGroup = this.main.findGroupsByTitle("Sub1")[0],
                sharedGroupID = this.sharedGroup.getID();
            test.ok(this.shared.findGroupByID(sharedGroupID), "Shared group should be in its original archive");
            this.sharedGroup.moveToGroup(targetGroup);
            test.ok(!this.shared.findGroupByID(sharedGroupID), "Shared group should not be in its original archive");
            test.ok(targetGroup.findGroupByID(sharedGroupID), "Shared group should be in the target group");
            test.ok(this.main.findGroupByID(sharedGroupID), "Shared group should be in the target archive");
            test.done();
        },

        removesFromSharedGroups: function(test) {
            this.workspace.imbue();
            var targetGroup = this.main.findGroupsByTitle("Sub1")[0],
                sharedGroupID = this.sharedGroup.getID(),
                sharedIDs = this.main.sharedGroups.map(group => group.getID());
            test.ok(sharedIDs.indexOf(sharedGroupID) >= 0, "Shared group should be in shared groups array");
            this.sharedGroup.moveToGroup(targetGroup);
            sharedIDs = this.main.sharedGroups.map(group => group.getID());
            test.ok(sharedIDs.indexOf(sharedGroupID) < 0, "Shared group should not be in shared groups array anymore");
            test.done();
        },

        movesFromSharedToMainArchive: function(test) {
            var target = this.main,
                sharedGroupID = this.sharedGroup.getID();
            test.ok(this.shared.findGroupByID(sharedGroupID), "Shared group should be in its original archive");
            this.sharedGroup.moveTo(target);
            test.ok(!this.shared.findGroupByID(sharedGroupID), "Shared group should not be in its original archive");
            test.ok(target.findGroupByID(sharedGroupID), "Shared group should be in the target group");
            test.ok(this.main.findGroupByID(sharedGroupID), "Shared group should be in the target archive");
            test.done();
        }

    },

    foreignness: {

        detectsIsForeignCorrectly: function(test) {
            test.ok(!this.sharedGroup.isForeign(), "Shared should not be recognised as foreign before imbuing");
            this.workspace.imbue();
            test.ok(this.sharedGroup.isForeign(), "Shared should be recognised as foreign after imbuing");
            test.done();
        }

    },

    output: {

        hasCorrectPropertiesOnToObject: function(test) {
            this.workspace.imbue();
            var output = this.sharedGroup.toObject();
            test.strictEqual(output.shared, true, "Output should have `shared` set to true");
            test.strictEqual(output.foreign, true, "Output should have `foreign` set to true");
            test.done();
        }

    }

};
