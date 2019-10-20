const MyButtercupClient = require("../../../source/node/myButtercup/MyButtercupClient.js");

const FAKE_ARCHIVE = "b~>buttercup/a7LPgKkjPo4YBLzo45TrRdAigy2AOFhfWSUEh1k5RsWt58e05fcae7d5c$10$cbc";

describe("MyButtercupClient", function() {
    describe("fetchUserArchive", function() {
        beforeEach(function() {
            this.client = new MyButtercupClient("client_id", "client_secret", "access_token", "refresh_token");
            this.updateID = Math.floor(Math.random() * 900000) + 1;
            this.client.request = sinon.stub().callsFake(() =>
                Promise.resolve({
                    data: FAKE_ARCHIVE,
                    headers: {
                        "x-mb-updateid": this.updateID.toString()
                    }
                })
            );
        });

        it("sends correct authentication data", function() {
            return this.client.fetchUserArchive().then(() => {
                const req = this.client.request.firstCall.args[0];
                expect(req.headers).to.have.property("Authorization", "Bearer access_token");
            });
        });

        it("returns archive contents", function() {
            return this.client.fetchUserArchive().then(result => {
                expect(result).to.have.property("archive", FAKE_ARCHIVE);
            });
        });

        it("returns update ID", function() {
            return this.client.fetchUserArchive().then(result => {
                expect(result).to.have.property("updateID", this.updateID);
            });
        });
    });

    describe("fetchUserArchiveDetails", function() {
        beforeEach(function() {
            this.client = new MyButtercupClient("client_id", "client_secret", "access_token", "refresh_token");
            this.updateID = Math.floor(Math.random() * 900000) + 1;
            this.client.request = sinon.stub().callsFake(() =>
                Promise.resolve({
                    data: {
                        details: {
                            id: 3,
                            updateID: this.updateID,
                            created: "2019-08-26 19:08:37",
                            lastUpdate: "2019-10-06 12:21:41"
                        }
                    }
                })
            );
        });

        it("sends correct authentication data", function() {
            return this.client.fetchUserArchiveDetails().then(() => {
                const req = this.client.request.firstCall.args[0];
                expect(req.headers).to.have.property("Authorization", "Bearer access_token");
            });
        });

        it("returns archive ID", function() {
            return this.client.fetchUserArchiveDetails().then(result => {
                expect(result).to.have.property("id", 3);
            });
        });

        it("returns update ID", function() {
            return this.client.fetchUserArchiveDetails().then(result => {
                expect(result).to.have.property("updateID", this.updateID);
            });
        });

        it("returns archive creation date", function() {
            return this.client.fetchUserArchiveDetails().then(result => {
                expect(result).to.have.property("created", "2019-08-26 19:08:37");
            });
        });

        it("returns archive updated date", function() {
            return this.client.fetchUserArchiveDetails().then(result => {
                expect(result).to.have.property("lastUpdate", "2019-10-06 12:21:41");
            });
        });
    });

    describe("retrieveDigest", function() {
        beforeEach(function() {
            this.client = new MyButtercupClient("client_id", "client_secret", "access_token", "refresh_token");
            this.client.request = sinon.stub().callsFake(() =>
                Promise.resolve({
                    data: {
                        status: "ok"
                    }
                })
            );
        });

        it("sends correct authentication data", function() {
            return this.client.retrieveDigest().then(() => {
                const req = this.client.request.firstCall.args[0];
                expect(req.headers).to.have.property("Authorization", "Bearer access_token");
            });
        });
    });

    describe("retrieveUsersList", function() {
        beforeEach(function() {
            this.client = new MyButtercupClient("client_id", "client_secret", "access_token", "refresh_token");
            this.client._lastDigest = {
                organisations: [{ id: 5 }, { id: 6 }]
            };
            sinon
                .stub(this.client, "retrieveUsersListForOrganisation")
                .onFirstCall()
                .returns(Promise.resolve([{ user_id: 123, organisation_id: 5 }, { user_id: 456, organisation_id: 5 }]))
                .onSecondCall()
                .returns(Promise.resolve([{ user_id: 789, organisation_id: 6 }]));
        });

        it("returns users", function() {
            return this.client.retrieveUsersList().then(users => {
                expect(users).to.have.lengthOf(3);
            });
        });
    });

    describe("retrieveUsersListForOrganisation", function() {
        beforeEach(function() {
            this.client = new MyButtercupClient("client_id", "client_secret", "access_token", "refresh_token");
            this.client.request = sinon.stub().callsFake(() =>
                Promise.resolve({
                    data: {
                        status: "ok",
                        users: [{ user_id: 123, organisation_id: 5 }, { user_id: 456, organisation_id: 5 }]
                    }
                })
            );
        });

        it("sends correct authentication data", function() {
            return this.client.retrieveUsersListForOrganisation(5).then(() => {
                const req = this.client.request.firstCall.args[0];
                expect(req.headers).to.have.property("Authorization", "Bearer access_token");
            });
        });

        it("returns array of users", function() {
            return this.client.retrieveUsersListForOrganisation(5).then(users => {
                expect(users).to.have.lengthOf(2);
            });
        });
    });

    describe("writeUserArchive", function() {
        beforeEach(function() {
            this.client = new MyButtercupClient("client_id", "client_secret", "access_token", "refresh_token");
            this.client.request = sinon.stub().callsFake(() =>
                Promise.resolve({
                    data: {
                        status: "ok"
                    }
                })
            );
        });

        it("sends correct authentication data", function() {
            return this.client.writeUserArchive(FAKE_ARCHIVE, 100, 200).then(() => {
                const req = this.client.request.firstCall.args[0];
                expect(req.headers).to.have.property("Authorization", "Bearer access_token");
            });
        });

        it("sends encrypted vault data", function() {
            return this.client.writeUserArchive(FAKE_ARCHIVE, 100, 200).then(() => {
                const req = this.client.request.firstCall.args[0];
                expect(req.body).to.equal(FAKE_ARCHIVE);
            });
        });

        it("throws if vault data not encrypted", function() {
            return this.client.writeUserArchive("test", 100, 200).then(
                () => {
                    throw new Error("Should not have resolved");
                },
                err => {
                    expect(err).to.match(/Expected encrypted/i);
                }
            );
        });

        it("sends update IDs in headers", function() {
            return this.client.writeUserArchive(FAKE_ARCHIVE, 100, 200).then(() => {
                const req = this.client.request.firstCall.args[0];
                expect(req.headers).to.have.property("x-mb-updateid", "100");
                expect(req.headers).to.have.property("x-mb-newupdateid", "200");
            });
        });
    });
});
