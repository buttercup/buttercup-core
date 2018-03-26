const { TextDatasource } = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");
const ArchiveSource = require("../../../source/node/archiveManagement/ArchiveSource.js");
const Archive = require("../../../source/node/Archive.js");

const { DefaultColour, DefaultOrder, Status } = ArchiveSource;

const UUID_EXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function createArchiveAndCredentials() {
    this.archive = new Archive();
    this.archiveCredentials = Credentials.fromPassword("testing");
    const tds = new TextDatasource();
    return tds.save(this.archive.getHistory(), this.archiveCredentials).then(content => {
        this.sourceCredentials = new Credentials("text");
        this.sourceCredentials.setValue(
            "datasource",
            JSON.stringify({
                type: "text",
                content
            })
        );
    });
}

describe("ArchiveSource", function() {
    beforeEach(function() {
        return createArchiveAndCredentials
            .call(this)
            .then(() =>
                Promise.all([
                    this.sourceCredentials.toSecureString(this.archiveCredentials.password),
                    this.archiveCredentials.toSecureString(this.archiveCredentials.password)
                ])
            )
            .then(([encSourceCreds, encArchiveCreds]) => {
                this.sourceCredentials = encSourceCreds;
                this.archiveCredentials = encArchiveCreds;
            });
    });

    it("can be instantiated", function() {
        expect(() => {
            const source = new ArchiveSource("Test", this.sourceCredentials, this.archiveCredentials);
        }).to.not.throw();
    });

    it("sets the correct credentials", function() {
        const source = new ArchiveSource("Test", this.sourceCredentials, this.archiveCredentials);
        expect(source).to.have.property("_sourceCredentials", this.sourceCredentials);
        expect(source).to.have.property("_archiveCredentials", this.archiveCredentials);
    });

    it("sets the correct initial state", function() {
        const source = new ArchiveSource("Test", this.sourceCredentials, this.archiveCredentials);
        expect(source).to.have.property("status", Status.LOCKED);
        expect(source).to.have.property("order", DefaultOrder);
        expect(source).to.have.property("colour", DefaultColour);
        expect(source).to.have.property("name", "Test");
        expect(source)
            .to.have.property("id")
            .that.matches(UUID_EXP);
        expect(source).to.have.property("workspace").that.is.null;
    });

    it("supports setting the ID", function() {
        const id = "123e4567-e89b-12d3-a456-426655440000";
        const source = new ArchiveSource("Test", this.sourceCredentials, this.archiveCredentials, id);
        expect(source.id).to.equal(id);
    });

    describe("get:description", function() {
        beforeEach(function() {
            this.id = "123e4567-e89b-12d3-a456-426655440000";
            this.source = new ArchiveSource("Test", this.sourceCredentials, this.archiveCredentials, this.id);
        });

        it("contains the expected properties", function() {
            const description = this.source.description;
            expect(description).to.have.property("id", this.id);
            expect(description).to.have.property("name", "Test");
            expect(description).to.have.property("status", Status.LOCKED);
            expect(description).to.have.property("type", "");
            expect(description).to.have.property("colour", DefaultColour);
            expect(description).to.have.property("order", DefaultOrder);
        });
    });

    describe("set:colour", function() {
        beforeEach(function() {
            this.source = new ArchiveSource("Test", this.sourceCredentials, this.archiveCredentials);
        });

        it("can be set to hex colours", function() {
            this.source.colour = "#fff";
            expect(this.source.colour).to.equal("#fff");
            this.source.colour = "#a1b2e3";
            expect(this.source.colour).to.equal("#a1b2e3");
        });

        it("throws on invalid colour values", function() {
            expect(() => {
                this.source.colour = "rgba(255,255,255,1)";
            }).to.throw(/Invalid format/i);
            expect(() => {
                this.source.colour = "";
            }).to.throw(/Invalid format/i);
            expect(() => {
                this.source.colour = "#a";
            }).to.throw(/Invalid format/i);
            expect(() => {
                this.source.colour = false;
            }).to.throw(/Invalid format/i);
        });
    });

    describe("dehydrate", function() {
        beforeEach(function() {
            this.id = "123e4567-e89b-12d3-a456-426655440000";
            this.source = new ArchiveSource("Test", this.sourceCredentials, this.archiveCredentials, this.id);
            this.source.type = "dropbox";
        });

        it("dehydrates to a string", function() {
            return expect(this.source.dehydrate()).to.eventually.be.a("string");
        });

        it("contains the expected JSON form", function() {
            return this.source
                .dehydrate()
                .then(JSON.parse)
                .then(payload => {
                    expect(payload).to.have.property("id", this.id);
                    expect(payload).to.have.property("name", "Test");
                    expect(payload).to.have.property("status", Status.LOCKED);
                    expect(payload).to.have.property("type", "dropbox");
                    expect(payload).to.have.property("colour", DefaultColour);
                    expect(payload).to.have.property("order", DefaultOrder);
                    expect(payload)
                        .to.have.property("sourceCredentials")
                        .that.satisfies(Credentials.isSecureString);
                    expect(payload)
                        .to.have.property("archiveCredentials")
                        .that.satisfies(Credentials.isSecureString);
                });
        });

        it("encrypts credentials if unlocked", function() {
            return this.source
                .unlock("testing")
                .then(() => {
                    expect(this.source.status).to.equal(Status.UNLOCKED);
                    return this.source.dehydrate();
                })
                .then(JSON.parse)
                .then(payload => {
                    expect(payload)
                        .to.have.property("sourceCredentials")
                        .that.satisfies(Credentials.isSecureString);
                    expect(payload)
                        .to.have.property("archiveCredentials")
                        .that.satisfies(Credentials.isSecureString);
                });
        });
    });

    describe("lock", function() {
        beforeEach(function() {
            this.source = new ArchiveSource("Test", this.sourceCredentials, this.archiveCredentials);
            return this.source.unlock("testing");
        });

        it("locks the source", function() {
            return this.source.lock().then(() => {
                expect(this.source).to.have.property("status", Status.LOCKED);
                expect(this.source)
                    .to.have.property("_sourceCredentials")
                    .that.satisfies(Credentials.isSecureString);
                expect(this.source)
                    .to.have.property("_archiveCredentials")
                    .that.satisfies(Credentials.isSecureString);
            });
        });

        it("responds with the dehydrated payload", function() {
            return expect(this.source.lock()).to.eventually.match(/^\{/);
        });

        it("emits an event when locked", function() {
            sinon.spy(this.source, "emit");
            return this.source.lock().then(() => {
                expect(this.source.emit.calledWith("sourceLocked")).to.be.true;
                expect(this.source.emit.firstCall.args[1]).to.deep.equal(this.source.description);
            });
        });

        it("rejects if not unlocked", function() {
            return this.source.lock().then(() => {
                return expect(this.source.lock()).to.be.rejected.and.eventually.match(/invalid state/i);
            });
        });
    });

    describe("unlock", function() {
        beforeEach(function() {
            this.source = new ArchiveSource("Test", this.sourceCredentials, this.archiveCredentials);
        });

        it("unlocks the source", function() {
            return this.source.unlock("testing").then(() => {
                expect(this.source).to.have.property("status", Status.UNLOCKED);
                expect(this.source)
                    .to.have.property("_sourceCredentials")
                    .that.satisfies(Credentials.isCredentials);
                expect(this.source)
                    .to.have.property("_archiveCredentials")
                    .that.satisfies(Credentials.isCredentials);
            });
        });

        it("sets the type", function() {
            return this.source.unlock("testing").then(() => {
                expect(this.source).to.have.property("type", "text");
            });
        });

        it("emits an event when unlocked", function() {
            sinon.spy(this.source, "emit");
            return this.source.unlock("testing").then(() => {
                expect(this.source.emit.calledWith("sourceUnlocked")).to.be.true;
                expect(this.source.emit.firstCall.args[1]).to.deep.equal(this.source.description);
            });
        });

        it("rejects if not locked", function() {
            return this.source.unlock("testing").then(() => {
                return expect(this.source.unlock("testing")).to.be.rejected.and.eventually.match(/invalid state/i);
            });
        });

        // TBC:
        // it("can initialise remote archive", function() {
        //     return this.source.unlock("testing")
        //         .then(() => {
        //             this.source.workspace.primary.archive.createGroup("TEST$$$");
        //             return this.source.workspace.save();
        //         })
        //         .then(() => this.source.lock())
        //         .then(() => this.source.unlock("testing"))
        //         .then(() => {
        //             console.log("A", this.source.workspace.primary.archive.toObject());
        //             const group = this.source.workspace.primary.archive.findGroupsByTitle("TEST$$$")[0];
        //             expect(group).to.be.an.instanceof(Group);
        //         });
        // });
    });
});
