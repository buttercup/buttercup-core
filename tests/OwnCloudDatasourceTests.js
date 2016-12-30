"use strict";

var lib = require("../source/module.js");


var OwnCloudDatasource = lib.OwnCloudDatasource;

module.exports = {

    setUp: function(cb) {
        this.ds = new OwnCloudDatasource("http://test.com", "/test.bcup", "user", "pass");
        cb();
    },

    toObject: {

        outputsCorrectData: function(test) {
            var obj = this.ds.toObject();
            test.strictEqual(obj.type, "owncloud", "Type should be correct");
            test.strictEqual(obj.endpoint, "http://test.com", "Endpoint URL should be correct");
            test.strictEqual(obj.path, "/test.bcup", "Path should be correct");
            test.done();
        }

    }

};
