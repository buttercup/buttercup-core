"use strict";

var path = require("path"),
    walk = require("walk");
var lib = require("../../source/module.js");
var FileDatasource = lib.FileDatasource,
    createCredentials = lib.createCredentials;

var archivesDir = path.resolve(__dirname, "../_archives"),
    archiveFilenames;

module.exports = {

    setUp: function(cb) {
        archiveFilenames = []
        var walker  = walk.walk(archivesDir, { followLinks: false });
        walker.on('file', function(root, stat, next) {
            var extension = stat.name.split(".").pop().toLowerCase();
            if (extension === "bcup") {
                archiveFilenames.push(root + "/" + stat.name);
            }
            next();
        });
        walker.on('end', function() {
            (cb)();
        });
    },

    testOpensArchive: function(test) {
        Promise.all(
            archiveFilenames.map(function(archiveFilename) {
                var version = path.basename(archiveFilename)
                    .split("-")[2]
                    .replace(".bcup", "");
                console.log("Testing archive @ " + version + "...");
                var datasource = new FileDatasource(archiveFilename);
                datasource
                    .load(createCredentials.fromPassword("this is a long password used for a test archive!"))
                    .then(function(archive) {
                        var groups = archive.getGroups(),
                            testGroup;
                        groups.forEach(function(group) {
                            if (group.getTitle() === "test-group-main") {
                                testGroup = group;
                            }
                        });
                        var entries = testGroup.getEntries(),
                            testEntry = entries[0];
                        test.strictEqual(testEntry.getProperty("title"), "test-entry-main",
                            "Entry title should be correct (" + version + ")");
                        test.strictEqual(testEntry.getProperty("username"), "user123한@test.рф",
                            "Entry username should be correct (" + version + ")");
                        test.strictEqual(testEntry.getProperty("password"), "* পাসওয়ার্ড! ",
                            "Entry username should be correct (" + version + ")");
                        test.strictEqual(testEntry.getMeta("test-meta"), "test-value 8",
                            "Entry meta value should be correct (" + version + ")");
                        test.ok(archive.getID().length > 0, "Old archives should have an ID");
                    })
                    .catch(function(err) {
                        console.error("Failed reading archive at version: " + version);
                        console.error(err);
                    });
            })
        ).then(function() {
            test.done();
        }).catch(function(err) {
            console.error("Failed testing old archives:", err);
        });
    }

};
