const Archive = require("../../source/node/Archive.js");
const Entry = require("../../source/node/Entry.js");
const Group = require("../../source/node/Group.js");

describe("Group", function() {
    beforeEach(function() {
        this.archive = Archive.createWithDefaults();
        this.group = this.archive.createGroup("test");
        this.entry1 = this.group.createEntry("entry1");
        this.entry2 = this.group.createEntry("entry2");
    });

    describe("get:id", function() {
        it("returns the correct ID", function() {
            expect(this.group.id).to.equal(this.group._getRemoteObject().id);
        });
    });

    describe("createEntry", function() {
        it("returns an Entry instance", function() {
            const entry = this.group.createEntry("testing");
            expect(entry).to.be.an.instanceof(Entry);
        });

        it("adds an entry to the group", function() {
            const entry = this.group.createEntry("testing");
            expect(this.group.getEntries().map(e => e.id)).to.contain(entry.id);
        });

        it("can create title-less entries", function() {
            const entry = this.group.createEntry();
            expect(entry.getProperty("title")).to.equal("");
        });
    });

    describe("createGroup", function() {
        it("returns an Group instance", function() {
            const group = this.group.createGroup("testing");
            expect(group).to.be.an.instanceof(Group);
        });

        it("adds a group to the group", function() {
            const group = this.group.createGroup("testing");
            expect(this.group.getGroups().map(g => g.id)).to.contain(group.id);
        });

        it("can create title-less groups", function() {
            const group = this.group.createGroup();
            expect(group.getTitle()).to.equal("");
        });
    });

    describe("delete", function() {
        it("sends the group to the trash", function() {
            const trash = this.archive.getTrashGroup();
            expect(trash.getGroups().map(g => g.id)).to.not.contain(this.group.id);
            const deleted = this.group.delete();
            expect(trash.getGroups().map(g => g.id)).to.contain(this.group.id);
            expect(deleted).to.be.false;
        });

        it("can force-delete the group", function() {
            const trash = this.archive.getTrashGroup();
            const groupID = this.group.id;
            expect(trash.getGroups().map(g => g.id)).to.not.contain(groupID);
            const deleted = this.group.delete(/* skip */ true);
            expect(trash.getGroups().map(g => g.id)).to.not.contain(groupID);
            expect(deleted).to.be.true;
        });
    });
});
