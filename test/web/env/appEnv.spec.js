import { getSharedAppEnv } from "../../../source/index.web";

describe("appEnv", function() {
    describe("compression", function() {
        describe("v2", function() {
            const compress = getSharedAppEnv().getProperty("compression/v2/compressText");
            const decompress = getSharedAppEnv().getProperty("compression/v2/decompressText");

            it("can compress and decompress text", async function() {
                const compressed = await compress("this is\nsome text! ");
                const decompressed = await decompress(compressed);
                expect(decompressed).to.equal("this is\nsome text! ");
            });

            it("can compress and decompress special characters", async function() {
                const compressed = await compress("ატრიბუტი\nความคุ้มค่า");
                console.log("COMP", compressed);
                const decompressed = await decompress(compressed);
                expect(decompressed).to.equal("ატრიბუტი\nความคุ้มค่า");
            });
        });
    });
});
