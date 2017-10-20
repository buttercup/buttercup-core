const { Archive, Group } = window.Buttercup;

describe("Archive", function() {
    it("can be instantiated", function() {
        const a1 = new Archive();
        expect(a1).to.be.an.instanceof(Archive);
    });

    it("can create groups", function() {
        const a1 = new Archive();
        const g1 = a1.createGroup("Custom");
        expect(g1).to.be.an.instanceof(Group);
    });
});
