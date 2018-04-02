const Buttercup = require("../../source/web/index.js");
const { deriveKeyFromPassword, patchCorePBKDF } = require("../../source/web/HashingTools.js");

describe("HashingTools", function() {
    describe("patchCorePBKDF", function() {
        it("sets the correct method in iocane", function() {
            const iocaneGlobalConfig = Buttercup.vendor.iocane.configure();
            sinon.spy(iocaneGlobalConfig, "overrideKeyDerivation");
            patchCorePBKDF();
            expect(iocaneGlobalConfig.overrideKeyDerivation.calledWithExactly(deriveKeyFromPassword)).to.be.true;
            expect(iocaneGlobalConfig.overrideKeyDerivation.calledOnce).to.be.true;
        });
    });
});
