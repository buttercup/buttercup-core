var lib = require("__buttercup/module.js"),
	Encryption = lib.Encryption;

module.exports = {

	encrypt: {

		testLength: function(test) {
			var encrypted = Encryption.encrypt("some text", "the password");
			//console.log("encrypted", encrypted);
			test.ok(encrypted.length > 0, "Length should be greater than 0");
			test.done();
		},

		testModified: function(test) {
			var encrypted = Encryption.encrypt("some text", "the password");
			test.notStrictEqual(encrypted, "some text");
			test.done();
		}

	},

	generateDerivedKey: {

		testGeneratesComponents: function(test) {
			var components = Encryption.generateDerivedKey("password", "salt");
			test.ok(components.salt.length > 0, "Salt should be defined and not empty");
			test.ok(components.key.length > 0, "Key should be defined and not empty");
			test.ok(components.hmac.length > 0, "HMAC key should be defined and not empty");
			test.done();
		},

		testUsesSameSalt: function(test) {
			var components1 = Encryption.generateDerivedKey("password", "salt1"),
				components2 = Encryption.generateDerivedKey("password", "salt1");
			test.strictEqual(components1.salt, components2.salt, "Salts should match");
			test.strictEqual(components1.salt, "salt1", "Should use provided salt");
			test.done();
		},

		testProducesSameOutput: function(test) {
			var components1 = Encryption.generateDerivedKey("humperdinck"),
				salt = components1.salt,
				rounds = components1.rounds,
				components2 = Encryption.generateDerivedKey("humperdinck", salt, rounds);
			test.strictEqual(components1.key.toString("hex"), components2.key.toString("hex"), "Keys should match");
			test.strictEqual(components1.hmac.toString("hex"), components2.hmac.toString("hex"), "HMACs should match");
			test.strictEqual(components1.salt, components2.salt, "Salts should match");
			test.done();
		}

	},

	generateIV: {

		testLength: function(test) {
			var iv = Encryption.generateIV();
			test.strictEqual(iv.length, 16);
			test.done();
		}

	},

	generateSalt: {

		testGeneratesSaltForLength: function(test) {
			test.strictEqual(Encryption.generateSalt(8).length, 8);
			test.strictEqual(Encryption.generateSalt(50).length, 50);
			test.done();
		},

		testGeneratesHex: function(test) {
			var salt = Encryption.generateSalt(100);
			test.ok(/^[a-f0-9]+$/i.test(salt), "Salt should be hex");
			test.done();
		}

	},

	packEncryptedContent: {

		testPacksText: function(test) {
			var packed = Encryption.packEncryptedContent("!encrypted!", "(iv)", ".salt.", "+hmac+", "123456"),
				indEnc = packed.indexOf("!encrypted!"),
				indIV = packed.indexOf("(iv)"),
				indSalt = packed.indexOf(".salt."),
				indHmac = packed.indexOf("+hmac+"),
				indRounds = packed.indexOf("123456");
			test.ok(indEnc === 0, "Encrypted content should be first");
			test.ok(indIV > indEnc, "IV should be after encrypted content");
			test.ok(indSalt > indIV, "Salt should be after IV");
			test.ok(indHmac > indSalt, "HMAC should be after salt");
			test.ok(indRounds > indHmac, "PBKDF2 rounds should be after HMAC");
			test.done();
		}

	}

};
