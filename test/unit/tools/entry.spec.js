const Archive = require("../../../source/node/Archive.js");
const { createFieldDescriptor, getValidProperties } = require("../../../source/node/tools/entry.js");

describe("createFieldDescriptor", function() {
    beforeEach(function() {
        const archive = new Archive();
        this.entry = archive.createGroup("Test").createEntry("Test");
        this.entry.setProperty("username", "user");
        this.entry.setProperty("password", "pass");
        this.descriptor = createFieldDescriptor(this.entry, "Title", "property", "title");
    });

    it("creates a descriptor with the correct properties", function() {
        expect(this.descriptor).to.have.property("title", "Title");
        expect(this.descriptor).to.have.property("field", "property");
        expect(this.descriptor).to.have.property("property", "title");
        expect(this.descriptor).to.have.property("value", "Test");
    });

    it("creates a descriptor with extended properties", function() {
        expect(this.descriptor).to.have.property("secret", false);
        expect(this.descriptor).to.have.property("multiline", false);
        expect(this.descriptor).to.have.property("formatting", false);
    });
});

describe("getValidProperties", function() {
    it("returns the correct values", function() {
        const props = getValidProperties();
        expect(props).to.contain("title");
        expect(props).to.contain("username");
        expect(props).to.contain("password");
    });
});
