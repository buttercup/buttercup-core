const Westley = require("../../source/node/Westley.js");

describe("Westley", function() {
    beforeEach(function() {
        this.westley = new Westley();
    });

    describe("clear", function() {
        it("clears the necessary properties", function() {
            Object.assign(this.westley, {
                _dataset: { test: 1 },
                _history: [1]
            });
            this.westley.clear();
            expect(this.westley.getDataset()).to.deep.equal({});
            expect(this.westley.getHistory()).to.deep.equal([]);
        });
    });
});
