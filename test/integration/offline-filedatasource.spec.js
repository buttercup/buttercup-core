const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf").sync;
const { FileDatasource } = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");
const Archive = require("../../source/node/Archive.js");

const FILENAME = path.resolve(__dirname, "./offline.test.bcup");

describe("FileDatasource", function() {
    beforeEach(function() {
        const fds = new FileDatasource(FILENAME);
        const archive = new Archive();
        return fds.save(archive.getHistory(), Credentials.fromPassword("test")).then(() => {
            this.content = fs.readFileSync(FILENAME, "utf8");
            rimraf(FILENAME);
        });
    });

    it("supports cached content", function() {
        const fds = new FileDatasource(FILENAME);
        expect(fds.supportsRemoteBypass()).to.be.true;
    });

    it("loads cached content", function() {
        const fds = new FileDatasource(FILENAME);
        fds.setContent(this.content);
        return fds
            .load(Credentials.fromPassword("test"))
            .then(history => Archive.createFromHistory(history))
            .then(archive => {
                // yay!
            });
    });
});
