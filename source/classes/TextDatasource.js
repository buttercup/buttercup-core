(function(module) {

    "use strict";

    const iocane = require("iocane").crypto;

    var Archive = require("./Archive.js"),
        signing = require("../tools/signing.js"),
        encoding = require("../tools/encoding.js");

    var TextDatasource = function(content) {
        this._content = content;
    };

    TextDatasource.prototype.load = function(password) {
        return Promise.resolve(this._content).then(function(data) {
            if (!signing.hasValidSignature(data)) {
                return Promise.reject("No valid signature in archive");
            }
            return signing.stripSignature(data);
        }).then(function(encryptedData) {
            return iocane.decryptWithPassword(encryptedData, password);
        }).then(function(decrypted) {
            if (decrypted && decrypted.length > 0) {
                var decompressed = encoding.decompress(decrypted);
                if (decompressed) {
                    return decompressed.split("\n");
                }
            }
            return Promise.reject("Decryption failed");
        }).then(function(history) {
            var archive = new Archive(),
                westley = archive._getWestley();
            westley.clear();
            history.forEach(westley.execute.bind(westley));
            return archive;
        });
    };

    TextDatasource.prototype.save = function(archive, password) {
        var history = archive._getWestley().getHistory().join("\n"),
            compressed = encoding.compress(history);
        return iocane.encryptWithPassword(compressed, password)
            .then(signing.sign);
    };

    module.exports = TextDatasource;

})(module);
