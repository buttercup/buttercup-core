var datasourceTools = require("../source/tools/datasource.js");

module.exports = {

	setUp: function(cb) {
		(cb)();
	},

    extractDSStrProps: {

        testExtractsProperties: function(test) {
            let props = "ds=text,something=1,another-one=something.else,empty=",
                extracted = datasourceTools.extractDSStrProps(props);
            test.strictEqual(extracted.ds, "text", "Should extract datasource type correctly");
            test.strictEqual(extracted.something, "1", "Should extract basic properties");
            test.strictEqual(extracted["another-one"], "something.else", "Should extract properties with other characters");
            test.strictEqual(extracted.empty, "", "Should extract empty properties");
            test.done();
        }

    }

};
