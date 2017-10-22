const Buttercup = require("../../source/web/index.js");
const { Web } = Buttercup;

describe("Web", function() {
    it("exports HashingTools", function() {
        expect(Web)
            .to.have.property("HashingTools")
            .that.is.an("object");
    });

    describe("HashingTools", function() {
        it("exports the PBKDF2 patch method", function() {
            expect(Web.HashingTools)
                .to.have.property("patchCorePBKDF")
                .that.is.a("function");
        });
    });
});
