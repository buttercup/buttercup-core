describe("fuzzySearchEntries", function() {

    const { fuzzySearchEntries } = tools.searching.instance;

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
        });

        it("returns no entries for empty search string", function() {
            let entries = fuzzySearchEntries(this.archive.getGroups(), "");
            expect(entries).to.have.lengthOf(0);
        });

        it("searches all levels for entries", function() {
            let entries = fuzzySearchEntries(this.archive.getGroups(), "a");
            expect(entries).to.contain(this.entry1);
            expect(entries).to.contain(this.entry2);
            expect(entries).to.contain(this.entry3);
            expect(entries).to.contain(this.entry4);
        });

        it("returns entries related to a term", function() {
            let entries = fuzzySearchEntries(this.archive.getGroups(), "bank");
            expect(entries).to.contain(this.entry1);
            expect(entries).to.contain(this.entry2);
            expect(entries).to.contain(this.entry3);
            expect(entries).to.not.contain(this.entry4);
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
        });

        it("returns entries by username searches", function() {
            let entries = fuzzySearchEntries(this.archive.getGroups(), "john");
            expect(entries).to.contain(this.entry1);
            expect(entries).to.not.contain(this.entry2);
        });

        it("returns entries for similar usernames", function() {
            let entries = fuzzySearchEntries(this.archive.getGroups(), "blog");
            expect(entries).to.contain(this.entry1);
            expect(entries).to.contain(this.entry2);
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
        });

        it("returns entries by URL searches", function() {
            let entries = fuzzySearchEntries(this.archive.getGroups(), "secure");
            expect(entries).to.contain(this.entry1);
            expect(entries).to.not.contain(this.entry2);
        });

        it("returns entries for similar URLs", function() {
            let entries = fuzzySearchEntries(this.archive.getGroups(), "shopping");
            expect(entries).to.contain(this.entry1);
            expect(entries).to.contain(this.entry2);
        });

    });

});
