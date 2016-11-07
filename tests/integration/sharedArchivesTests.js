"use strict";

var lib = require("../../source/module.js");

var path = require("path"),
    rimraf = require("rimraf").sync;

var Archive = lib.Archive,
    Workspace = lib.SharedWorkspace,
    FileDatasource = lib.FileDatasource;

var ARCHIVE_PATH_MAIN = path.resolve(__dirname, "./main.test.bcup"),
    ARCHIVE_PATH_WRITE = path.resolve(__dirname, "./secondary-write.test.bcup"),
    ARCHIVE_PATH_READ = path.resolve(__dirname, "./secondary-read.test.bcup");

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

function extendArchive(archive) {
    var anotherGroup = archive.createGroup("Another"),
        sub1 = archive.findGroupsByTitle("Sub1")[0];
    anotherGroup.moveToGroup(sub1);
}

module.exports = {

    setUp: function(cb) {
        this.workspace = new Workspace();
        this.mainArchive = new Archive();
        this.secondaryWrite = new Archive();
        this.secondaryRead = new Archive();

        createBasicStructure(this.mainArchive);
        createBasicStructure(this.secondaryWrite);
        createBasicStructure(this.secondaryRead);

        var mainDS = new FileDatasource(ARCHIVE_PATH_MAIN),
            writeDS = new FileDatasource(ARCHIVE_PATH_WRITE),
            readDS = new FileDatasource(ARCHIVE_PATH_READ);

        Promise
            .all([
                mainDS.save(this.mainArchive, "main"),
                writeDS.save(this.secondaryWrite, "write1"),
                readDS.save(this.secondaryRead, "read1")
            ])
            .then(function() {
                return writeDS.load("write1");
            })
            .then((extendedSecondaryWrite) => {
                extendArchive(extendedSecondaryWrite);
                this.extendedSecondaryWrite = extendedSecondaryWrite;
                return writeDS.save(this.extendedSecondaryWrite, "write1");
            })
            .then(() => {
                this.secondaryRead._getWestley().readOnly = true;
                this.workspace.addSharedArchive(this.secondaryWrite, new FileDatasource(ARCHIVE_PATH_WRITE), "write1", true);
                this.workspace.addSharedArchive(this.secondaryRead, new FileDatasource(ARCHIVE_PATH_READ), "read1", false);
                this.workspace.setPrimaryArchive(this.mainArchive, new FileDatasource(ARCHIVE_PATH_MAIN), "main");
            })
            .then(cb);
    },

    tearDown: function(cb) {
        rimraf(ARCHIVE_PATH_MAIN);
        rimraf(ARCHIVE_PATH_WRITE);
        rimraf(ARCHIVE_PATH_READ);
        cb();
    },

    workspaceArchives: {

        containsArchives: function(test) {
            test.strictEqual(this.workspace.getAllItems().length, 3, "Workspace should contain 3 items");
            test.strictEqual(this.workspace.getSaveableItems().length, 2, "Workspace should contain 2 saveable items");
            test.done();
        },

        saveablesDoesNotIncludeRO: function(test) {
            var saveables = this.workspace.getSaveableItems();
            test.strictEqual(saveables[0].saveable, true, "First item should be saveable");
            test.strictEqual(saveables[1].saveable, true, "Second item should be saveable");
            test.done();
        }

    },

    remoteSync: {

        detectsDifferences: function(test) {
            this.workspace
                .localDiffersFromRemote()
                .then(function(differs) {
                    test.strictEqual(differs, true, "Differences should be detected");
                })
                .then(test.done);
        },

        detectsNoDifferencesAfterSaving: function(test) {
            this.workspace
                .save()
                .then(() => this.workspace.localDiffersFromRemote())
                .then(function(differs) {
                    test.strictEqual(differs, false, "No differences should be detected");
                })
                .then(test.done);
        },

        mergesCorrectly: function(test) {
            this.workspace
                .mergeSaveablesFromRemote()
                .then(() => {
                    var main = this.workspace.primary.archive,
                        secondaryWrite = this.workspace.getAllItems()[1].archive,
                        secondaryRead = this.workspace.getAllItems()[2].archive;
                    test.ok(main.findGroupsByTitle("Sub1")[0], "Finds regular group in MAIN");
                    test.ok(!main.findGroupsByTitle("Another")[0], "Does not find extra group in MAIN");
                    test.ok(secondaryRead.findGroupsByTitle("Sub1")[0], "Finds regular group in READ");
                    test.ok(!secondaryRead.findGroupsByTitle("Another")[0], "Does not find extra group in READ");
                    test.ok(secondaryWrite.findGroupsByTitle("Sub1")[0], "Finds regular group in WRITE");
                    test.ok(this.extendedSecondaryWrite.findGroupsByTitle("Another")[0], "Finds extra group in WRITE (x)");
                    test.ok(secondaryWrite.findGroupsByTitle("Another")[0], "Finds extra group in WRITE");
                })
                .then(test.done);
        }

    }

};
