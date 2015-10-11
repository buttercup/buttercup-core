(function() {

	"use strict";

	var Buttercup = require(__dirname + "/module.js"),
		Dataset = require(__dirname + "/classes/Dataset.js"),
		VaultGroup = require(__dirname + "/classes/VaultGroup.js"),
		FileDatasource = require(__dirname + "/classes/FileDatasource.js");

	var datasource = new FileDatasource("/Users/pez/temp.bcp");

	var dataset = new Dataset();
	dataset._title = "Perry's archive";

	var mainGroup = new VaultGroup({ title: "Main group" }),
		subGroup = new VaultGroup({ title: "Sub group" });
	mainGroup.addChildGroups(subGroup);
	dataset.addGroup(mainGroup);

	dataset
		.saveToDatasource(datasource, "encryption is amazing...")
		.then(function() {
			Dataset.loadFromDatasource(datasource, "encryption is amazing...")
				.then(function(datasource2) {
					console.log("D2", JSON.stringify(datasource2.toRaw()));
				});
		});

})();