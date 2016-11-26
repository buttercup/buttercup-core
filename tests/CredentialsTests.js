var lib = require("../source/module.js");

var Credentials = lib.Credentials,
    Signing = lib.tools.signing;

module.exports = {

    setUp: function(cb) {
        this.credentials = new Credentials();
        (cb)();
    },

    createFromSecureContent: {

        encryptsAndDecrypts: function(test) {
            this.credentials.username = "user";
            this.credentials.password = "pass";
            this.credentials.convertToSecureContent("monkey")
                .then((secureContent) => {
                    test.ok(secureContent.indexOf("user") < 0);
                    test.ok(secureContent.indexOf("pass") < 0);
                    return Credentials
                        .createFromSecureContent(secureContent, "monkey")
                        .then((newCred) => {
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

    gettingData: {

        getsData: function(test) {
            var credentials = new Credentials({
                password: "my pass",
                keyfile: "datafile.bin"
            });
            test.strictEqual(credentials.password, "my pass", "Password should be correct");
            test.strictEqual(credentials.keyFile, "datafile.bin", "Key file should be correct");
            test.done();
        },

        getsUndefined: function(test) {
            var credentials = new Credentials();
            test.strictEqual(credentials.password, undefined, "Password should be undefined");
            test.strictEqual(credentials.keyFile, undefined, "Key file should be undefined");
            test.done();
        }

    },

    getMeta: {

        getsValues: function(test) {
            var credentials = new Credentials();
            credentials.model.set("meta.test", 123);
            test.strictEqual(credentials.getMeta("test"), 123, "Should return correct value");
            test.done();
        },

        getsNestedValues: function(test) {
            var credentials = new Credentials();
            credentials.model.set("meta.test.secondary", 123);
            test.strictEqual(credentials.getMeta("test.secondary"), 123, "Should return correct value");
            test.done();
        },

        returnsDefault: function(test) {
            var credentials = new Credentials();
            test.strictEqual(credentials.getMeta("test", false), false, "Should return default value");
            test.done();
        }

    },

    setMeta: {

        setsValues: function(test) {
            var credentials = new Credentials();
            credentials.setMeta("some-meta", 19.5);
            test.strictEqual(credentials.model.get("meta.some-meta"), 19.5, "Should have set correct value");
            test.done();
        },

        setsNestedValues: function(test) {
            var credentials = new Credentials();
            credentials.setMeta("crazy.some-meta", 0);
            test.strictEqual(credentials.model.get("meta.crazy.some-meta"), 0, "Should have set correct value");
            test.done();
        }

    },

    settingData: {

        setsData: function(test) {
            this.credentials.username = "user";
            this.credentials.password = "pass";
            this.credentials.keyFile = "/home/user/example.dat";
            this.credentials.type = "webdav";
            var data = this.credentials.model.getData();
            test.strictEqual(data.username, "user", "Username should be set");
            test.strictEqual(data.password, "pass", "Password should be set");
            test.strictEqual(data.type, "webdav", "Type should be set");
            test.strictEqual(data.keyfile, "/home/user/example.dat", "Key file should be set");
            test.done();
        }

    },

    toSecure: {

        containsSignature: function(test) {
            var signature = Signing.getSignature() + "cred.";
            this.credentials
                .convertToSecureContent("test")
                .then(function(secure) {
                    test.strictEqual(secure.indexOf(signature), 0, "Signature should be the first piece of content");
                    test.done();
                })
                .catch(function(err) {
                    console.error(err);
                });
        },

        encryptsContent: function(test) {
            this.credentials.username = "user";
            this.credentials.password = "pass";
            this.credentials
                .convertToSecureContent("passw0rd")
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
