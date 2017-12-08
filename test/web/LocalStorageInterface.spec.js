const LocalStorageInterface = require("../../source/web/LocalStorageInterface.js");

describe("LocalStorageInterface", function() {
    beforeEach(function() {
        this.localStorageInterface = new LocalStorageInterface();
        return this.localStorageInterface
            .getAllKeys()
            .then(keys => Promise.all(keys.map(key => this.localStorageInterface.removeKey(key))));
    });

    describe("getAllKeys", function() {
        it("gets all the keys", function() {
            window.localStorage.setItem("item1", "abc");
            window.localStorage.setItem("z z z", "...");
            return Promise.resolve()
                .then(() => this.localStorageInterface.getAllKeys())
                .then(keys => {
                    expect(keys).to.have.lengthOf(2);
                    expect(keys).to.contain("item1");
                    expect(keys).to.contain("z z z");
                });
        });
    });

    describe("getValue", function() {
        it("gets the correct value", function() {
            window.localStorage.setItem("my item", "my value");
            return this.localStorageInterface.getValue("my item").then(value => {
                expect(value).to.equal("my value");
            });
        });

        it("returns null if no item exists for the provided key", function() {
            return this.localStorageInterface.getValue("noitem").then(value => {
                expect(value).to.equal(null);
            });
        });
    });

    describe("removeKey", function() {
        it("removes items", function() {
            window.localStorage.setItem("my item", "my value");
            return this.localStorageInterface.removeKey("my item").then(() => {
                expect(window.localStorage.getItem("my item")).to.equal(null);
            });
        });

        it("does not throw if item doesn't exist", function() {
            const removal = this.localStorageInterface.removeKey("my item");
            return expect(removal).to.eventually.resolve;
        });
    });

    describe("setValue", function() {
        it("sets a new value", function() {
            return this.localStorageInterface.setValue("some-thing", "somevalue").then(() => {
                expect(window.localStorage.getItem("some-thing")).to.equal("somevalue");
            });
        });

        it("overwrites old values", function() {
            window.localStorage.setItem("myKey", "1");
            return this.localStorageInterface.setValue("myKey", "2").then(() => {
                expect(window.localStorage.getItem("myKey")).to.equal("2");
            });
        });
    });
});
