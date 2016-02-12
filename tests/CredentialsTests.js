var lib = require("__buttercup/module.js"),
	Credentials = lib.Credentials,
    Signing = lib.tools.signing;

module.exports = {

	setUp: function(cb) {
		this.credentials = new Credentials();
		(cb)();
	},

    fromSecureContent: {

        testEncryptsAndDecrypts: function(test) {
            this.credentials.setIdentity("user", "pass");
            var secureContent = this.credentials.toSecure("monkey");
            test.ok(secureContent.indexOf("user") < 0);
            test.ok(secureContent.indexOf("pass") < 0);
            var newCred = Credentials.fromSecureContent(secureContent, "monkey");
            test.deepEqual(newCred.model.getData(), this.credentials.model.getData(),
                "Newly created credentials should contain the same content");
            test.done();
        }

    },

    settingData: {

        testSetsData: function(test) {
            this.credentials
                .setIdentity("user", "pass")
                .setType("webdav");
            var data = this.credentials.model.getData();
            test.strictEqual(data.username, "user", "Username should be set");
            test.strictEqual(data.password, "pass", "Password should be set");
            test.strictEqual(data.type, "webdav", "Type should be set");
            test.done();
        }

    },

    toSecure: {

        testContainsSignature: function(test) {
            var signature = Signing.getSignature() + "cred.",
                secure = this.credentials.toSecure("test");
            test.strictEqual(secure.indexOf(signature), 0, "Signature should be the first piece of content");
            test.done();
        },

        testEncryptsContent: function(test) {
            this.credentials.setIdentity("user", "pass");
            var secure = this.credentials.toSecure("passw0rd");
            test.ok(secure.indexOf("user") < 0, "Content should be encrypted");
            test.done();
        }

    }

};
