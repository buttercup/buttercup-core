var signing = require("../source/node/tools/signing.js");

module.exports = {
    testStripSignature: function(test) {
        var raw = "SomeEncryptedContent",
            signature = signing.getSignature(),
            signed = signing.sign(raw);
        test.ok(signed.indexOf(signature) >= 0);
        test.ok(signed.indexOf(raw) > 0);
        test.notStrictEqual(signed, raw);
        test.done();
    }
};
