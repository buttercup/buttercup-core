const Archive = require("../../source/node/Archive.js");
const Entry = require("../../source/node/Entry.js");

describe("Entry", function() {
    beforeEach(function() {
        this.archive = Archive.createWithDefaults();
        this.group = this.archive.createGroup("test");
        this.entry = this.group.createEntry("entry");
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
});
