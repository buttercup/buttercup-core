const Archive = require("../../source/node/Archive.js");
const Group = require("../../source/node/Group.js");

describe("Archive", function() {
    beforeEach(function() {
        this.archive = Archive.createWithDefaults();
        const randomGroup = this.archive.createGroup("Random");
        randomGroup
            .createEntry("AWS Login")
            .setProperty("username", "person@email.com")
            .setProperty("password", "passw0rd")
            .setProperty("URL", "https://console.aws.com/login");
        randomGroup
            .createEntry("Bank")
            .setProperty("username", "person@email.com")
            .setProperty("password", "passw0rd")
            .setProperty("website", "https://bank.com/login");
        const deepGroup = randomGroup.createGroup("Testing");
        deepGroup
            .createEntry("Ebay.com.au")
            .setProperty("username", "person@email.com")
            .setProperty("password", "testing")
            .setProperty("url", "https://ebay.com.au/login");
        deepGroup
            .createEntry("ProtonMail")
            .setProperty("username", "person@email.com")
            .setProperty("password", "testing")
            .setProperty("URI", "https://protonmail.org/login");
    });

    describe("findEntriesByProperty", function() {
        it("should find all matching URLs", function() {
            const entries = this.archive.findEntriesByProperty(/ur[li]/i, /\/login/);
            expect(entries.length).to.equal(3);
            const names = entries.map(e => e.getProperty("title"));
            expect(names).to.contain("AWS Login");
            expect(names).to.contain("Ebay.com.au");
            expect(names).to.contain("ProtonMail");
        });

        it("should find entries using legacy (string-only) format", function() {
            const entries = this.archive.findEntriesByProperty("url", /\/login/);
            expect(entries.length).to.equal(1);
            const names = entries.map(e => e.getProperty("title"));
            expect(names).to.contain("Ebay.com.au");
        });
    });
});
