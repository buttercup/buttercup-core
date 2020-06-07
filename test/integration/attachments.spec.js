const path = require("path");
const fs = require("fs");
const pify = require("pify");
const {
    AttachmentManager,
    Credentials,
    MemoryStorageInterface,
    VaultManager,
    VaultSource
} = require("../../dist/index.node.js");

const IMAGE_PATH = path.resolve(__dirname, "../resources/attachments/image.png");

const readFile = pify(fs.readFile);
const stat = pify(fs.stat);

describe("AttachmentManager", function() {
    beforeEach(async function() {
        this.vaultManager = new VaultManager({
            cacheStorage: new MemoryStorageInterface(),
            sourceStorage: new MemoryStorageInterface()
        });
        this.sourceCredentials = Credentials.fromDatasource(
            {
                type: "memory",
                property: "test-vault"
            },
            "test"
        );
        const credsStr = await this.sourceCredentials.toSecureString();
        this.source = new VaultSource("Attachments test", "memory", credsStr);
        await this.vaultManager.addSource(this.source);
        await this.source.unlock(this.sourceCredentials, { initialiseRemote: true });
        this.group = this.source.vault.createGroup("test");
        this.entry = this.group.createEntry("Account").setProperty("username", "user@test.com");
    });

    it("supports attachments", async function() {
        expect(this.source.supportsAttachments()).to.be.true;
    });

    it("can add attachments", async function() {
        const attachmentData = await readFile(IMAGE_PATH);
        const attachmentID = AttachmentManager.newAttachmentID();
        const fileInfo = await stat(IMAGE_PATH);
        await this.source.attachmentManager.setAttachment(
            this.entry,
            attachmentID,
            attachmentData,
            path.basename(IMAGE_PATH),
            "image/png",
            fileInfo.size
        );
        const attachmentDataRead = await this.source.attachmentManager.getAttachment(this.entry, attachmentID);
        expect(attachmentData.equals(attachmentDataRead)).to.be.true;
        const details = await this.source.attachmentManager.getAttachmentDetails(this.entry, attachmentID);
        expect(details).to.deep.equal({
            id: attachmentID,
            name: "image.png",
            type: "image/png",
            size: 439968
        });
    });

    describe("with an attachment added", function() {
        beforeEach(async function() {
            const attachmentData = await readFile(IMAGE_PATH);
            this.attachmentID = AttachmentManager.newAttachmentID();
            this.attachmentID2 = AttachmentManager.newAttachmentID();
            const fileInfo = await stat(IMAGE_PATH);
            await this.source.attachmentManager.setAttachment(
                this.entry,
                this.attachmentID,
                attachmentData,
                path.basename(IMAGE_PATH),
                "image/png",
                fileInfo.size
            );
            await this.source.attachmentManager.setAttachment(
                this.entry,
                this.attachmentID2,
                attachmentData,
                "test.png",
                "image/png",
                fileInfo.size
            );
        });

        it("supports removing attachments", async function() {
            await this.source.attachmentManager.removeAttachment(this.entry, this.attachmentID);
            try {
                await this.source.attachmentManager.getAttachment(this.entry, this.attachmentID);
            } catch (err) {
                expect(err).to.match(/Attachment not available/i);
            }
        });

        it("supports listing attachments", async function() {
            const attachments = await this.source.attachmentManager.listAttachments(this.entry);
            const files = attachments.map(item => item.name);
            expect(files).to.have.a.lengthOf(2);
            expect(files).to.contain("image.png");
            expect(files).to.contain("test.png");
        });
    });
});
