(function(module) {

    "use strict";

    var WebDAVDatasource = require("./WebDAVDatasource.js");

    /**
     * Datasource for OwnCloud archives
     * @class OwnCloudDatasource
     * @augments WebDAVDatasource
     */
    class OwnCloudDatasource extends WebDAVDatasource {

        /**
         * Datasource for Owncloud connections
         * @param {String} owncloudURL The URL to the owncloud instance, without "remote.php/webdav" etc.
         * @param {String} resourcePath The file path
         * @param {String} username The username for owncloud
         * @param {String} password The password for owncloud
         */
        constructor(owncloudURL, resourcePath, username, password) {
            var urlLen = owncloudURL.length;
            owncloudURL = (owncloudURL[urlLen - 1] === "/") ? owncloudURL : owncloudURL + "/";
            owncloudURL += "remote.php/webdav/";
            super(owncloudURL, resourcePath, username, password);
        }

    }

    module.exports = OwnCloudDatasource;

})(module);
