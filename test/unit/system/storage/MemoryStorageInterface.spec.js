const MemoryStorageInterface = require("../../../../source/node/system/storage/MemoryStorageInterface.js");

describe("MemoryStorageInterface", function() {
    beforeEach(function() {
        this.storageInterface = new MemoryStorageInterface();
    });

    describe("getAllKeys", function() {
        beforeEach(function() {
            return Promise.all([
                this.storageInterface.setValue("value1", "value1"),
                this.storageInterface.setValue("value2", "value2")
            ]);
        });

        it("returns all keys", function() {
            return this.storageInterface.getAllKeys().then(keys => {
                expect(keys).to.eql(["value1", "value2"]);
            });
        });
    });

    describe("getValue", function() {
        beforeEach(function() {
            return Promise.all([this.storageInterface.setValue("key1", "value1")]);
        });

        it("gets the correct value", function() {
            return this.storageInterface.getValue("key1").then(value => {
                expect(value).to.equal("value1");
            });
        });

        it("returns null if no key exists", function() {
            return this.storageInterface.getValue("key2").then(value => {
                expect(value).to.be.null;
            });
        });
    });

    describe("removeKey", function() {
        beforeEach(function() {
            return Promise.all([this.storageInterface.setValue("key1", "value1")]);
        });

        it("removes the key", function() {
            return this.storageInterface
                .removeKey("key1")
                .then(() => this.storageInterface.getValue("key1"))
                .then(value => {
                    expect(value).to.be.null;
                });
        });
    });

    describe("setValue", function() {
        beforeEach(function() {
            return Promise.all([this.storageInterface.setValue("key1", "value1")]);
        });

        it("removes the key", function() {
            return this.storageInterface.getValue("key1").then(value => {
                expect(value).to.equal("value1");
            });
        });
    });
});
