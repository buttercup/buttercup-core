(function(module) {

    "use strict";

    var Crypto = require("crypto"),
        pbkdf2 = require("pbkdf2"),
        Encryption = require("./encrypt.js"),
        config = require("./encryptionConfig.js");

    var constantTimeCompare = function(val1, val2) {
        var sentinel;

        if (val1.length !== val2.length) {
            return false;
        }

        for (var i = 0; i <= (val1.length - 1); i += 1) {
            sentinel |= val1.charCodeAt(i) ^ val2.charCodeAt(i);
        }

        return sentinel === 0;
    };

    var lib = module.exports = {

        decrypt: function(text, password) {
            // Fetch the components
            var components = lib.unpackEncryptedContent(text),
                encryptedContent = components.content,
                iv = new Buffer(components.iv, "hex"),
                salt = components.salt,
                hmacData = components.hmac;
            // Get the key
            var keyDerivationInfo = Encryption.generateDerivedKey(password, salt, components.rounds),
                hmacTool = Crypto.createHmac(config.HMAC_ALGORITHM, keyDerivationInfo.hmac);
            // Generate the hmac
            hmacTool.update(encryptedContent);
            hmacTool.update(components.iv);
            hmacTool.update(salt);
            var newHmaxHex = hmacTool.digest("hex");
            // Check hmac for tampering
            if (constantTimeCompare(hmacData, newHmaxHex) !== true) {
                throw new Error("Encrypted content has been tampered with");
            }
            // Decrypt
            var decryptTool = Crypto.createDecipheriv(config.ENC_ALGORITHM, keyDerivationInfo.key, iv),
                decryptedText = decryptTool.update(encryptedContent, "base64", "utf8");
            return decryptedText + decryptTool.final("utf8");
        },

        unpackEncryptedContent: function(encryptedContent) {
            var components = encryptedContent.split("$");
            // There will be 4 components for pre 0.15.0 archives, and 5 in newer archives. The 5th component
            // is the pbkdf2 round count, which is optional.
            if (components.length < 4 || components.length > 5) {
                throw new Error("Decryption error - unexpected number of encrypted components");
            }
            var pbkdf2Rounds = (components.length > 4) ? parseInt(components[4], 10) : config.PBKDF2_ROUND_DEFAULT;
            return {
                content: components[0],
                iv: components[1],
                salt: components[2],
                hmac: components[3],
                rounds: pbkdf2Rounds
            };
        }

    };

})(module);
