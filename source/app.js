(function() {

	"use strict";

	var Buttercup = require(__dirname + "/module.js");

	var encrypted = Buttercup.encryptText("I love NodeJS!", "an amazing monkey");
	console.log(encrypted);
	var decrypted = Buttercup.decryptText(encrypted, "an amazing monkey");
	console.log(decrypted);

})();