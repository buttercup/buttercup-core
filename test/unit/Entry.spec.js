const Archive = require("../../source/node/Archive.js");
const Entry = require("../../source/node/Entry.js");
const Group = require("../../source/node/Group.js");

describe("Entry", function() {
    beforeEach(function() {
        this.archive = Archive.createWithDefaults();
        this.group = this.archive.createGroup("test");
        this.entry = this.group.createEntry("entry");
        this.entry.setAttribute("attrib", "ok");
        this.entry.setAttribute("attrib2", "also-ok");
        this.entry.setMeta("metakey", "metaval");
    });

    describe("get:id", function() {
        it("returns the correct ID", function() {
            expect(this.entry.id).to.equal(this.entry._getRemoteObject().id);
        });
    });

    describe("delete", function() {
        it("moves itself to the Trash group", function() {
            const trash = this.archive.getTrashGroup();
            expect(trash.getEntries()).to.have.lengthOf(0);
            this.entry.delete();
            expect(trash.getEntries()).to.have.lengthOf(1);
            expect(trash.getEntries()[0].getProperty("title")).to.equal("entry");
        });

        it("deletes itself permanently when forced", function() {
            const trash = this.archive.getTrashGroup();
            expect(trash.getEntries()).to.have.lengthOf(0);
            this.entry.delete(/* skip */ true);
            expect(trash.getEntries()).to.have.lengthOf(0);
            expect(this.entry._westley).to.be.undefined;
        });
    });

    describe("deleteAttribute", function() {
        it("deletes attributes", function() {
            expect(this.entry.getAttribute("attrib")).to.equal("ok");
            this.entry.deleteAttribute("attrib");
            expect(this.entry.getAttribute("attrib")).to.be.undefined;
        });
    });

    describe("deleteMeta", function() {
        it("deletes meta", function() {
            expect(this.entry.getMeta("metakey")).to.equal("metaval");
            this.entry.deleteMeta("metakey");
            expect(this.entry.getMeta("metakey")).to.be.undefined;
        });
    });

    describe("getAttribute", function() {
        it("returns attributes", function() {
            expect(this.entry.getAttribute("attrib")).to.equal("ok");
        });

        it("returns undefined if the attribute doesn't exist", function() {
            expect(this.entry.getAttribute("nothere")).to.be.undefined;
        });

        it("returns an object if no parameter is provided", function() {
            expect(this.entry.getAttribute()).to.deep.equal({
                attrib: "ok",
                attrib2: "also-ok"
            });
        });
    });

    describe("getAttributes", function() {
        it("returns all attributes", function() {
            expect(this.entry.getAttributes()).to.deep.equal({
                attrib: "ok",
                attrib2: "also-ok"
            });
        });
    });

    describe("getGroup", function() {
        it("returns parent group", function() {
            expect(this.entry.getGroup()).to.be.an.instanceof(Group);
            expect(this.entry.getGroup().id).to.equal(this.group.id);
        });
    });
});
