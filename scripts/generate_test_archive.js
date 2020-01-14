const path = require("path");
require("@buttercup/app-env/native");
const { getSharedAppEnv } = require("@buttercup/app-env");
const { Archive, Credentials, Datasources, vendor } = require("../source/node/index.js");
const packageInfo = require("../package.json");

const { FileDatasource } = Datasources;
const { version } = packageInfo;

const outputDir = path.resolve(__dirname, "../test/resources/archives");
const outputFile = path.join(outputDir, `/test-archive-${version}.bcup`);

getSharedAppEnv().getProperty("crypto/v1/setDerivationRounds")(10);

console.log("Building archive...");

// Archive
const archive = new Archive();
const mainGroup = archive.createGroup("test-group-main");
const mainEntry = mainGroup.createEntry("test-entry-main");

mainEntry.setProperty("username", "user123한@test.рф");
mainEntry.setProperty("password", "* পাসওয়ার্ড! ");
mainEntry.setProperty("test-meta", "test-value 8");

// Datasource
console.log("Saving archive: " + outputFile);
const datasource = new FileDatasource(outputFile);
datasource.save(archive.getHistory(), Credentials.fromPassword("this is a long password used for a test archive!"));

console.log("Test archive completed for version: " + version);
