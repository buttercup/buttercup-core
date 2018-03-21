var compareTools = require("../source/node/tools/compare.js");

module.exports = {
    setUp: function(cb) {
        cb();
    },

    objectsDiffer: {
        confirmsComplexObjectsAreTheSame: function(test) {
            var o1 = {
                test: 123,
                items: [
                    "a",
                    true,
                    false,
                    false,
                    {
                        a: [1, 2, 3],
                        b: "hello"
                    }
                ],
                t: undefined,
                v: [null, undefined]
            };
            var o2 = {
                test: 123,
                t: undefined,
                v: [null, undefined],
                items: [
                    "a",
                    false,
                    {
                        a: [2, 3, 1],
                        b: "hello"
                    },
                    true,
                    false
                ]
            };
            test.strictEqual(compareTools.objectsDiffer(o1, o2), false, "Objects should be the same");
            test.done();
        },

        confirmsComplexObjectsDiffer: function(test) {
            var o1 = {
                test: 123,
                items: [
                    "a",
                    true,
                    false,
                    false,
                    {
                        a: [1, 2, 3],
                        b: "hello"
                    }
                ],
                t: undefined,
                v: [null, undefined]
            };
            var o2 = {
                test: 123,
                t: undefined,
                v: [null, undefined],
                items: [
                    "a",
                    false,
                    {
                        a: [2, 3, 1, 4], // added 4 here
                        b: "hello"
                    },
                    true,
                    false
                ]
            };
            test.strictEqual(compareTools.objectsDiffer(o1, o2), true, "Objects should be different");
            test.done();
        },

        worksCorrectlyOnPrimatives: function(test) {
            test.strictEqual(compareTools.objectsDiffer(1, 1), false, "Numbers should be the same");
            test.strictEqual(compareTools.objectsDiffer(1, 2), true, "Numbers should differ");
            test.strictEqual(compareTools.objectsDiffer("abc", "abc"), false, "Strings should be the same");
            test.strictEqual(compareTools.objectsDiffer("abc", "cba"), true, "Strings should differ");
            test.strictEqual(compareTools.objectsDiffer(true, true), false, "Booleans should be the same");
            test.strictEqual(compareTools.objectsDiffer(true, false), true, "Booleans should differ");
            test.strictEqual(compareTools.objectsDiffer(null, null), false, "Nulls should be the same");
            test.strictEqual(compareTools.objectsDiffer(null, undefined), true, "Null/undefined should differ");
            test.done();
        }
    }
};
