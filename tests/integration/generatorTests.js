var gen = require("../_helpers/generator.js")

module.exports = {

	testGeneratesEnoughHistory: function(test) {
		var archive = gen(50);
		test.ok(archive._getWestley().getHistory().length > 100); // 50 lines, about, plus padding
		test.done();
	}

};
