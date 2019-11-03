const Buttercup = require("../../source/web/index.js");
const { deriveKeyFromPassword, patchCorePBKDF } = require("../../source/web/HashingTools.js");

describe("HashingTools", function() {
    describe("deriveKeyFromPassword", function() {
        it("derives a key", function() {
            return deriveKeyFromPassword("testpass", "x123", 1000, 256).then(arrBuff => {
                const hex = arrBuff.toString("hex");
                expect(hex).to.match(/[a-f0-9]{64}/);
            });
        });
    });

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
