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
});
