(function(module) {

    "use strict";

    var Model = require("__buttercup/classes/Model.js"),
        Signing = require("__buttercup/tools/signing.js"),
        Encryption = require("__buttercup/encryption/encrypt.js"),
        Decryption = require("__buttercup/encryption/decrypt.js");

    var SIGNING_KEY = Signing.getSignature() + "cred.";

    function signEncryptedContent(content) {
        return SIGNING_KEY + content;
    }

    function unsignEncryptedContent(content) {
        if (content.indexOf(SIGNING_KEY) !== 0) {
            throw new Error("Invalid credentials content (unknown signature)");
        }
        return content.substr(SIGNING_KEY.length);
    }

    var Credentials = function(data) {
        this.model = (data instanceof Model) ? data : new Model(data);
    };

    Credentials.prototype.setIdentity = function(username, password) {
        this.model
            .set("username", username)
            .set("password", password);
        return this;
    };

    Credentials.prototype.setType = function(type) {
        this.model.set("type", type);
        return this;
    };

    Credentials.prototype.toSecure = function(masterPassword) {
        if (typeof masterPassword !== "string") {
            throw new Error("Master password must be a string");
        }
        return signEncryptedContent(
            Encryption.encrypt(JSON.stringify(this.model.getData()), masterPassword)
        );
    };

    Credentials.fromSecureContent = function(content, password) {
        var content = Decryption.decrypt(unsignEncryptedContent(content), password);
        return new Credentials(JSON.parse(content));
    };

    module.exports = Credentials;

})(module);
