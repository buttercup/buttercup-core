const describeDataset = require("../../source/node/Descriptor.js");
const Archive = require("../../source/node/Archive.js");
const { decodeStringValue, isEncoded } = require("../../source/node/tools/encoding.js");

function decodeHistory(lines) {
    return lines.map(line => {
        return line
            .split(" ")
            .map(val => (isEncoded(val) ? decodeStringValue(val) : val))
            .join(" ");
    });
}

describe("Descriptor", function() {
    beforeEach(function() {
        this.archive = new Archive();
        this.group = this.archive.createGroup("main");
        this.entry = this.group.createEntry("my entry");
        this.entry.setProperty("misc", "!@#$%^");
        this.entry.setAttribute("myAttr", "myValue");
        this.dataset = this.archive.toObject();
    });

    it("outputs an array", function() {
        const output = describeDataset(this.dataset);
        expect(output).to.be.an("array");
    });

    it("outputs format", function() {
        const output = decodeHistory(describeDataset(this.dataset));
        const formatLine = output.find(line => line.indexOf("fmt buttercup/a") >= 0);
        expect(formatLine).to.be.a("string");
    });

    it("outputs archive id", function() {
        const output = decodeHistory(describeDataset(this.dataset));
        expect(output.find(line => line.indexOf(`aid ${this.archive.id}`) >= 0)).to.be.a("string");
    });

    it("outputs group creation", function() {
        const output = decodeHistory(describeDataset(this.dataset));
        expect(output.find(line => line.indexOf(`cgr 0 ${this.group.id}`) >= 0)).to.be.a("string");
    });

    it("outputs group title", function() {
        const output = decodeHistory(describeDataset(this.dataset));
        expect(output.find(line => line.indexOf(`tgr ${this.group.id} main`) >= 0)).to.be.a("string");
    });

    it("outputs entry creation", function() {
        const output = decodeHistory(describeDataset(this.dataset));
        expect(output.find(line => line.indexOf(`cen ${this.group.id} ${this.entry.id}`) >= 0)).to.be.a("string");
    });

    it("outputs entry title", function() {
        const output = decodeHistory(describeDataset(this.dataset));
        expect(output.find(line => line.indexOf(`sep ${this.entry.id} title my entry`) >= 0)).to.be.a("string");
    });

    it("outputs miscellaneous entry properties", function() {
        const output = decodeHistory(describeDataset(this.dataset));
        expect(output.find(line => line.indexOf(`sep ${this.entry.id} misc !@#$%^`) >= 0)).to.be.a("string");
    });

    it("outputs entry attributes", function() {
        const output = decodeHistory(describeDataset(this.dataset));
        expect(output.find(line => line.indexOf(`sea ${this.entry.id} myAttr myValue`) >= 0)).to.be.a("string");
    });
});
