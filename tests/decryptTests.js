var lib = require("../source/module.js"),
	Decryption = lib.Decryption;

module.exports = {

	setUp: function(cb) {
		this.encrypted = 'sBizZB+ZsDmgW8wnL9HWyw==$0048cc2a29c8c2fee52598d5a30d856d$85316c2568b9$7f9a0d1b86df26eacfb99c321b84dbefb953ecd9932b2a9fb15e166d0a3b88ae';
		this.password = "the password";
		this.expected = "some text";
		(cb)();
	},

	decrypt: {

		testDecryptsText: function(test) {
			var decrypted = Decryption.decrypt(this.encrypted, this.password);
			test.strictEqual(decrypted, this.expected, "Decrypted text should match");
			test.done();
		}

	},

	unpackEncryptedContent: {

		testUnpacksComponents: function(test) {
			var components = Decryption.unpackEncryptedContent(this.encrypted);
			test.ok(components.content.length > 0, "Encrypted content should be present");
			test.ok(components.iv.length > 0, "IV should be present");
			test.ok(components.salt.length > 0, "Salt should be present");
			test.ok(components.hmac.length > 0, "HMAC should be present");
			test.done();
		}

	}

};