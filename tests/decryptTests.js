var lib = require("../source/module.js"),
	Decryption = lib.Decryption;

module.exports = {

	testStringPop: function(test) {
		var text = "FirstLast",
			pop = Decryption.stringPop(text, 5);
		test.strictEqual(pop.popped, "First");
		test.strictEqual(pop.altered, "Last");
		test.done();
	}
};