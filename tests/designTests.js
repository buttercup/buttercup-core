var designTools = require("../source/tools/design.js");

module.exports = {

	setUp: function(cb) {
		(cb)();
	},

    getImageData: {

        testGetsData: function(test) {
            var image = designTools.getImageData("about");
            test.strictEqual(image.name, "about");
            test.strictEqual(image.image.indexOf("data:image"), 0);
            test.done();
        },

        testGetsAllImages: function(test) {
            designTools.getImageNames()
                .map(function(imageName) {
                    return designTools.getImageData(imageName);
                })
                .forEach(function(imageData) {
                    test.ok(imageData);
                });
            test.done();
        }

    },

	getImageNames: {

		testGetsNames: function(test) {
            var names = designTools.getImageNames();
            test.ok(names.length > 0);
            test.done();
        }

	}

};
