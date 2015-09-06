(function(module) {

	"use strict";

	var Crypto = require("crypto"),
    	algorithm = "aes-256-gcm";

    function encrypt(text, iv, password) {
    	var cipher = Crypto.createCipheriv(algorithm, password, iv);
		var encrypted = cipher.update(text, 'utf8', 'hex');
		encrypted += cipher.final('hex');
		var tag = cipher.getAuthTag();
		return {
			content: encrypted,
			iv: iv,
			tag: tag
		};
    }

	var lib = module.exports = {

		encrypt: function(text, password) {
			var packet = encrypt(
				text,
				lib.generateIV(),
				lib.hashPassword(password)
			);
			return lib.packEncryptedContent(packet.content, packet.iv, packet.tag);
		},

		generateIV: function() {
			return Crypto.randomBytes(16).toString("base64").substring(0, 12);
		},

		hashPassword: function(password) {
			return Crypto.createHash('sha256').update(password).digest();
		},

		packEncryptedContent: function(encryptedContent, iv, authTag) {
			return lib.zeroPad(iv.length) + iv + lib.zeroPad(authTag.length) + authTag + encryptedContent;
		},

		zeroPad: function(text) {
			return ("000" + text).slice(-3);
		}

	};

})(module);