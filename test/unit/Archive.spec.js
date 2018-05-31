const Archive = require("../../source/node/Archive.js");
const Group = require("../../source/node/Group.js");

describe("Archive", function() {
    it("can be instantiated", function() {
        expect(() => {
            new Archive();
        }).to.not.throw();
    });

    it("should be empty", function() {
        const archive = new Archive();
        expect(archive.getGroups()).to.have.lengthOf(0);
    });

    describe("static:createWithDefaults", function() {
        it("populates the archive with a 'General' group", function() {
            const archive = Archive.createWithDefaults();
            const generalGroup = archive.getGroups().find(group => group.getTitle() === "General");
            expect(generalGroup).to.be.an.instanceof(Group);
        });

        it("populates the archive with a 'Trash' group", function() {
            const archive = Archive.createWithDefaults();
            const trashGroup = archive.getGroups().find(group => group.getTitle() === "Trash");
            expect(trashGroup).to.be.an.instanceof(Group);
        });
    });

    describe("createGroup", function() {
        beforeEach(function() {
            this.archive = new Archive();
        });

        it("returns a group", function() {
            const group = this.archive.createGroup("new");
            expect(group).to.be.an.instanceof(Group);
        });

        it("adds a group to the archive", function() {
            const group = this.archive.createGroup("new");
            expect(this.archive.getGroups().map(group => group.getID())).to.contain(group.getID());
        });
    });

    describe("deleteAttribute", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.archive.setAttribute("test", "value");
        });

        it("deletes attributes", function() {
            expect(this.archive.getAttribute("test")).to.equal("value");
            this.archive.deleteAttribute("test");
            expect(this.archive.getAttribute("test")).to.be.undefined;
        });

        it("throws if an attribute doesn't exist", function() {
            expect(() => {
                this.archive.deleteAttribute("not-here");
            }).to.throw(/doesn't exist/i);
        });
    });

    describe("emptyTrash", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.group = this.archive.createGroup("fake-trash");
            this.group.createGroup("sub1");
            this.group.createGroup("sub2");
            this.group.createEntry("entry");
            sinon.stub(this.archive, "getTrashGroup").returns(this.group);
        });

        it("empties all groups in the trash", function() {
            expect(this.group.getGroups()).to.have.length.above(0);
            this.archive.emptyTrash();
            expect(this.group.getGroups()).to.have.lengthOf(0);
        });

        it("empties all entries in the trash", function() {
            expect(this.group.getEntries()).to.have.length.above(0);
            this.archive.emptyTrash();
            expect(this.group.getEntries()).to.have.lengthOf(0);
        });
    });
});
