var lib = require("__buttercup/module.js"),
	Credentials = lib.Credentials,
    Signing = lib.tools.signing;

module.exports = {

	setUp: function(cb) {
		this.credentials = new Credentials();
		(cb)();
	},

    createFromSecureContent: {

        testEncryptsAndDecrypts: function(test) {
            this.credentials.setIdentity("user", "pass");
            this.credentials.convertToSecureContent("monkey")
                .then((secureContent) => {
                    test.ok(secureContent.indexOf("user") < 0);
                    test.ok(secureContent.indexOf("pass") < 0);
                    return Credentials.createFromSecureContent(secureContent, "monkey").then((newCred) => {
                        test.deepEqual(newCred.model.getData(), this.credentials.model.getData(),
                            "Newly created credentials should contain the same content");
                        test.done();
                    });
                })
                .catch(function(err) {
                    console.error(err);
                });
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
            var signature = Signing.getSignature() + "cred.";
            this.credentials.convertToSecureContent("test")
                .then(function(secure) {
                    test.strictEqual(secure.indexOf(signature), 0, "Signature should be the first piece of content");
                    test.done();
                })
                .catch(function(err) {
                    console.error(err);
                });
        },

        testEncryptsContent: function(test) {
            this.credentials.setIdentity("user", "pass");
            this.credentials.convertToSecureContent("passw0rd")
                .then(function(secure) {
                    test.ok(secure.indexOf("user") < 0, "Content should be encrypted");
                    test.done();
                })
                .catch(function(err) {
                    console.error(err);
                });
        }

    }

};
