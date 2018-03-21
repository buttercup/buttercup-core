const path = require("path");
const fs = require("fs");
const { FileDatasource } = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");
const Archive = require("../../source/node/system/Archive.js");

const DIR = path.resolve(__dirname, "../resources/archives");
const PASSWORD = "this is a long password used for a test archive!";

describe("archives from a previous version", function() {
    const files = fs.readdirSync(DIR);
    files.forEach(function(filename) {
        const match = /test-archive-(\d+\.\d+\.\d+)\.bcup/.exec(filename);
        const version = match[1];
        describe(`version: ${version}`, function() {
            beforeEach(function() {
                this.fds = new FileDatasource(path.join(DIR, filename));
            });

            it("can be opened", function() {
                return this.fds
                    .load(Credentials.fromPassword(PASSWORD))
                    .then(history => Archive.createFromHistory(history))
                    .then(archive => {
                        const group = archive.findGroupsByTitle("test-group-main")[0];
                        expect(group).to.not.be.undefined;
                    });
            });
        });
    });
});
