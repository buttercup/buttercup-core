const path = require("path");
const { Credentials, FileDatasource, Vault, getSharedAppEnv, init } = require("../dist/index.node.js");
const packageInfo = require("../package.json");

const PASSWORD = "this is a long password used for a test archive!";
const { version } = packageInfo;

const outputDir = path.resolve(__dirname, "../test/resources/vaults");
const outputFile = path.join(outputDir, `/test-archive-${version}.bcup`);

init();
getSharedAppEnv().getProperty("crypto/v1/setDerivationRounds")(10);

async function build() {
    console.log("Building vault...");

    const vault = new Vault();
    const mainGroup = vault.createGroup("test-group-main");
    const mainEntry = mainGroup.createEntry("test-entry-main");

    mainEntry.setProperty("username", "user123한@test.рф");
    mainEntry.setProperty("password", "* পাসওয়ার্ড! ");
    mainEntry.setProperty("test-meta", "test-value 8");

    // Datasource
    console.log("Saving vault: " + outputFile);
    const datasource = new FileDatasource(Credentials.fromDatasource({
        path: outputFile
    }, PASSWORD));
    await datasource.save(vault.format.history, Credentials.fromPassword(PASSWORD));

    console.log("Test vault construction completed for version: " + version);
}

(async function run() {
    try {
        await build();
    } catch (err) {
        console.error(err);
        process.exit(2);
    }
})();
