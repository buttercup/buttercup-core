const { MyButtercupClient } = require("../../source/web/index.js");

describe("MyButtercupClient", function() {
    describe("static:generateAuthorisationURL", function() {
        it("generates a URL", function() {
            const url = MyButtercupClient.generateAuthorisationURL("bcup_test");
            expect(url).to.match(/^https?:\/\/.+/);
        });

        it("includes client ID", function() {
            const url = MyButtercupClient.generateAuthorisationURL("bcup_test");
            expect(url).to.contain("=bcup_test");
        });
    });

    it("can be instantiated", function() {
        expect(() => {
            const a = new MyButtercupClient("id", "sec", "access", "refresh");
        }).to.not.throw();
    });
});
