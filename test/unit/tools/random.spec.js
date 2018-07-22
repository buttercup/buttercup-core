const { generateRandomString } = require("../../../source/node/tools/random.js");

describe("tools/random", function() {
    describe("generateRandomString", function() {
        it("generates strings of correct length", function() {
            return generateRandomString(18).then(str => {
                expect(str).to.have.lengthOf(18);
            });
        });

        it("generates strings from a specific character set", function() {
            return generateRandomString(13, "abc123").then(str => {
                expect(str).to.match(/^[abc123]{13}$/);
            });
        });

        it("rejects when an invalid length is passed", function() {
            const work = generateRandomString();
            return expect(work).to.be.rejectedWith(/invalid length/);
        });
    });
});
