(function() {

    "use strict";

    var packageJSON = require(__dirname + "/../package.json"),
        path = require("path"),
        outputDir = path.resolve(__dirname + "/../tests/_archives"),
        outputFile = outputDir + "/test-archive-" + packageJSON.version + ".bcup",
        Buttercup = require(__dirname + "/../source/module.js"),
        createCredentials = Buttercup.createCredentials;

    console.log("Building archive...");

    // Archive
    var archive = new Buttercup.Archive(),
        mainGroup = archive.createGroup("test-group-main"),
        mainEntry = mainGroup.createEntry("test-entry-main");

    mainEntry.setProperty("username", "user123한@test.рф");
    mainEntry.setAttribute("passExpiry", "30");
    mainEntry.setProperty("password", "* পাসওয়ার্ড! ");
    mainEntry.setMeta("test-meta", "test-value 8");

    // Datasource
    console.log("Saving archive: " + outputFile);
    var datasource = new Buttercup.FileDatasource(outputFile);
    datasource.save(archive, createCredentials.fromPassword("this is a long password used for a test archive!"));

    console.log("Test archive completed for version: " + packageJSON.version);

})();
