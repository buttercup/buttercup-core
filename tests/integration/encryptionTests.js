var lib = require("../../source/module.js"),
	Encryption = lib.Encryption,
	Decryption = lib.Decryption;

module.exports = {

	testDecrypting: function(test) {
		var text = "A sample p13ce of text... ",
			pass = "123 abc";
		var encrypted = Encryption.encrypt(text, pass),
			decryped = Decryption.decrypt(encrypted, pass);
		test.ok(encrypted.length > 0, "Encrypted content length should not be 0");
		test.notStrictEqual(encrypted, text, "Content should be encrypted");
		test.strictEqual(decryped, text, "Decrypted content should match original");
		test.done();
	}

};