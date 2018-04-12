const Credentials = require("@buttercup/credentials");
const { getQueue } = require("../Queue.js");
const { API_ARCHIVE, API_OWN_DIGEST } = require("./locations.js");
const { getFetchMethod } = require("../tools/request.js");
const MyButtercupRootDatasource = require("./MyButtercupRootDatasource.js");

const NOOP = () => {};

let __shared;

function handleGetResponse(res) {
    if (res.status < 200 || res.status >= 300) {
        throw new Error(`Invalid API response status: ${res.status} ${res.statusText}`);
    }
    return res;
}

class MyButtercupClient {
    constructor() {
        this._digests = {};
        this._rootArchives = {};
    }

    fetchArchive(rootArchiveID, archiveID) {
        return this.getArchiveQueue(archiveID).enqueue(() => {
            const url = API_ARCHIVE.replace("[ID]", archiveID);
            const fetch = getFetchMethod();
            const fetchOptions = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            return fetch(url, fetchOptions)
                .then(handleGetResponse)
                .then(res => {
                    const { status, archive, update_id: updateID } = res;
                    if (status !== "ok") {
                        throw new Error(`Failed fetching MyButtercup archive: Invalid status: ${status}`);
                    }
                    if (rootArchiveID === archiveID) {
                        return {
                            archive,
                            updateID
                        };
                    }
                    // root archive should already be loaded by now
                    const { archive: rootArchive } = this._rootArchives[rootArchiveID];
                    const [archivePasswordsGroup] = rootArchive.findGroupsByTitle("archive-passwords");
                    const [passEntry] = archivePasswordsGroup.findEntriesByProperty("title", archiveID);
                    const masterPassword = passEntry.getProperty("password");
                    return {
                        archive,
                        updateID,
                        masterPassword
                    };
                });
        });
    }

    getArchiveQueue(archiveID) {
        return getQueue().channel(`mybuttercup:archive:${archiveID}`);
    }

    // isLoadingRootArchive(rootID) {
    //     const queue = this.getArchiveQueue(rootID);
    //     return queue.isRunning;
    // }

    updateDigest(token, masterAccountCredentials) {
        const fetch = getFetchMethod();
        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return fetch(API_OWN_DIGEST, fetchOptions)
            .then(handleGetResponse)
            .then(res => {
                const { status } = res;
                switch (status) {
                    case "init":
                        return this._initialiseAccount(token).then(() =>
                            this.updateDigest(token, masterAccountCredentials)
                        );
                    case "ok": {
                        const rootArchiveID = res.root_archive;
                        this._digests[rootArchiveID] = res;
                        return this._loadRootArchive(rootArchiveID, masterAccountCredentials).then(() => ({
                            rootArchiveID
                        }));
                    }
                    default:
                        throw new Error(`Digest update failed: Invalid response status: ${status}`);
                }
            });
    }

    writeArchive(rootArchiveID, archiveID, encryptedContents, updateID) {}

    _initialiseAccount(token) {}

    _loadRootArchive(rootID, masterAccountCredentials) {
        const queue = this.getArchiveQueue(rootID);
        if (queue.isRunning) {
            return queue.enqueue(NOOP);
        } else if (this._rootArchives.hasOwnProperty(rootID)) {
            return Promise.resolve();
        }
        return queue.enqueue(() => {
            const datasource = new MyButtercupRootDatasource(rootID);
            return datasource.load(masterAccountCredentials).then(archive => {
                this._rootArchives[rootID] = {
                    archive,
                    datasource
                };
            });
        });
    }
}

MyButtercupClient.getSharedClient = function getSharedClient() {
    if (!__shared) {
        __shared = new MyButtercupClient();
    }
    return __shared;
};

module.exports = MyButtercupClient;
