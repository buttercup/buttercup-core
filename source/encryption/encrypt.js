(function(module) {

    "use strict";

    var Crypto = require("crypto"),
        pbkdf2 = require("pbkdf2"),
        config = require("__buttercup/encryption/encryptionConfig.js");

    var encoding = require("__buttercup/tools/encoding.js");

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var lib = module.exports = {

        encrypt: function(text, password) {
            var keyDerivationInfo = lib.generateDerivedKey(password),
                iv = lib.generateIV(),
                ivHex = iv.toString("hex");
            var encryptTool = Crypto.createCipheriv(config.ENC_ALGORITHM, keyDerivationInfo.key, iv),
                hmacTool = Crypto.createHmac(config.HMAC_ALGORITHM, keyDerivationInfo.hmac),
                saltHex = keyDerivationInfo.salt.toString("hex"),
                pbkdf2Rounds = keyDerivationInfo.rounds;
            // Perform encryption
            var encryptedContent = encryptTool.update(text, "utf8", "base64");
            encryptedContent += encryptTool.final("base64");
            // Generate hmac
            hmacTool.update(encryptedContent);
            hmacTool.update(ivHex);
            hmacTool.update(saltHex);
            var hmacHex = hmacTool.digest("hex");
            // Return packed content
            return lib.packEncryptedContent(
                encryptedContent,
                ivHex,
                saltHex,
                hmacHex,
                pbkdf2Rounds
            );
        },

        generateDerivedKey: function(password, usedSalt, rounds) {
            rounds = rounds || getRandomInRange(
                config.DERIVED_KEY_ITERATIONS_MIN,
                config.DERIVED_KEY_ITERATIONS_MAX
            );
            var salt = usedSalt || lib.generateSalt(config.SALT_LENGTH),
                derivedKey = pbkdf2.pbkdf2Sync(
                    password,
                    salt,
                    rounds,
                    config.PASSWORD_KEY_SIZE + config.HMAC_KEY_SIZE, // size
                    config.DERIVED_KEY_ALGORITHM
                );
            // Get key and split it into 2 buffers: 1 for the password, 1 for the HMAC key
            var derivedKeyHex = derivedKey.toString("hex"),
                dkhLength = derivedKeyHex.length,
                keyBuffer = new Buffer(derivedKeyHex.substr(0, dkhLength / 2), "hex"),
                hmacBuffer = new Buffer(derivedKeyHex.substr(dkhLength / 2, dkhLength / 2), "hex");
            return {
                salt: salt,
                key: keyBuffer,
                hmac: hmacBuffer,
                rounds: rounds
            };
        },

        generateIV: function() {
            return new Buffer(Crypto.randomBytes(16));
        },

        generateSalt: function(length) {
            var genLen = length % 2 ? length + 1 : length;
            return Crypto.randomBytes(genLen / 2).toString("hex").substring(0, length);
        },

        packEncryptedContent: function(encryptedContent, iv, salt, hmacFinal, rounds) {
            return [encryptedContent, iv, salt, hmacFinal, rounds].join("$");
        }

    };

})(module);
