var lib = require("../source/module.js"),
    encoding = require("../source/tools/encoding.js");

var Group = lib.Group,
    Archive = lib.Archive;

module.exports = {

    setUp: function(cb) {
        this.id = encoding.getUniqueID();
        this.group = new Group(new Archive(), {
            id: this.id,
            title: "My group",
            attributes: {
                "test": "value"
            }
        });

        var groupTestArchive = new Archive(),
            groupTestID = encoding.getUniqueID(),
            groupTestEntryID = encoding.getUniqueID();
        [
            'cgr 0 ' + groupTestID,
            'tgr ' + groupTestID + ' "Main"',
            'sga ' + groupTestID + ' testAttr testValue',
            'cen ' + groupTestID + ' ' + groupTestEntryID,
            'sep ' + groupTestEntryID + ' title "My entry"'
        ].forEach(function(command) {
            groupTestArchive._getWestley().execute(command);
        });
        this.group2 = groupTestArchive.getGroups()[0];
        this.group2ID = groupTestID;

        this.moveGroup = groupTestArchive.createGroup("Mover");

        this.group3Archive = Archive.createWithDefaults();
        this.group3 = this.group3Archive.createGroup("My group");
        this.group3.createGroup("sub1")
            .createEntry("sub1entry1")
                .setProperty("username", "fred")
                .setMeta("random", "value");
        this.group3.createGroup("sub2");
        this.group3.createEntry("entry1")
            .setProperty("username", "freddy")
            .setMeta("random", "val");
        
        this.group4 = Archive
            .createWithDefaults()
                .createGroup("Group 4");
        this.group4.createGroup("findGroupsSub1");
        this.group4.createGroup("findGroupsSub2");
        this.group4.createGroup("findGroupsSub3");

        this.group5 = Archive
            .createWithDefaults()
                .createGroup("Group 5");
        this.group5BottomID = this.group5
            .createGroup("sub1")
                .createGroup("sub2")
                    .createGroup("sub3")
                        .getID();

        (cb)();
    },

    createNew: {

        createsNewGroup: function(test) {
            var newGroup = Group.createNew(this.group3Archive, this.group3.getID());
            test.ok(newGroup instanceof Group, "New group should be an instance of Group");
            test.ok(
                this.group3Archive.findGroupByID(newGroup.getID()),
                "New group should be found in archive"
            );
            test.done();
        },

        throwsWhenCreatingInTrash: function(test) {
            this.group3.setAttribute(Group.Attributes.Role, "trash");
            test.throws(() => {
                var newGroup = Group.createNew(this.group3Archive, this.group3.getID());
            }, "Should throw when creating in trash");
            test.done();
        }

    },

    delete: {

        deletesGroup: function(test) {
            var target = this.group2.createGroup("To delete");
            test.strictEqual(this.group2.getGroups().length, 1, "Target group should be a child");
            target.delete();
            test.strictEqual(this.group2.getGroups().length, 0, "Target group should have been deleted");
            test.done();
        },

        throwsForTrashGroup: function(test) {
            var target = this.group2
                .createGroup("To delete")
                    .setAttribute(Group.Attributes.Role, "trash");
            test.throws(function() {
                target.delete();
            }, null, "delete should throw an error");
            test.strictEqual(this.group2.getGroups().length, 1, "Target group should not have been deleted");
            test.done();
        },

        movesToTrashThenDeletes: function(test) {
            var deleted = this.group3.delete();
            test.strictEqual(deleted, false, "Should not have deleted");
            test.strictEqual(this.group3.isInTrash(), true, "Should have been moved to trash");
            deleted = this.group3.delete();
            test.strictEqual(deleted, true, "Should have been deleted");
            test.done();
        }

    },

    findEntriesByMeta: {

        findsEntriesByString: function(test) {
            var entries = this.group3.findEntriesByMeta("random", "value");
            test.strictEqual(entries.length, 1, "1 entry should be found");
            test.strictEqual(entries[0].getProperty("title"), "sub1entry1");
            test.strictEqual(entries[0].getMeta("random"), "value");
            test.done();
        },

        findsEntriesByRegExp: function(test) {
            var entries = this.group3.findEntriesByMeta("random", /^val/);
            test.strictEqual(entries.length, 2, "Both entries should be found");
            test.done();
        },

        testFindsNone: function(test) {
            var entries1 = this.group3.findEntriesByMeta("not here", "1"),
                entries2 = this.group3.findEntriesByMeta("some meta", "1234"),
                entries3 = this.group3.findEntriesByMeta("some meta", /^\d{5,}$/);
            test.strictEqual(entries1.length, 0, "No entries should be found for non-existent key");
            test.strictEqual(entries2.length, 0, "No entries should be found for non-existent value");
            test.strictEqual(entries3.length, 0, "No entries should be found for non-existent value-regex");
            test.done();
        }

    },

    findEntriesByProperty: {

        testFindsEntriesByString: function(test) {
            var entries = this.group3.findEntriesByProperty("username", "freddy");
            test.strictEqual(entries.length, 1, "1 entry should be found");
            test.strictEqual(entries[0].getProperty("title"), "entry1");
            test.done();
        },

        testFindsEntriesByRegExp: function(test) {
            var entries = this.group3.findEntriesByProperty("username", /^fred(dy)?$/),
                usernames = entries.map(function(entry) {
                    return entry.getProperty("username");
                });
            test.strictEqual(entries.length, 2, "2 entries should be found");
            test.ok(usernames.indexOf("fred") >= 0, "Both entries should be found");
            test.ok(usernames.indexOf("freddy") >= 0, "Both entries should be found");
            test.done();
        },

        testFindsNone: function(test) {
            var entries1 = this.group3.findEntriesByProperty("not here", "abc123"),
                entries2 = this.group3.findEntriesByProperty("username", "not here"),
                entries3 = this.group3.findEntriesByProperty("password", /^\d{7,}$/);
            test.strictEqual(entries1.length, 0, "No entries should be found for non-existent property");
            test.strictEqual(entries2.length, 0, "No entries should be found for non-existent value");
            test.strictEqual(entries3.length, 0, "No entries should be found for non-existent value-regex");
            test.done();
        }

    },

    findGroupByID: {

        findsNestedGroup: function(test) {
            var group = this.group5.findGroupByID(this.group5BottomID);
            test.strictEqual(group.getTitle(), "sub3", "Should find group with its ID");
            test.done();
        },

        returnsNullForNotFound: function(test) {
            var group = this.group5.findGroupByID("12345");
            test.strictEqual(group, null, "Should not find non-existing group");
            test.done();
        }

    },

    findGroupsByTitle: {

        testFindsParentByString: function(test) {
            var groups = this.group4.findGroupsByTitle("findGroupsSub2");
            test.strictEqual(groups.length, 1, "Only 1 group should be found");
            test.strictEqual(groups[0].getTitle(), "findGroupsSub2", "Found group should be correct");
            test.done();
        },

        testFindsChildByPartialString: function(test) {
            var groups = this.group4.findGroupsByTitle("findGroupsSub");
            test.strictEqual(groups.length, 3, "All sub groups should be found");
            test.done();
        },

        testFindsNothing: function(test) {
            var groups1 = this.group4.findGroupsByTitle("-"),
                groups2 = this.group4.findGroupsByTitle(/abc/i);
            test.strictEqual(groups1.length, 0, "No groups should be found for non-matching string");
            test.strictEqual(groups2.length, 0, "No groups should be found for non-matching RegExp");
            test.done();
        },

        testFindsChildrenByRegExp: function(test) {
            var groups = this.group4.findGroupsByTitle(/findGroupsSub(1|2)/i);
            test.strictEqual(groups.length, 2, "Only 2 children should be found");
            test.done();
        }

    },

    getAttribute: {

        testGetsAttribute: function(test) {
            test.strictEqual(this.group2.getAttribute("testAttr"), "testValue", "Attribute value should be correct");
            test.strictEqual(this.group2.getAttribute("nothere"), undefined, "Non-existent should return undefined");
            test.done();
        }

    },

    getEntries: {

        testGetsEntries: function(test) {
            var entries = this.group2.getEntries();
            test.strictEqual(entries.length, 1, "One entry should be returned");
            test.done();
        }

    },

    getGroupByID: {

        getsASubGroup: function(test) {
            var newGroup = this.group3.createGroup("sub");
            var foundGroup = this.group3.getGroupByID(newGroup.getID());
            test.strictEqual(foundGroup.getID(), newGroup.getID(), "Group should be found");
            test.done();
        }

    },

    getID: {

        testGetsID: function(test) {
            test.strictEqual(this.group2.getID(), this.group2ID, "ID should be correct");
            test.done();
        }

    },

    getTitle: {

        testGetsTitle: function(test) {
            test.strictEqual(this.group2.getTitle(), "Main", "Title should be correct");
            test.done();
        }

    },

    isInTrash: {

        detectsWhenInTrash: function(test) {
            var mainGroup = this.group3,
                trash = this.group3Archive.getTrashGroup();
            test.strictEqual(mainGroup.isInTrash(), false, "Should not be in trash first up");
            mainGroup.moveToGroup(trash);
            test.strictEqual(mainGroup.isInTrash(), true, "Should be in trash after moving");
            test.done();
        }

    },

    isTrash: {

        returnsCorrectly: function(test) {
            test.strictEqual(this.group2.isTrash(), false, "Group should not be trash yet");
            this.group2.setAttribute(Group.Attributes.Role, "trash");
            test.strictEqual(this.group2.isTrash(), true, "Group should be trash");
            test.done();
        }

    },

    moveTo: {

        movesToAnotherGroup: function(test) {
            test.ok(this.group2.getGroups().length === 0, "Target group should have no children yet");
            this.moveGroup.moveTo(this.group2);
            test.ok(this.group2.getGroups().length === 1, "Target group should have the new child group");
            test.done();
        },

        throwsForTrashGroup: function(test) {
            this.moveGroup.setAttribute(Group.Attributes.Role, "trash");
            test.throws(function() {
                this.moveGroup.moveTo(this.group2);
            }, null, "Should throw when trying to move");
            test.done();
        },

        movesToRoot: function(test) {
            var parent = this.moveGroup,
                archive = parent._getArchive(),
                child = parent.createGroup("Child");
            test.ok(parent.findGroupByID(child.getID()) instanceof Group, "Should find child");
            child.moveTo(archive);
            test.ok(parent.findGroupByID(child.getID()) instanceof Group === false, "Should not find child");
            test.ok(archive.getGroups().some(function(group) {
                return group.getID() === child.getID();
            }), "Group should be in root");
            test.done();
        },

        failsIfOriginReadOnly: function(test) {
            this.moveGroup._getArchive()._getWestley().readOnly = true;
            test.throws(() => {
                this.moveGroup.moveTo(this.group2);
            }, Error, "Should throw for moving within read-only archives");
            test.done();
        }

    },

    readOnly: {

        failsToWriteInROMode: function(test) {
            this.group2._getWestley().readOnly = true;
            test.throws(
                function() {
                    this.group2.setTitle("New title");
                },
                Error,
                "Should throw when trying to change group in read-only archive"
            );
            test.done();
        }

    },

    setAttribute: {

        setsAttribute: function(test) {
            this.group2.setAttribute("number", "two");
            test.strictEqual(this.group2.getAttribute("number"), "two", "Attribute should be set to the correct value");
            test.done();
        }

    },

    toObject: {

        outputsProperties: function(test) {
            var obj = this.group.toObject();
            test.strictEqual(obj.id, this.id, "Should transfer id");
            test.strictEqual(obj.title, "My group", "Should transfer title");
            test.strictEqual(obj.attributes.test, "value", "Attributes should be transferred");
            test.strictEqual(obj.shared, false, "Should not be `shared`");
            test.strictEqual(obj.foreign, false, "Should not be `foreign`");
            test.done();
        },

        outputsGroupsAndEntriesByDefault: function(test) {
            var obj = this.group3.toObject();
            test.strictEqual(obj.entries.length, 1, "Should output entries");
            test.strictEqual(obj.groups.length, 2, "Should output groups");
            test.done();
        },

        outputsGroupsAndEntriesByFlags: function(test) {
            var obj = this.group3.toObject(
                Group.OutputFlag.Entries | Group.OutputFlag.Groups
            );
            test.strictEqual(obj.entries.length, 1, "Should output entries");
            test.strictEqual(obj.groups.length, 2, "Should output groups");
            test.done();
        },

        outputsEntriesOnlyByFlag: function(test) {
            var obj = this.group3.toObject(Group.OutputFlag.Entries);
            test.strictEqual(obj.entries.length, 1, "Should output entries");
            test.ok(!obj.hasOwnProperty("groups"), "Should not output groups");
            test.done();
        },

        outputsGroupsOnlyByFlag: function(test) {
            var obj = this.group3.toObject(Group.OutputFlag.Groups);
            test.strictEqual(obj.groups.length, 2, "Should output groups");
            test.ok(!obj.hasOwnProperty("entries"), "Should not output entries");
            test.done();
        },

        outputsNeitherEntriesNorGroupsForFlag: function(test) {
            var obj = this.group3.toObject(Group.OutputFlag.OnlyGroup);
            test.ok(!obj.hasOwnProperty("groups"), "Should not output groups");
            test.ok(!obj.hasOwnProperty("entries"), "Should not output entries");
            test.done();
        }

    }

};
