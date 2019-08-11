const {
    ENTRY_URL_TYPE_GENERAL,
    ENTRY_URL_TYPE_ICON,
    ENTRY_URL_TYPE_LOGIN,
    getEntryURLs
} = require("../../../source/node/tools/entry.js");

describe("tools/entry", function() {
    describe("getEntryURLs", function() {
        it("returns an array of URLs by default", function() {
            const urls = getEntryURLs({
                url: "test.com",
                "login-url": "test.com/login"
            });
            expect(urls).to.deep.equal(["test.com", "test.com/login"]);
        });

        it("returns an empty array when no URLs are present", function() {
            const urls = getEntryURLs({
                username: "a",
                password: "b",
                title: "url"
            });
            expect(urls).to.deep.equal([]);
        });

        it("supports returning login URLs as a preference", function() {
            const urls = getEntryURLs(
                {
                    url: "test.com",
                    "login-url": "test.com/login",
                    "icon-uri": "test.com/favicon.ico"
                },
                ENTRY_URL_TYPE_LOGIN
            );
            expect(urls).to.have.lengthOf(3);
            expect(urls[0]).to.equal("test.com/login");
        });

        it("supports returning general URLs as a preference", function() {
            const urls = getEntryURLs(
                {
                    "login-url": "test.com/login",
                    url: "test.com",
                    "icon-uri": "test.com/favicon.ico"
                },
                ENTRY_URL_TYPE_GENERAL
            );
            expect(urls).to.have.lengthOf(3);
            expect(urls[0]).to.equal("test.com");
        });

        it("supports returning icon URLs (but no others)", function() {
            const urls = getEntryURLs(
                {
                    "login-url": "test.com/login",
                    url: "test.com",
                    "icon url": "test.com/favicon.ico"
                },
                ENTRY_URL_TYPE_ICON
            );
            expect(urls).to.have.lengthOf(1);
            expect(urls[0]).to.equal("test.com/favicon.ico");
        });
    });
});
