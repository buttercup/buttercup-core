"use strict";

const fetch = require("node-fetch");
const archiveTools = require("../tools/myButtercup/archive");

module.exports = function buildAdapter(archiveID, accessToken) {
    return {
        getArchiveData: function getArchiveData() {
            return archiveTools.getArchiveData(accessToken, archiveID).then(function(data) {
                return data.archive;
            });
        },

        saveArchiveData: function saveArchiveData(encryptedData) {
            return archiveTools.setArchiveData(accessToken, archiveID, encryptedData);
        }
    };
};
