const { objectValues } = require("../../../source/tools/polyfill.js");

describe("objectValues", function() {

    it("returns the correct values", function() {
        const amazing = {};
        const values = objectValues({
            abc: 123,
            amazing,
            nullValue: null
        });
        expect(values).to.contain(123);
        expect(values).to.contain(amazing);
        expect(values).to.contain(null);
    });

});
