const Flattener = require("../../source/node/Flattener.js");
const Archive = require("../../source/node/Archive.js");

describe("Flattener", function() {
    beforeEach(function() {
        this.archive = new Archive();
        const group = this.archive.createGroup("test");
        group.createEntry("test");
        for (let i = 0; i < 18000; i += 1) {
            group.setTitle(`Group title #${i}`);
        }
        group.setTitle("test2");
        this.groupID = group.id;
        this.flattener = new Flattener(this.archive._getWestley());
    });

    describe("canBeFlattened", function() {
        it("returns true for sets large enough", function() {
            expect(this.flattener.canBeFlattened()).to.be.true;
        });

        it("returns false for small sets", function() {
            const archive = Archive.createWithDefaults();
            const flattener = new Flattener(archive._getWestley());
            expect(flattener.canBeFlattened()).to.be.false;
        });
    });

    describe("flatten", function() {
        it("flattens sets", function() {
            const flattened = this.flattener.flatten();
            expect(flattened).to.be.true;
        });

        it("preserves recent properties", function() {
            this.flattener.flatten();
            const group = this.archive.findGroupByID(this.groupID);
            expect(group.getTitle()).to.equal("test2");
        });

        it("doesn't flatten multiple times", function() {
            this.flattener.flatten();
            const flattened = this.flattener.flatten();
            expect(flattened).to.be.false;
        });
    });
});
