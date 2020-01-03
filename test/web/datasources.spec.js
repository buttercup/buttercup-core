const { Archive, Credentials, Datasources } = require("../../source/web/index.js");
const { TextDatasource } = Datasources;

describe("datasources", function() {
    it("can be saved", function() {
        const archive = Archive.createWithDefaults();
        const tds = new TextDatasource();
        return tds.save(archive.getHistory(), Credentials.fromPassword("test")).then(str => {
            expect(str).to.be.a("string");
        });
    });
});
