var lib = require("../source/module.js"),
	Encryption = lib.Encryption;

module.exports = {

	encrypt: {

		testLength: function(test) {
			var encrypted = Encryption.encrypt("some text", "the password");
			test.ok(encrypted.length > 0, "Length should be greater than 0");
			test.done();
		},

		testModified: function(test) {
			var encrypted = Encryption.encrypt("some text", "the password");
			test.notStrictEqual(encrypted, "some text");
			test.done();
		}

	},

	generateIV: {

		testLength: function(test) {
			var iv = Encryption.generateIV();
			test.strictEqual(iv.length, 12);
			test.done();
		}

	},

	hashPassword: {

		testHashed: function(test) {
			var hash = Encryption.hashPassword("my password").toString("hex");
			test.ok(/^[a-f0-9]+$/i.test(hash), "Hash should be SHA");
			test.done();
		},

		testLength: function(test) {
			var hash = Encryption.hashPassword("my password");
			test.ok(hash.length > 0, "Length should be greater than 0");
			test.done();
		},

		testModified: function(test) {
			var hash = Encryption.hashPassword("my other password");
			test.notStrictEqual(hash, "my other password");
			test.done();
		}

	},

	packEncryptedContent: {

		testPacksText: function(test) {
			var iv = "1234567",
				content = "prepare-to-die",
				authTag = ".sd2";
			var packed = Encryption.packEncryptedContent(content, iv, authTag);
			test.ok(packed.indexOf(content) >= 0, "Content should be packed");
			test.ok(packed.indexOf(iv) >= 0, "IV should be packed");
			test.ok(packed.indexOf(authTag) >= 0, "Auth tag should be packed");
			test.done();
		}

	},

	zeroPad: {

		testPad: function(test) {
			var padded = Encryption.zeroPad("23");
			test.strictEqual(padded, "023");
			test.done();
		},

		testNoPad: function(test) {
			var padded = Encryption.zeroPad("467");
			test.strictEqual(padded, "467");
			test.done();
		}

	}

};