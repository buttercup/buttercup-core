const path = require("path");
const { Credentials, FileDatasource, Vault, VaultFormatB, getSharedAppEnv, init } = require("../dist/index.node.js");
const packageInfo = require("../package.json");

const PASSWORD = "this is a long password used for a test vault!";
const { version } = packageInfo;

const outputDir = path.resolve(__dirname, "../test/resources/vaults/format-b");
const outputFile = path.join(outputDir, `/test-vault-${version}.bcup`);

init();
getSharedAppEnv().getProperty("crypto/v1/setDerivationRounds")(10);

async function build() {
    console.log("Building vault...");

    const vault = new Vault(VaultFormatB);
    const mainGroup = vault.createGroup("test-group-main");
    const mainEntry = mainGroup.createEntry("test-entry-main");

    mainEntry.setProperty("username", "user123한@test.рф");
    mainEntry.setProperty("password", "* পাসওয়ার্ড! ");
    mainEntry.setProperty("test-meta", "test-value 8");
    mainEntry.setAttribute("ატრიბუტი", "ความคุ้มค่า");

    mainGroup.setAttribute("MY ATTR", "ტესტი");
    mainGroup.setAttribute("ატრიბუტი", "ความคุ้มค่า");

    vault.setAttribute("ატრიბუტი", "ความคุ้มค่า");

    // Datasource
    console.log("Saving vault: " + outputFile);
    const datasource = new FileDatasource(Credentials.fromDatasource({
        path: outputFile
    }, PASSWORD));
    await datasource.save(vault.format.history, Credentials.fromPassword(PASSWORD));

    console.log(`Test vault construction completed for version: ${version} (format: B)`);
}

(async function run() {
    try {
        await build();
    } catch (err) {
        console.error(err);
        process.exit(2);
    }
})();
