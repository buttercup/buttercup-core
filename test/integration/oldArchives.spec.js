const fs = require("fs");
const path = require("path");
const { Credentials, FileDatasource, Vault } = require("../../source/index.node.js");

const VAULTS_DIR = path.resolve(__dirname, "../resources/vaults");
const PASSWORD = "this is a long password used for a test archive!";

describe("reading old vaults", function() {
    fs.readdirSync(VAULTS_DIR).forEach(filename => {
        const [, version] = /test-archive-(\d+\.\d+\.\d+(\-[0-9a-zA-Z.]+)?)\.bcup/.exec(filename);
        describe(`v${version}`, function() {
            const readVault = () => {
                const creds = Credentials.fromDatasource(
                    {
                        path: path.join(VAULTS_DIR, filename)
                    },
                    PASSWORD
                );
                const fds = new FileDatasource(creds);
                return fds.load(Credentials.fromPassword(PASSWORD)).then(Vault.createFromHistory);
            };

            it("can be opened", function() {
                return readVault().then(archive => {
                    expect(archive).to.be.an.instanceof(Vault);
                });
            });
        });
    });
});
