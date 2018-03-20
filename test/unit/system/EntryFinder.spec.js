const Archive = require("../../../source/node/system/Archive.js");
const EntryFinder = require("../../../source/node/system/EntryFinder.js");

describe("EntryFinder", function() {
    it("supports multiple archives", function() {
        const a1 = new Archive();
        const a2 = new Archive();
        const e1 = a1.createGroup("main").createEntry("test");
        const e2 = a2.createGroup("main").createEntry("test");
        const finder = new EntryFinder([a1, a2]);
        expect(finder.search("test")).to.eql([{ entry: e1, archive: a1 }, { entry: e2, archive: a2 }]);
    });

    describe("searching by title", function() {
        beforeEach(function() {
            // mock data
            this.archive = new Archive();
            let groupA = this.archive.createGroup("GroupA"),
                groupB = this.archive.createGroup("GroupB"),
                groupC = groupB.createGroup("GroupC");
            this.entry1 = groupA.createEntry("My personal bank");
            this.entry2 = groupB.createEntry("Other banking login");
            this.entry3 = groupC.createEntry("Car ranking site");
            this.entry4 = groupC.createEntry("Unicorns are great");
            this.finder = new EntryFinder(this.archive);
        });

        it("returns no entries for empty search string", function() {
            let entries = this.finder.search("");
            expect(entries).to.have.lengthOf(0);
        });

        it("searches all levels for entries", function() {
            let entries = this.finder.search("a");
            expect(entries.map(i => i.entry.getProperty("title")).sort()).to.eql(
                ["My personal bank", "Other banking login", "Car ranking site", "Unicorns are great"].sort()
            );
        });

        it("returns entries related to a term", function() {
            const entries = this.finder.search("bank");
            expect(entries.map(i => i.entry.getProperty("title")).sort()).to.eql(
                ["My personal bank", "Other banking login", "Car ranking site"].sort()
            );
        });
    });

    describe("searching by username", function() {
        beforeEach(function() {
            // mock data
            this.archive = new Archive();
            let groupA = this.archive.createGroup("GroupA"),
                groupB = this.archive.createGroup("GroupB");
            this.entry1 = groupA.createEntry("My personal bank");
            this.entry2 = groupB.createEntry("Other banking login");
            this.entry1.setProperty("username", "john@myawesomeblog.org");
            this.entry2.setProperty("username", "danielle487@myawesomeblog.org");
            this.finder = new EntryFinder(this.archive);
        });

        it("returns entries by username searches", function() {
            let entries = this.finder.search("john");
            expect(entries.map(i => i.entry.getProperty("username")).sort()).to.eql(["john@myawesomeblog.org"]);
        });

        it("returns entries for similar usernames", function() {
            let entries = this.finder.search("blog");
            expect(entries.map(i => i.entry.getProperty("username")).sort()).to.eql([
                "danielle487@myawesomeblog.org",
                "john@myawesomeblog.org"
            ]);
        });
    });

    describe("searching by URL", function() {
        beforeEach(function() {
            // mock data
            this.archive = new Archive();
            let groupA = this.archive.createGroup("GroupA"),
                groupB = this.archive.createGroup("GroupB");
            this.entry1 = groupA.createEntry("My personal bank");
            this.entry2 = groupB.createEntry("Other banking login");
            this.entry1.setMeta("URL", "https://secure.shopping.com/login");
            this.entry2.setMeta("url", "http://www.someplace.org/shopping/entry.php");
            this.finder = new EntryFinder(this.archive);
        });

        it("returns entries by URL searches", function() {
            const entries = this.finder.search("secure");
            expect(entries.map(i => i.entry.getMeta("URL") || i.entry.getMeta("url")).sort()).to.eql([
                "https://secure.shopping.com/login"
            ]);
        });

        it("returns entries for similar URLs", function() {
            const entries = this.finder.search("shopping");
            expect(entries.map(i => i.entry.getMeta("URL") || i.entry.getMeta("url")).sort()).to.eql([
                "http://www.someplace.org/shopping/entry.php",
                "https://secure.shopping.com/login"
            ]);
        });
    });
});
