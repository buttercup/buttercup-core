const Buttercup = require("../../source/web/index.js");
const { deriveKeyFromPassword, patchCorePBKDF } = require("../../source/web/HashingTools.js");

describe("HashingTools", function() {
    describe("patchCorePBKDF", function() {
        it("sets the correct method in iocane", function() {
            sinon.spy(Buttercup.vendor.iocane.components, "setPBKDF2");
            patchCorePBKDF();
            expect(Buttercup.vendor.iocane.components.setPBKDF2.calledWithExactly(deriveKeyFromPassword)).to.be.true;
            expect(Buttercup.vendor.iocane.components.setPBKDF2.calledOnce).to.be.true;
        });
    });
});
