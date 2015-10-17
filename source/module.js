(function(module) {

	"use strict";

	GLOBAL.root = __dirname;

	module.exports = {

		Archive: require(GLOBAL.root + "/classes/ButtercupArchive.js"),
		Workspace: require(GLOBAL.root + "/classes/Workspace.js"),

		FileDatasource: require(GLOBAL.root + "/classes/FileDatasource.js"),
		OwnCloudDatasource: require(GLOBAL.root + "/classes/OwnCloudDatasource.js"),
		WebDAVDatasource: require(GLOBAL.root + "/classes/WebDAVDatasource.js"),

		// Encryption info from: http://lollyrock.com/articles/nodejs-encryption/
		Encryption: require(GLOBAL.root + "/encryption/encrypt.js"),
		Decryption: require(GLOBAL.root + "/encryption/decrypt.js")

	};

})(module);
