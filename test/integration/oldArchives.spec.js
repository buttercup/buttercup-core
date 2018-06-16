const fs = require("fs");
const path = require("path");
const { Archive, Datasources, Credentials } = require("../../source/node/index.js");

const { FileDatasource } = Datasources;

const ARCHIVES_DIR = path.resolve(__dirname, "../resources/archives");
const PASSWORD = "this is a long password used for a test archive!";

describe("reading old archives", function() {
    fs.readdirSync(ARCHIVES_DIR).forEach(filename => {
        const [, version] = /test-archive-(\d+\.\d+\.\d+(\-[0-9a-zA-Z.]+)?)\.bcup/.exec(filename);
        describe(`v${version}`, function() {
            const readArchive = () => {
                const fds = new FileDatasource(path.join(ARCHIVES_DIR, filename));
                return fds.load(Credentials.fromPassword(PASSWORD)).then(Archive.createFromHistory);
            };

            it("can be opened", function() {
                return readArchive().then(archive => {
                    expect(archive).to.be.an.instanceof(Archive);
                });
            });
        });
    });
});
