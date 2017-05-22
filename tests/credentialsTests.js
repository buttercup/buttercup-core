"use strict";

var lib = require("../source/module.js");

var createCredentials = lib.createCredentials;

module.exports = {

    fromInsecureString: {

        createsCorrectCredentials: function(test) {
            const str = JSON.stringify({
                type: "testing",
                data: {
                    username: "person",
                    password: "secret"
                }
            });
            const creds = createCredentials.fromInsecureString(str);
            test.strictEqual(creds.username, "person");
            test.strictEqual(creds.password, "secret");
            test.strictEqual(creds.type, "testing");
            test.done();
        }

    },

    fromSecureString: {

        encryptsAndDecrypts: function(test) {
            var creds = createCredentials({ username: "user", password: "pass" });
            creds.toSecureString("monkey")
                .then((secureContent) => {
                    test.ok(secureContent.indexOf("user") < 0);
                    test.ok(secureContent.indexOf("pass") < 0);
                    return createCredentials
                        .fromSecureString(secureContent, "monkey")
                        .then(newCred => {
                            test.strictEqual(newCred.username, "user", "Username should match");
                            test.strictEqual(newCred.password, "pass", "Password should match");
                            test.done();
                        });
                })
                .catch(function(err) {
                    console.error(err);
                });
        }

    },

    getters: {

        getsUsernameAndPassword: function(test) {
            var creds = createCredentials({ username: "user", password: "pass" });
            test.strictEqual(creds.username, "user", "Username should be correct");
            test.strictEqual(creds.password, "pass", "Password should be correct");
            test.done();
        },

        getsType: function(test) {
            var creds = createCredentials("myType");
            test.strictEqual(creds.type, "myType", "Should get the correct type");
            test.done();
        },

        getsDefaultType: function(test) {
            var creds = createCredentials();
            test.strictEqual(creds.type, "", "Should get an empty type");
            test.done();
        }

    },

    getValue: {

        getsUsernameAndPassword: function(test) {
            var creds = createCredentials({ username: "user", password: "pass" });
            test.strictEqual(creds.getValue("username"), "user", "Username should be correct");
            test.strictEqual(creds.getValue("password"), "pass", "Password should be correct");
            test.done();
        },

        returnsUndefinedForNonExisting: function(test) {
            var creds = createCredentials();
            test.strictEqual(creds.getValue("username"), undefined, "Username should be undefined");
            test.strictEqual(creds.getValue("custom"), undefined, "Custom value should be undefined");
            test.done();
        }

    },

    getValueOrFail: {

        getsValues: function(test) {
            var creds = createCredentials({ value1: "abc", value2: false });
            test.strictEqual(creds.getValue("value1"), "abc", "String value should be correct");
            test.strictEqual(creds.getValue("value2"), false, "Boolean value should be correct");
            test.done();
        },

        throwsIfValueIsNotSet: function(test) {
            var creds = createCredentials();
            test.throws(function() {
                creds.getValueOrFail("username");
            }, /failed.+username/i, "Should fail with error mentioning missing property value");
            test.done();
        }

    },

    setValue: {

        setsNewValues: function(test) {
            var creds = createCredentials();
            test.strictEqual(creds.getValue("username"), undefined, "Username should be undefined");
            creds.setValue("username", "newUser");
            test.strictEqual(creds.getValue("username"), "newUser", "Username should be set");
            test.done();
        },

        overridesExisting: function(test) {
            var creds = createCredentials({ username: "user" });
            creds.setValue("username", "user@email.com");
            test.strictEqual(creds.getValue("username"), "user@email.com", "Username should be set");
            test.done();
        }

    },

    toInsecureString: {

        writesContentToString: function(test) {
            const creds = createCredentials({ username: "user@site.org", password: "passw0rd" });
            const str = creds.toInsecureString();
            test.ok(str.indexOf('"type":""') >= 0, "Empty type should be present");
            test.ok(str.indexOf("user@site.org") >= 0, "Username should be present");
            test.ok(str.indexOf("passw0rd") >= 0, "Password should be present");
            test.done();
        }

    },

    toSecureString: {

        outputsAStringNotContainingCredentials: function(test) {
            var creds = createCredentials({ username: "user@site.org", password: "password" });
            creds.toSecureString("pass").then(function(encrypted) {
                test.ok(encrypted.indexOf("password") < 0, "Password should not appear in encrypted text");
                test.ok(encrypted.length > 0, "Length should be greater than 0");
                test.done();
            });
        }

    }

};
