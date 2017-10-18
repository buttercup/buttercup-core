var fs = require("fs"),
    lib = require("../../source/module.js");

var Archive = lib.Archive,
    FileDatasource = lib.FileDatasource,
    createCredentials = lib.createCredentials;

module.exports = {
    setUp: function(cb) {
        cb();
    },

    savesAndLoads: function(test) {
        var archiveBefore = new Archive(),
            mainGroupBefore = archiveBefore.createGroup("1 2 3"),
            fds = new FileDatasource("./test-archive.bcup");
        for (var i = 0; i < 100; i += 1) {
            mainGroupBefore.createEntry("Entry #" + i);
        }
        fds
            .save(archiveBefore, createCredentials.fromPassword("my pass12"))
            .then(function() {
                return fds
                    .load(createCredentials.fromPassword("my pass12"))
                    .then(function(archiveAfter) {
                        var groups = archiveAfter.getGroups();
                        test.strictEqual(groups.length, 1, "There should be 1 group");
                        test.strictEqual(groups[0].getTitle(), "1 2 3", "Group should have the correct title");
                        fs.unlinkSync("./test-archive.bcup");
                        test.done();
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            })
            .catch(function(err) {
                console.error(err);
            });
    },

    keepsSameID: function(test) {
        var archive = new Archive(),
            id = archive.getID(),
            fds = new FileDatasource("./test-archive.bcup");
        fds
            .save(archive, createCredentials.fromPassword("passy"))
            .then(function() {
                return fds
                    .load(createCredentials.fromPassword("passy"))
                    .then(function(loadedArchive) {
                        test.strictEqual(loadedArchive.getID(), id, "IDs should be the same");
                        fs.unlinkSync("./test-archive.bcup");
                        test.done();
                    })
                    .catch(function(err) {
                        console.error(err);
                    });
            })
            .catch(function(err) {
                console.error(err);
            });
    }
};
