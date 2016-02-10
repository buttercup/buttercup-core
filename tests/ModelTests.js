var lib = require("__buttercup/module.js"),
	Model = lib.Model;

module.exports = {

	setUp: function(cb) {
		this.model = new Model({
            level1: {
                level2: {
                    item1: false
                },
                nullVal: null
            },
            first: 123
        });
		(cb)();
	},

    get: {

        testGetsNestedValue: function(test) {
            var val = this.model.get("level1.level2.item1", true);
            test.strictEqual(val, false, "Correct value should be returned");
            test.done();
        },

        testGetsTopLevelValue: function(test) {
            var val = this.model.get("first", 321);
            test.strictEqual(val, 123, "Correct value should be returned");
            test.done();
        },

        testReturnsDefaults: function(test) {
            test.strictEqual(this.model.get("not.here", null), null, "Default should be returned (null)");
            test.strictEqual(this.model.get("level1.nope", false), false, "Default should be returned (false)");
            test.strictEqual(this.model.get("whoops", "test"), "test", "Default should be returned ('test')");
            test.done();
        },

        testGetsPartial: function(test) {
            test.deepEqual(this.model.get("level1.level2", null), {
                item1: false
            }, "Returned item should be an object");
            test.done();
        }

    },

    set: {

        testSetsTopLevel: function(test) {
            this.model.set("setvalue", "abc");
            test.strictEqual(this.model.get("setvalue"), "abc", "Set value should be retrievable");
            test.done();
        },

        testSetsNested: function(test) {
            this.model.set("a.b.c", 123);
            test.strictEqual(this.model.get("a.b.c"), 123, "Set value should be retrievable");
            test.done();
        }

    }

};
