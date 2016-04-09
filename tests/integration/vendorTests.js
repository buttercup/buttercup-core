var lib = require("../../source/module.js");

var iocane = require("iocane");

module.exports = {

    testOverridesPBKDF2: function(test) {
        var run = 0,
            overrideFn = function() {
                run++;
                return Promise.resolve(new Buffer("ffffff", "utf-8"));
            };
        lib.vendor.iocane.components.setPBKDF2(overrideFn);
        iocane.derivation.deriveFromPassword("pass", "salt", 12345)
            .then(function(hash) {
                test.strictEqual(hash.key.toString("hex"), "666666", "Hash should be fake");
                test.strictEqual(run, 1, "Override function should have been overidden");
                // now reset
                lib.vendor.iocane.components.setPBKDF2(undefined);
                return iocane.derivation.deriveFromPassword("pass", "salt", 12345)
                    .then(function(hash) {
                        test.strictEqual(
                            hash.key.toString("hex"),
                            "0cddb8db0a35e65275aae28041bc2206af9c6cb1d4f1d8139ab9251aad2bb111",
                            "Hash function should be back to normal"
                        );
                        test.done();
                    });
            })
            .catch(function(err) {
                console.error(err);
            });
    }

};
