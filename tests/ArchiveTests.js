var lib = require("../source/module.js"),
    encoding = require("../source/tools/encoding.js");
    
var Archive = lib.Archive,
    Group = lib.Group;

module.exports = {

    setUp: function(cb) {
        var archiveA = new Archive(),
            mainGroupID = encoding.getUniqueID(),
            secondaryGroupID = encoding.getUniqueID(),
            entry1ID = encoding.getUniqueID(),
            thirdGroupID = encoding.getUniqueID(),
            commonCommands = [
                'cgr 0 ' + mainGroupID,
                'tgr ' + mainGroupID + ' "Main Group"',
                'pad ' + encoding.getUniqueID(),
                'cgr ' + mainGroupID + ' ' + secondaryGroupID,
                'tgr ' + secondaryGroupID + ' "Secondary Group"',
                'pad ' + encoding.getUniqueID(),
                'cen ' + mainGroupID + ' ' + entry1ID,
                'sep ' + entry1ID + ' title "My first entry"',
                'pad ' + encoding.getUniqueID(),
                'sep ' + entry1ID + ' username "anonymous"',
                'sep ' + entry1ID + ' password "retro"',
                'pad ' + encoding.getUniqueID(),
                'cmm "after pad"',
                'cgr 0 ' + thirdGroupID,
                'tgr ' + thirdGroupID + ' "Websites"',
                'pad ' + encoding.getUniqueID(),
                'saa "my key" "my value"',
                'saa "notHere" "12345"',
                'daa "notHere"',
                'pad ' + encoding.getUniqueID()
            ];
        commonCommands.forEach(function(command) {
            archiveA._getWestley().execute(command);
        });

        this.archiveA = archiveA;
        this.entry1ID = entry1ID;
        this.group2ID = secondaryGroupID;
        this.group3ID = thirdGroupID;

        this.archiveB = new Archive();
        this.archiveBgroup1 = this.archiveB.createGroup("parent");
        var archiveBChild1 = this.archiveBgroup1.createGroup("child1");
        var archiveBChild2 = this.archiveBgroup1.createGroup("child2");

        var archiveBChild1Entry1 = archiveBChild1.createEntry("abc123");
        archiveBChild1Entry1.setProperty("username", "5595 696");
        archiveBChild1Entry1.setProperty("password", "amazing");
        archiveBChild1Entry1.setMeta("some meta", "1987");
        var archiveBChild1Entry2 = archiveBChild2.createEntry("def123");
        archiveBChild1Entry2.setProperty("username", "5595696");
        archiveBChild1Entry2.setProperty("password", "terrific");
        archiveBChild1Entry2.setMeta("some meta", "1986");

        cb();
    },

    createWithDefaults: {

        testCreatesGeneralGroup: function(test) {
            var archive = Archive.createWithDefaults(),
                firstGroup = archive.getGroups()[0];
            test.strictEqual(firstGroup.getTitle(), "General", "First group should be 'General'");
            test.done();
        },

        testCreatesTrashGroup: function(test) {
            var archive = Archive.createWithDefaults(),
                firstGroup = archive.getGroups()[1];
            test.strictEqual(firstGroup.getTitle(), "Trash", "First group should be 'Trash'");
            test.strictEqual(firstGroup.isTrash(), true, "First group should be of type 'trash'");
            test.done();
        }

    },

    deleteAttribute: {

        deletesAttributes: function(test) {
            this.archiveA.deleteAttribute("my key");
            test.strictEqual(this.archiveA.getAttribute("my key"), undefined, "Attribute should have been deleted");
            test.done();
        }

    },

    emptyTrash: {

        emptiesTrash: function(test) {
            var archive = Archive.createWithDefaults(),
                myGroup = archive.createGroup("Personal"),
                myEntry = myGroup.createEntry("Test"),
                trash = archive.getTrashGroup();
            myEntry.delete();
            myGroup.delete();
            test.strictEqual(trash.getGroups().length, 1, "Trash should have 1 group");
            test.strictEqual(trash.getEntries().length, 1, "Trash should have 1 entry");
            archive.emptyTrash();
            test.strictEqual(trash.getGroups().length, 0, "Trash should have no groups after emptying");
            test.strictEqual(trash.getEntries().length, 0, "Trash should have no entries after emptying");
            test.done();
        }

    },

    findEntriesByMeta: {

        testFindsEntriesByString: function(test) {
            var entries = this.archiveB.findEntriesByMeta("some meta", "86");
            test.strictEqual(entries.length, 1, "1 entry should be found");
            test.strictEqual(entries[0].getProperty("title"), "def123");
            test.strictEqual(entries[0].getMeta("some meta"), "1986");
            test.done();
        },

        testFindsEntriesByRegExp: function(test) {
            var entries = this.archiveB.findEntriesByMeta("some meta", /^198[67]$/);
            test.strictEqual(entries.length, 2, "Both entries should be found");
            test.done();
        },

        testFindsNone: function(test) {
            var entries1 = this.archiveB.findEntriesByMeta("not here", "1"),
                entries2 = this.archiveB.findEntriesByMeta("some meta", "1234"),
                entries3 = this.archiveB.findEntriesByMeta("some meta", /^\d{5,}$/);
            test.strictEqual(entries1.length, 0, "No entries should be found for non-existent key");
            test.strictEqual(entries2.length, 0, "No entries should be found for non-existent value");
            test.strictEqual(entries3.length, 0, "No entries should be found for non-existent value-regex");
            test.done();
        }

    },

    findEntriesByProperty: {

        testFindsEntriesByString: function(test) {
            var entries = this.archiveB.findEntriesByProperty("title", "abc12");
            test.strictEqual(entries.length, 1, "1 entry should be found");
            test.strictEqual(entries[0].getProperty("title"), "abc123");
            test.done();
        },

        testFindsEntriesByRegExp: function(test) {
            var entries = this.archiveB.findEntriesByProperty("username", /\d \d/);
            test.strictEqual(entries.length, 1, "1 entry should be found");
            test.strictEqual(entries[0].getProperty("title"), "abc123");
            test.strictEqual(entries[0].getProperty("password"), "amazing");
            test.done();
        },

        testFindsMultipleEntriesByPasswordRegExp: function(test) {
            var entries = this.archiveB.findEntriesByProperty("password", /(amazing|terrific)/);
            test.strictEqual(entries.length, 2, "Both entries should be found");
            test.done();
        },

        testFindsNone: function(test) {
            var entries1 = this.archiveB.findEntriesByProperty("not here", "abc123"),
                entries2 = this.archiveB.findEntriesByProperty("username", "not here"),
                entries3 = this.archiveB.findEntriesByProperty("password", /^\d{7,}$/);
            test.strictEqual(entries1.length, 0, "No entries should be found for non-existent property");
            test.strictEqual(entries2.length, 0, "No entries should be found for non-existent value");
            test.strictEqual(entries3.length, 0, "No entries should be found for non-existent value-regex");
            test.done();
        }

    },

    findGroupByID: {

        findsNestedGroup: function(test) {
            var group = this.archiveA.findGroupByID(this.group2ID);
            test.strictEqual(group.getTitle(), "Secondary Group", "Should find group with its ID");
            test.done();
        },

        returnsNullForNotFound: function(test) {
            var group = this.archiveA.findGroupByID("12345");
            test.strictEqual(group, null, "Should not find non-existing group");
            test.done();
        }

    },

    findGroupsByTitle: {

        testFindsParentByString: function(test) {
            var groups = this.archiveB.findGroupsByTitle("parent");
            test.strictEqual(groups.length, 1, "Only parent should be found");
            test.strictEqual(groups[0].getTitle(), this.archiveBgroup1.getTitle(),
                "Found group should be parent");
            test.done();
        },

        testFindsChildByPartialString: function(test) {
            var groups = this.archiveB.findGroupsByTitle("ild2");
            test.strictEqual(groups.length, 1, "Only child2 should be found");
            test.strictEqual(groups[0].getTitle(), "child2", "Found group should be child2");
            test.done();
        },

        testFindsNothing: function(test) {
            var groups1 = this.archiveB.findGroupsByTitle("-"),
                groups2 = this.archiveB.findGroupsByTitle(/abc/i);
            test.strictEqual(groups1.length, 0, "No groups should be found for non-matching string");
            test.strictEqual(groups2.length, 0, "No groups should be found for non-matching RegExp");
            test.done();
        },

        testFindsChildrenByRegExp: function(test) {
            var groups = this.archiveB.findGroupsByTitle(/child[12]/i);
            test.strictEqual(groups.length, 2, "Both children should be found");
            test.ok(groups.indexOf(this.archiveBgroup1) < 0, "Parent should not be in results");
            test.done();
        }

    },

    getAttribute: {

        getsAttributeValue: function(test) {
            var attrValue = this.archiveA.getAttribute("my key");
            test.strictEqual(attrValue, "my value", "Attribute should have correct value");
            test.done();
        },

        getsUndefinedWhenNotSet: function(test) {
            var attr1 = this.archiveA.getAttribute("doesnt-exist"),
                attr2 = this.archiveA.getAttribute("notHere");
            test.strictEqual(attr1, undefined, "Should receive undefined for unset attributes");
            test.strictEqual(attr2, undefined, "Should receive undefined for deleted attributes");
            test.done();
        }

    },

    getEntryByID: {

        testGetsEntryIfExists: function(test) {
            var entry = this.archiveA.getEntryByID(this.entry1ID);
            test.strictEqual(entry.getProperty("title"), "My first entry");
            test.strictEqual(entry.getProperty("username"), "anonymous");
            test.strictEqual(entry.getProperty("password"), "retro");
            test.done();
        },

        testGetsNullIfNotFound: function(test) {
            var entry = this.archiveA.getEntryByID("999");
            test.strictEqual(entry, null, "Entry should not exist");
            test.done();
        }

    },

    getGroupByID: {

        testGetsGroupIfExists: function(test) {
            var group = this.archiveA.getGroupByID(this.group2ID);
            test.strictEqual(group.getTitle(), "Secondary Group");
            test.done();
        },

        testGetsNullIfNotFound: function(test) {
            var group = this.archiveA.getGroupByID("999");
            test.strictEqual(group, null, "Group should not exist");
            test.done();
        }

    },

    getGroups: {

        testGetsAll: function(test) {
            var groups = this.archiveA.getGroups();
            test.strictEqual(groups.length, 2, "Archive root should contain 2 groups");
            test.done();
        },

        testGroupTypes: function(test) {
            var groups = this.archiveA.getGroups();
            groups.forEach(function(group) {
                test.ok(group instanceof Group, "Groups should be Group instances");
            });
            test.done();
        }

    },

    getID: {

        newArchiveCreatedWithID: function(test) {
            test.strictEqual(this.archiveA.getID().length, 36, "ID (a) should be set");
            test.strictEqual((new Archive()).getID().length, 36, "ID (b) should be set");
            test.done();
        }

    },

    getTrashGroup: {

        testReturnsNullIfNotPresent: function(test) {
            var trashGroup = this.archiveA.getTrashGroup();
            test.strictEqual(trashGroup, null, "No trash group should be present");
            test.done();
        },

        testReturnsGroupIfPresent: function(test) {
            var group = this.archiveA.getGroupByID(this.group3ID);
            group.setAttribute(Group.Attributes.Role, "trash");
            var trashGroup = this.archiveA.getTrashGroup();
            test.strictEqual(trashGroup.getID(), group.getID(), "Trash group should be present");
            test.done();
        }

    },

    readOnly: {

        isReadWriteByDefault: function(test) {
            var archive = new Archive();
            test.ok(archive.readOnly === false, "Archive should be read-write");
            test.done();
        },

        canBeSetToReadOnly: function(test) {
            var archive = new Archive();
            archive._getWestley().readOnly = true;
            test.ok(archive.readOnly === true, "Archive should be read-only");
            test.done();
        },

        failsToWriteInROMode: function(test) {
            var archive = new Archive();
            archive._getWestley().readOnly = true;
            test.throws(
                function() {
                    archive.createGroup("Test");
                },
                Error,
                "Should throw when trying to mutate the history"
            );
            test.done();
        }

    },

    setAttribute: {

        setsAttributes: function(test) {
            var archive = this.archiveA;
            test.strictEqual(archive.getAttribute("abc"), undefined, "Non-set attribute should be undefined");
            archive.setAttribute("abc", "123");
            test.strictEqual(archive.getAttribute("abc"), "123", "Newly-set attribute should have correct value");
            test.done();
        },

        overridesAttributes: function(test) {
            var archive = this.archiveA;
            archive.setAttribute("my key", "new value");
            test.strictEqual(archive.getAttribute("my key"), "new value", "Attribute should contain new value");
            test.done();
        }

    },

    toObject: {

        outputsCorrectProperties: function(test) {
            var obj = this.archiveA.toObject();
            test.ok(obj.format, "Format should be set");
            test.ok(Array.isArray(obj.groups), "Groups should be an array");
            test.done();
        }

    },

    _generateID: {

        throwsIfIDExists: function(test) {
            test.throws(() => {
                this.archiveA._generateID();
            }, "Should throw when trying to set a new ID");
            test.done();
        }

    }

};
