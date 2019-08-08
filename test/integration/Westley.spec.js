const Westley = require("../../source/node/Westley.js");
const Inigo = require("../../source/node/Inigo.js");
const { getUUIDGenerator } = require("../../source/node/tools/uuid.js");

const { Command } = Inigo;

function generateUUID() {
    return getUUIDGenerator()();
}

describe("Westley", function() {
    beforeEach(function() {
        this.westley = new Westley();
    });

    describe("execute", function() {
        describe("aid", function() {
            it("sets the archive ID", function() {
                const id = generateUUID();
                this.westley.execute(
                    Inigo.create(Command.ArchiveID)
                        .addArgument(id)
                        .generateCommand()
                );
                expect(this.westley.dataset).to.have.property("archiveID", id);
            });
        });

        describe("cgr", function() {
            it("creates a group", function() {
                const id = generateUUID();
                this.westley.execute(
                    Inigo.create(Command.CreateGroup)
                        .addArgument("0")
                        .addArgument(id)
                        .generateCommand()
                );
                expect(this.westley.dataset.groups[0]).to.have.property("id", id);
            });
        });
    });
});
