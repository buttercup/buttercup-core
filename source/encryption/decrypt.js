(function(module) {

	"use strict";

	var Crypto = require("crypto"),
    	algorithm = "aes-256-gcm";

    function decrypt(text, iv, authTag, password) {
    	var decipher = Crypto.createDecipheriv(algorithm, password, iv)
		decipher.setAuthTag(authTag);
		var dec = decipher.update(text, 'hex', 'utf8')
		dec += decipher.final('utf8');
		return dec;
    }

	var lib = module.exports = {

		decrypt: function(text, password) {
			var decryptProps = lib.unpackEncryptedContent(text);
			return decrypt(
				decryptProps.content,
				decryptProps.iv,
				decryptProps.tag,
				lib.hashPassword(password)
			);
		},

		hashPassword: function(password) {
			return Crypto.createHash('sha256').update(password).digest();
		},

		stringPop: function(text, count) {
			return {
				popped: text.substr(text, count),
				altered: text.substring(count, text.length)
			};
		},

		unpackEncryptedContent: function(encryptedContent) {
			// Firstly, get the IV:
			var ivLenPop = lib.stringPop(encryptedContent, 3),
				ivLen = parseInt(ivLenPop.popped, 10),
				ivPop = lib.stringPop(ivLenPop.altered, ivLen),
				iv = ivPop.popped,
				// Secondly get the auth tag:
				authLenPop = lib.stringPop(ivPop.altered, 3),
				authLen = parseInt(authLenPop.popped, 10),
				authPop = lib.stringPop(authLenPop.altered, authLen),
				authTag = authPop.popped,
				data = authPop.altered;
			return {
				content: data,
				iv: iv,
				tag: new Buffer(authTag, "hex")
			};
		}

	};

})(module);
