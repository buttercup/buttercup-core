const path = require("path");
const Buttercup = require("../source/node/index.js");
const packageInfo = require("../package.json");

const createCredentials = Buttercup.createCredentials;
const { version } = packageInfo;

const outputDir = path.resolve(__dirname, "../tests/_archives");
const outputFile = path.join(outputDir, `/test-archive-${version}.bcup`);

console.log("Building archive...");

// Archive
const archive = new Buttercup.Archive();
const mainGroup = archive.createGroup("test-group-main");
const mainEntry = mainGroup.createEntry("test-entry-main");

mainEntry.setProperty("username", "user123한@test.рф");
mainEntry.setProperty("password", "* পাসওয়ার্ড! ");
mainEntry.setMeta("test-meta", "test-value 8");

// Datasource
console.log("Saving archive: " + outputFile);
const datasource = new Buttercup.FileDatasource(outputFile);
datasource.save(archive, createCredentials.fromPassword("this is a long password used for a test archive!"));

console.log("Test archive completed for version: " + version);
