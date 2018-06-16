const ArchiveComparator = require("../../source/node/ArchiveComparator.js");
const Archive = require("../../source/node/Archive.js");

describe("ArchiveComparator", function() {
    beforeEach(function() {
        this.archive1 = new Archive();
        this.archive2 = new Archive();
        this.archive2._getWestley().clear();
        this.archive1.getHistory().forEach(command => this.archive2._getWestley().execute(command));
    });

    describe("archivesDiffer", function() {
        it("returns false when no differences exist", function() {
            const comparator = new ArchiveComparator(this.archive1, this.archive2);
            expect(comparator.archivesDiffer()).to.be.false;
        });

        it("returns false when no differences exist after modification", function() {
            this.archive1.createGroup("hai");
            this.archive2._getWestley().clear();
            this.archive1.getHistory().forEach(command => this.archive2._getWestley().execute(command));
            const comparator = new ArchiveComparator(this.archive1, this.archive2);
            expect(comparator.archivesDiffer()).to.be.false;
        });

        it("returns true when an archive is out of date", function() {
            this.archive1.createGroup("hai");
            this.archive2._getWestley().clear();
            this.archive1.getHistory().forEach(command => this.archive2._getWestley().execute(command));
            this.archive1.createGroup("hai again");
            const comparator = new ArchiveComparator(this.archive1, this.archive2);
            expect(comparator.archivesDiffer()).to.be.true;
        });

        it("returns true for 2 different archives", function() {
            this.archive1 = Archive.createWithDefaults();
            this.archive2 = Archive.createWithDefaults();
            const comparator = new ArchiveComparator(this.archive1, this.archive2);
            expect(comparator.archivesDiffer()).to.be.true;
        });
    });

    describe("calculateDifferences", function() {
        beforeEach(function() {
            this.archive1 = Archive.createWithDefaults();
            this.archive2 = new Archive();
            this.archive2._getWestley().clear();
            this.archive1.getHistory().forEach(command => this.archive2._getWestley().execute(command));
            this.archive1.createGroup("diff group");
        });

        it("returns expected properties", function() {
            const comparator = new ArchiveComparator(this.archive1, this.archive2);
            const diffs = comparator.calculateDifferences();
            expect(diffs)
                .to.have.property("original")
                .that.is.an("array");
            expect(diffs)
                .to.have.property("secondary")
                .that.is.an("array");
            expect(diffs)
                .to.have.property("common")
                .that.is.an("array");
        });

        it("common history matches archive with shorter history", function() {
            const comparator = new ArchiveComparator(this.archive1, this.archive2);
            const { common } = comparator.calculateDifferences();
            expect(common).to.deep.equal(this.archive2.getHistory());
        });

        it("common and original histories make up longer archive history", function() {
            const comparator = new ArchiveComparator(this.archive1, this.archive2);
            const { common, original } = comparator.calculateDifferences();
            expect([...common, ...original]).to.deep.equal(this.archive1.getHistory());
        });

        it("shorter history diff is empty", function() {
            const comparator = new ArchiveComparator(this.archive1, this.archive2);
            const { secondary } = comparator.calculateDifferences();
            expect(secondary).to.have.lengthOf(0);
        });
    });
});
