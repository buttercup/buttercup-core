(function() {

	"use strict";

	var Buttercup = require(__dirname + "/module.js"),
		Dataset = require(__dirname + "/classes/Dataset.js"),
		FileDatasource = require(__dirname + "/classes/FileDatasource.js");

	var datasource = new FileDatasource("/Users/pez/temp.bcp");

	var dataset = new Dataset();
	dataset._title = "Perry's archive";
	dataset.saveToDatasource(datasource, "encryption is amazing...");

	var dataset2 = Dataset.loadFromDatasource(datasource, "encryption is amazing...");


})();