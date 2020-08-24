const nested = require("nested-property");
const { convertFormatAEntry, convertFormatAGroup } = require("../../../../dist/io/formatB/conversion");

describe("io/formatB/conversion", function() {
    function testEntry(actualPath, expectedPath) {
        it("sets correct entry ID", function() {
            const actual = nested.get(this, actualPath);
            const expected = nested.get(this, expectedPath);
            expect(actual).to.have.property("id", expected.id);
        });

        it("sets correct entry parent ID", function() {
            const actual = nested.get(this, actualPath);
            const expected = nested.get(this, expectedPath);
            expect(actual).to.have.property("g", expected.parentID);
        });

        it("sets correct entry attributes", function() {
            const actual = nested.get(this, actualPath);
            expect(actual)
                .to.have.property("a")
                .that.is.an("object");
            expect(actual)
                .to.have.nested.property("a.test-attr")
                .that.is.an("object");
            expect(actual).to.have.nested.property("a.test-attr.value", "test-value");
        });

        it("sets correct entry properties", function() {
            const actual = nested.get(this, actualPath);
            expect(actual)
                .to.have.property("p")
                .that.is.an("object");
            expect(actual)
                .to.have.nested.property("p.test-prop")
                .that.is.an("object");
            expect(actual).to.have.nested.property("p.test-prop.value", "test-value");
        });
    }

    function testGroup(actualPath, expectedPath) {
        it("sets correct group ID", function() {
            const actual = nested.get(this, actualPath);
            const expected = nested.get(this, expectedPath);
            expect(actual).to.have.property("id", expected.id);
        });

        it("sets correct group title", function() {
            const actual = nested.get(this, actualPath);
            const expected = nested.get(this, expectedPath);
            expect(actual).to.have.property("t", expected.title);
        });

        it("sets correct group attributes", function() {
            const actual = nested.get(this, actualPath);
            expect(actual)
                .to.have.property("a")
                .that.is.an("object");
            expect(actual)
                .to.have.nested.property("a.test-attr")
                .that.is.an("object");
            expect(actual).to.have.nested.property("a.test-attr.value", "test-value");
        });

        it("sets correct group parent ID", function() {
            const actual = nested.get(this, actualPath);
            const expected = nested.get(this, expectedPath);
            expect(actual).to.have.property("g", expected.parentID);
        });
    }

    describe("convertFormatAEntry", function() {
        beforeEach(function() {
            this.formatAEntry = {
                id: "abc123",
                attributes: {
                    "test-attr": "test-value"
                },
                properties: {
                    "test-prop": "test-value"
                },
                parentID: "parent123"
            };
            this.formatBEntry = convertFormatAEntry(this.formatAEntry);
        });

        testEntry("formatBEntry", "formatAEntry");
    });

    describe("convertFormatAGroup", function() {
        beforeEach(function() {
            this.formatAGroup = {
                id: "abc123",
                attributes: {
                    "test-attr": "test-value"
                },
                title: "My group",
                parentID: "0",
                groups: [
                    {
                        id: "def456",
                        attributes: {
                            subgroup: "subvalue"
                        },
                        title: "My sub group",
                        parentID: "abc123"
                    }
                ],
                entries: [
                    {
                        id: "xyz999",
                        attributes: {
                            "test-attr": "test-value"
                        },
                        properties: {
                            "test-prop": "test-value"
                        },
                        parentID: "abc123"
                    }
                ]
            };
            this.formatBGroup = convertFormatAGroup(this.formatAGroup);
        });

        testGroup("formatBGroup", "formatAGroup");
    });
});
