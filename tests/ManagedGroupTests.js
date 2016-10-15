var lib = require("../source/module.js"),
    encoding = require("../source/tools/encoding.js");

var ManagedGroup = lib.ManagedGroup,
    Archive = lib.Archive;

module.exports = {

    setUp: function(cb) {
        this.id = encoding.getUniqueID();
        this.group = new ManagedGroup(new Archive(), {
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

        var group3Archive = new Archive();
        this.group3 = group3Archive.createGroup("My group");
        this.group3.createGroup("sub1");
        this.group3.createGroup("sub2");
        this.group3.createEntry("entry1");

        (cb)();
    },

    delete: {

        testDeletesGroup: function(test) {
            var target = this.group2.createGroup("To delete");
            test.strictEqual(this.group2.getGroups().length, 1, "Target group should be a child");
            target.delete();
            test.strictEqual(this.group2.getGroups().length, 0, "Target group should have been deleted");
            test.done();
        },

        testThrowsForTrashGroup: function(test) {
            var target = this.group2
                .createGroup("To delete")
                    .setAttribute(ManagedGroup.Attributes.Role, "trash");
            test.throws(function() {
                target.delete();
            }, null, "delete should throw an error");
            test.strictEqual(this.group2.getGroups().length, 1, "Target group should not have been deleted");
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

    moveToGroup: {

        testMovesToAnotherGroup: function(test) {
            test.ok(this.group2.getGroups().length === 0, "Target group should have no children yet");
            this.moveGroup.moveToGroup(this.group2);
            test.ok(this.group2.getGroups().length === 1, "Target group should have the new child group");
            test.done();
        },

        testThrowsForTrashGroup: function(test) {
            this.moveGroup.setAttribute(ManagedGroup.Attributes.Role, "trash");
            test.throws(function() {
                this.moveGroup.moveToGroup(this.group2);
            }, null, "Should throw when trying to move");
            test.done();
        }

    },

    isTrash: {

        returnsCorrectly: function(test) {
            test.strictEqual(this.group2.isTrash(), false, "Group should not be trash yet");
            this.group2.setAttribute(ManagedGroup.Attributes.Role, "trash");
            test.strictEqual(this.group2.isTrash(), true, "Group should be trash");
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
                ManagedGroup.OutputFlag.Entries | ManagedGroup.OutputFlag.Groups
            );
            test.strictEqual(obj.entries.length, 1, "Should output entries");
            test.strictEqual(obj.groups.length, 2, "Should output groups");
            test.done();
        },

        outputsEntriesOnlyByFlag: function(test) {
            var obj = this.group3.toObject(ManagedGroup.OutputFlag.Entries);
            test.strictEqual(obj.entries.length, 1, "Should output entries");
            test.ok(!obj.hasOwnProperty("groups"), "Should not output groups");
            test.done();
        },

        outputsGroupsOnlyByFlag: function(test) {
            var obj = this.group3.toObject(ManagedGroup.OutputFlag.Groups);
            test.strictEqual(obj.groups.length, 2, "Should output groups");
            test.ok(!obj.hasOwnProperty("entries"), "Should not output entries");
            test.done();
        },

        outputsNeitherEntriesNorGroupsForFlag: function(test) {
            var obj = this.group3.toObject(ManagedGroup.OutputFlag.OnlyGroup);
            test.ok(!obj.hasOwnProperty("groups"), "Should not output groups");
            test.ok(!obj.hasOwnProperty("entries"), "Should not output entries");
            test.done();
        }

    }

};
