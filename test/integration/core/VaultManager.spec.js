const path = require("path");
const tmp = require("tmp");
const {
    Credentials,
    FileDatasource,
    Group,
    MemoryStorageInterface,
    Vault,
    VaultManager,
    VaultSource
} = require("../../../dist/index.node.js");

describe("VaultManager", function() {
    beforeEach(function(done) {
        this.vaultManager = new VaultManager({
            autoUpdate: false
        });
        tmp.dir((err, dirPath, cleanup) => {
            if (err) return document(err);
            this.tmpDir = dirPath;
            this.cleanup = cleanup;
            done();
        });
    });

    afterEach(function() {
        this.cleanup();
    });

    it("can migrate & unlock legacy vaults", async function() {
        await this.vaultManager._sourceStorage.setValue(
            `${VaultManager.STORAGE_KEY_PREFIX}b441aecb-810c-4665-a164-9d2e9a2b932a`,
            JSON.stringify({
                id: "b441aecb-810c-4665-a164-9d2e9a2b932a",
                name: "testing",
                type: "text",
                status: "locked",
                colour: "#000000",
                order: 0,
                meta: {},
                sourceCredentials:
                    "b~>buttercup/acreds.v2.BI288tF4BPFCWbuiLooO/8gYLtCtIkgYLKyGX5I+MVmnu1tkg6QMpNdXv8Nz+MXdNHkIVc6FP+Uu+C6nUh0LhPRZAr6Lxi2SHJ4Iq4a+2S2/u9faDMQjxLErPlEhBgQ/DS+1WUGroKPiJeQy6otKKEmwyeut3WtBsm+JUbYz7hl/vX+UlU+DpKwl/TNLWPW9lGiIvCdMWD9yvbSyqPZU9LKasPVNjTI3/tmKQeMwxGSEa+TJZToV6KjTnwKAJ/mWTHa4SqdJhrjb9R1X+wZcssNNBfGa/dh/yNTs59hhSBlnSv1BMEFSFxvaR+bTJHl/WqSxinkrSE1dZlCOJVqPNlOnKz+3GU6q5cQk37azLXUcoM8BPwTsijfom3KwkCQCg7695RMAb56LKq1he29OeUF8d0dXmkT6A/LLDd+Uvr0UPekd4Gh6op9GQRRWNQSo0/agRwKD1OCpar2N6di31VjPPUNpnAH+V1EpiE6F2+zBXzyrtmqzuIS3SUUKCKgsY9fkpXjP0Tx5qyfliP6h2Y1wboVfjwfKJwKqY0ZaBJTjn5xNv6y9Gq21g0uwOWkled6GjKdX2Fm8rqAECY9gK3WzuFYKUBkBSOkLN+x3OM+dG166OAld/gJcN7y02G1ATONu9Zuvc8kKFN+2ZesurgpxmcObdQKm2ZiL4Q2fGA1rax8hHRNOcGT0R6qs8IEX3bHBwzpHKa+ClyLju9XCwY4KOPzzHP4cgQlgrF2Ye+9N+2KdMziG07hTp7l6KeHKF/JzVrvi/nGx9zAeufOgSF57ZlMb5w93/2cZlU2Xgs/33gL5yVKIGACiQ7AYRNtMLZ3Wn4rW1B4+8XVujpuYsEpUd2oHy7as+abFWjCTFJNtvZk8BIMJD8ItIkcUHJZX2y02jmMhIivxwXS4KOPwogSNYiAu5wrKgf4VqZnF0Ak3k+vKWGPj8sWNlmZjk8yZwnqi7R0b8rumWFbkLYFSY4iXCZx4QmvPB8DaFfzW4gaNiCU6MSTPfDUEnmqdI7rIrru3toNcE1wYtMMV/9mh836VJUuq78okO5ks+TF94T0i19pVq6FKLcfN919eqd+/dVs/6eP5kBpAc6JgHHUNwLBsLoQlBQSrrIAJoRkgwmJ/VUOH1MK/bhv7JV81WZO8$e9e75e4b106980af555b0a251e944d1b$hf9KttMqrwaM$10d9b0b9637c9e44226b746280f66713e68930af39a31c9ffdabb5f79ed579e3$10$cbc",
                archiveCredentials:
                    "b~>buttercup/acreds.v2.d7APLorDcHoE4tAfrfFw9mH09XunmGIpGHC258eKR8t1KyQ9Z0kJI2GH3w/QS8Dx$7f3a51cbaa4dfbc9137140c7fe1cb3a3$Thyj3N1x9j2I$57013005f4ebdac3350a72528a02a972cb95589d0150220a57e862af9cac9079$10$cbc"
            })
        );
        await this.vaultManager.rehydrate();
        await this.vaultManager.sources[0].unlock(Credentials.fromPassword("test"));
        expect(this.vaultManager.sources[0].status).to.equal(VaultSource.STATUS_UNLOCKED);
    });

    it("can merge differences between local and remote vaults", async function() {
        const vaultPath = path.join(this.tmpDir, "vault.bcup");
        // Init first
        const creds = Credentials.fromDatasource(
            {
                type: "file",
                path: vaultPath
            },
            "test"
        );
        const credsStr = await creds.toSecureString();
        const source = new VaultSource("Test", "file", credsStr);
        await this.vaultManager.addSource(source);
        await source.unlock(Credentials.fromPassword("test"), { initialiseRemote: true });
        // Make changes to remote
        const fds = new FileDatasource(creds);
        const loadedTemp = await fds.load(Credentials.fromPassword("test"));
        const tempVault = Vault.createFromHistory(loadedTemp.history, loadedTemp.Format);
        tempVault.createGroup("Remote");
        await fds.save(tempVault.format.history, Credentials.fromPassword("test"));
        // Make changes to local
        source.vault.createGroup("Local");
        // Save (+ merge)
        await source.save();
        // Expect the changes are present
        const remoteGroup = source.vault.findGroupsByTitle("Remote")[0];
        const localGroup = source.vault.findGroupsByTitle("Local")[0];
        expect(remoteGroup).to.be.an.instanceOf(Group);
        expect(localGroup).to.be.an.instanceOf(Group);
    });
});
