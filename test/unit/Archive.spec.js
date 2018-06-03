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
            expect(this.archive.getGroups().map(group => group.id)).to.contain(group.id);
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

    describe("getAttribute", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.archive.setAttribute("testing", "string");
        });

        it("returns the correct value", function() {
            expect(this.archive.getAttribute("testing")).to.equal("string");
        });

        it("returns undefined if the attribute doesn't exist", function() {
            expect(this.archive.getAttribute("nope")).to.be.undefined;
        });
    });

    describe("getAttributes", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.archive.setAttribute("one", "first");
            this.archive.setAttribute("two", "second");
        });

        it("returns an object holding all the attributes", function() {
            expect(this.archive.getAttributes()).to.deep.equal({
                one: "first",
                two: "second"
            });
        });
    });

    describe("getEntryByID", function() {
        beforeEach(function() {
            this.archive = new Archive();
            const group = this.archive.createGroup("test");
            this.entry1 = group.createEntry("one");
            this.entry2 = group.createEntry("two");
        });

        it("gets the correct entry", function() {
            const foundEntry = this.archive.getEntryByID(this.entry1.id);
            expect(foundEntry.id).to.equal(this.entry1.id);
        });
    });

    describe("getFormat", function() {
        beforeEach(function() {
            this.archive = new Archive();
        });

        it("returns the format", function() {
            expect(this.archive.getFormat()).to.equal("buttercup/a");
        });
    });

    describe("getGroupByID", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.top = this.archive.createGroup("top");
            this.bottom = this.top.createGroup("bottom");
        });

        it("gets the correct group", function() {
            const found = this.archive.getGroupByID(this.bottom.id);
            expect(found.id).to.equal(this.bottom.id);
        });

        it("returns null if not found", function() {
            const found = this.archive.getGroupByID("");
            expect(found).to.be.null;
        });
    });

    describe("getGroups", function() {
        beforeEach(function() {
            this.archive = new Archive();
            this.group = this.archive.createGroup("test");
        });

        it("returns an array", function() {
            expect(this.archive.getGroups()).to.be.an("array");
        });

        it("contains expected groups", function() {
            expect(this.archive.getGroups().map(g => g.id)).to.contain(this.group.id);
        });
    });

    describe("getHistory", function() {
        beforeEach(function() {
            this.archive = new Archive();
        });

        it("returns an array", function() {
            expect(this.archive.getHistory()).to.be.an("array");
        });
    });

    describe("getTrashGroup", function() {
        it("returns null when no trash", function() {
            const archive = new Archive();
            expect(archive.getTrashGroup()).to.be.null;
        });

        it("returns the trash group", function() {
            const archive = Archive.createWithDefaults();
            expect(archive.getTrashGroup()).to.be.an.instanceof(Group);
        });
    });

    describe("optimise", function() {
        it("requests history for flattening", function() {
            const archive = Archive.createWithDefaults();
            sinon.spy(archive._getWestley(), "getHistory");
            archive.optimise();
            expect(archive._getWestley().getHistory.calledOnce).to.be.true;
        });
    });

    describe("setAttribute", function() {
        beforeEach(function() {
            this.archive = new Archive();
        });

        it("sets attributes", function() {
            this.archive.setAttribute("testing", "123");
            expect(this.archive.getAttribute("testing")).to.equal("123");
        });
    });
});
