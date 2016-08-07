"use strict";

var datasourceTools = module.exports = {

    /**
     * Extract the datasource properties from an exported string
     * @param {string} dsString The exported string from `toString()`
     * @returns {Object} All properties in an object
     */
    extractDSStrProps: function(dsString) {
        let items = dsString.split(","),
            obj = {};
        items.forEach(function(item) {
            let parts = item.split("=");
            obj[parts[0]] = parts[1];
        });
        return obj;
    },

    stringToDatasource: function(str, credentials) {
        let properties = datasourceTools.extractDSStrProps(str),
            datasourceType = properties.ds,
            identity;
        if (credentials) {
            identity = credentials.getIdentity();
        }
        switch(datasourceType) {
            case "text": {
                let TextDatasource = require("../classes/TextDatasource");
                return new TextDatasource("");
            }

            case "file": {
                let FileDatasource = require("../classes/FileDatasource");
                return new FileDatasource(properties.path);
            }

            case "webdav": {
                let WebDAVDatasource = require("../classes/WebDAVDatasource");
                return new WebDAVDatasource(
                    properties.endpoint,
                    properties.path,
                    identity.username,
                    identity.password
                );
            }

            case "owncloud": {
                let OwnCloudDatasource = require("../classes/OwnCloudDatasource");
                return new OwnCloudDatasource(
                    properties.endpoint,
                    properties.path,
                    identity.username,
                    identity.password
                );
            }

            default:
                throw new Error(`Unknown datasource type: ${datasourceType}`);
        }
    }

};
