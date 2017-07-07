var lib = require("../source/module.js"),
    encoding = require("../source/tools/encoding.js"),
    entryTools = require("../source/tools/entry.js");

var Archive = lib.Archive,
    Group = lib.Group,
    Entry = lib.Entry;

module.exports = {

    setUp: function(cb) {
        var archive = new Archive(),
            group = archive.createGroup("test group"),
            entry = group.createEntry("My entry");
        entry
            .setProperty("username", "some-user")
            .setProperty("password", "passw0rd")
            .setMeta("accessKey", "12345")
            .setMeta("user prop", "user val")
            .setAttribute("test-type", "credit-card");
        entry.setMeta("URL", "https://test.com");
        entry.setMeta("url", "https://testing.com");
        this.id = entry.getID();
        this.archive = archive;
        this.entry = entry;
        this.group = group;
        (cb)();
    },

    createNew: {

        createsNewEntry: function(test) {
            var newEntry = Entry.createNew(this.archive, this.group.getID());
            test.ok(newEntry instanceof Entry, "New entry should be an Entry instance");
            test.ok(
                this.archive.findEntryByID(newEntry.getID()),
                "New entry should be found in archive"
            );
            test.done();
        },

        throwsWhenCreatingInTrash: function(test) {
            this.group.setAttribute(Group.Attributes.Role, "trash");
            test.throws(() => {
                var newEntry = Entry.createNew(this.archive, this.group.getID());
            }, "Should throw when creating in trash");
            test.done();
        }

    },

    delete: {

        deletesWhenNoTrash: function(test) {
            this.entry.delete();
            test.strictEqual(this.group.getEntries().length, 0, "Entry should be gone");
            test.done();
        },

        movesToTrash: function(test) {
            var trash = this.archive
                .createGroup("Trash")
                    .setAttribute(Group.Attributes.Role, "trash");
            this.entry.delete();
            test.strictEqual(trash.getEntries().length, 1, "Entry should be in trash");
            this.entry.delete();
            test.strictEqual(trash.getEntries().length, 0, "Entry should be gone from trash");
            test.done();
        },

        deletesWhenInTrash: function(test) {
            var trash = this.archive
                .createGroup("Trash")
                    .setAttribute(Group.Attributes.Role, "trash");
            var deleted = this.entry.delete();
            test.strictEqual(deleted, false, "Should move to trash first");
            deleted = this.entry.delete();
            test.strictEqual(deleted, true, "Entry should have been deleted");
            test.strictEqual(trash.getEntries().length, 0, "Entry should be gone from trash");
            test.done();
        },

        deletesWhenInGroupWithinTrash: function(test) {
            var trash = this.archive
                .createGroup("Trash")
                    .setAttribute(Group.Attributes.Role, "trash");
            this.group.moveToGroup(trash);
            var deleted = this.entry.delete();
            test.strictEqual(trash.getEntries().length, 0, "Entry should be gone from trash");
            test.strictEqual(this.group.getEntries().length, 0, "Entry should have been removed from the group");
            test.done();
        }

    },

    deleteMeta: {

        testDeletesProperties: function(test) {
            test.strictEqual(this.entry.getMeta("accessKey"), "12345", "Entry should contain meta item");
            this.entry.deleteMeta("accessKey");
            test.strictEqual(this.entry.getMeta("accessKey"), undefined, "Meta item should be deleted");
            test.done();
        }

    },

    getMeta: {

        getsMeta: function(test) {
            test.strictEqual(this.entry.getMeta("accessKey"), "12345", "Entry should contain meta");
            test.strictEqual(this.entry.getMeta("user prop"), "user val", "Entry should contain meta");
            test.done();
        },

        unsetReturnsUndefined: function(test) {
            test.strictEqual(this.entry.getMeta("not set"), undefined, "Should return undefined");
            test.done();
        },

        getsValueRegardlessOfCase: function(test) {
            test.strictEqual(this.entry.getMeta("url"), "https://testing.com");
            test.strictEqual(this.entry.getMeta("Url"), "https://testing.com");
            test.strictEqual(this.entry.getMeta("URL"), "https://testing.com");
            test.strictEqual(this.entry.getMeta("uRl"), "https://testing.com");
            test.done();
        }

    },

    getAttribute: {

        testGetsAttribute: function(test) {
            test.strictEqual(this.entry.getAttribute("test-type"), "credit-card", "Entry should contain attribute");
            test.done();
        },

        testUnsetReturnsUndefined: function(test) {
            test.strictEqual(this.entry.getAttribute("not set"), undefined, "Should return undefined");
            test.done();
        }

    },

    getGroup: {

        testGetsGroup: function(test) {
            var parent = this.entry.getGroup();
            test.strictEqual(parent.getTitle(), "test group", "Parent title should be correct");
            test.strictEqual(parent.getEntries()[0].getID(), this.entry.getID(), "Parent should be correct");
            test.done();
        }

    },

    getProperty: {

        testGetsProperties: function(test) {
            test.strictEqual(this.entry.getProperty("title"), "My entry", "Should return title");
            test.strictEqual(this.entry.getProperty("username"), "some-user", "Should return username");
            test.strictEqual(this.entry.getProperty("password"), "passw0rd", "Should return password");
            test.done();
        },

        testUnsetReturnsUndefined: function(test) {
            test.strictEqual(this.entry.getProperty("unset"), undefined, "Should return undefined");
            test.done();
        }

    },

    isInTrash: {

        detectsCorrectlyWhenDeletedDirectly: function(test) {
            test.strictEqual(this.entry.isInTrash(), false, "Entry should not be detected as in the trash");
            var trash = this.archive
                .createGroup("Trash")
                    .setAttribute(Group.Attributes.Role, "trash");
            this.entry.delete();
            test.strictEqual(this.entry.isInTrash(), true, "Entry should be detected as being in the trash");
            test.done();
        },

        detectsCorrectlyWhenInDeletedGroup: function(test) {
            test.strictEqual(this.entry.isInTrash(), false, "Entry should not be detected as in the trash");
            var trash = this.archive
                .createGroup("Trash")
                    .setAttribute(Group.Attributes.Role, "trash");
            this.group.delete();
            test.strictEqual(this.entry.isInTrash(), true, "Entry should be detected as being in the trash");
            test.done();
        }

    },

    readOnly: {

        failsToWriteInROMode: function(test) {
            this.entry._getWestley().readOnly = true;
            test.throws(
                function() {
                    this.entry.setProperty("username", "Attacker");
                },
                Error,
                "Should throw when trying to change entry in read-only archive"
            );
            test.done();
        }

    },

    setMeta: {

        setsMetaKeysInsensitiveOfCase: function(test) {
            this.entry.setMeta("myKey", "first");
            test.strictEqual(this.entry.toObject().meta.myKey, "first",
                "Initial setMeta should have set the value with the correct key");
            this.entry.setMeta("Mykey", "second");
            test.strictEqual(this.entry.toObject().meta.myKey, "second",
                "Second setMeta call with different case should use case of first call");
            test.done();
        },

        setsEmptyValues: function(test) {
            this.entry.setMeta("key", "");
            test.strictEqual(this.entry.getMeta("key"), "", "Meta value should be an empty string");
            test.done();
        }

    },

    toObject: {

        testTransfersProperties: function(test) {
            var obj = this.entry.toObject();
            test.strictEqual(obj.id, this.id, "Should transfer id");
            test.strictEqual(obj.properties.title, "My entry", "Should transfer title");
            test.strictEqual(obj.properties.username, "some-user", "Should transfer username");
            test.strictEqual(obj.properties.password, "passw0rd", "Should transfer password");
            test.done();
        },

        testTransfersMeta: function(test) {
            var meta = this.entry.toObject().meta;
            test.strictEqual(meta.accessKey, "12345", "Should transfer meta");
            test.strictEqual(meta["user prop"], "user val", "Should transfer custom meta values");
            test.done();
        }

    }

};
