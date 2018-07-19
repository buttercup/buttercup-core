const { escape } = require("querystring");
const Credentials = require("@buttercup/credentials");
const { hasValidSignature } = require("@buttercup/signing");
const { getQueue } = require("../Queue.js");
const { API_ARCHIVE, API_OWN_DIGEST, OAUTH_CLIENT_ID_BROWSER_EXT, OAUTH_REDIRECT_URI } = require("./locations.js");
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

function handleWriteResponse(res) {
    if (res.status === 400) {
        throw new Error(`Invalid API response status: ${res.status} ${res.statusText} (archive may already exist)`);
    }
    return res;
}

class MyButtercupClient {
    static generateAuthorisationURL(clientID) {
        const redir = escape(OAUTH_REDIRECT_URI);
        return `https://my.buttercup.pw/oauth/authorize?response_type=token&client_id=${clientID}&redirect_uri=${redir}`;
    }

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
                .then(res => res.json())
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
                    if (!passEntry) {
                        throw new Error(
                            `Failed fetching MyButtercup archive: No archive found in account root for ID: ${archiveID}`
                        );
                    }
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
            .then(res => res.json())
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

    writeArchive({
        token,
        rootArchiveID,
        archiveID,
        encryptedContents,
        updateID,
        masterAccountCredentials,
        isNew = false
    } = {}) {
        const fetch = getFetchMethod();
        const method = isNew ? "POST" : "PUT";
        const errorPrefix = "Failed writing archive:";
        if (!token) {
            return Promise.reject(new Error(`${errorPrefix} No token present`));
        }
        if (!rootArchiveID) {
            return Promise.reject(new Error(`${errorPrefix} Root archive ID is required`));
        }
        if (!archiveID) {
            return Promise.reject(new Error(`${errorPrefix} Target archive ID is required`));
        }
        if (!encryptedContents) {
            return Promise.reject(new Error(`${errorPrefix} Contents empty or not provided`));
        }
        if (!hasValidSignature(encryptedContents)) {
            return Promise.reject(new Error(`${errorPrefix} No signature found on encrypted contents`));
        }
        if (typeof updateID !== "number") {
            return Promise.reject(new Error(`${errorPrefix} Update ID must be a number`));
        }
        if (!masterAccountCredentials) {
            return Promise.reject(new Error(`${errorPrefix} Credentials must be provided`));
        }
        const url = API_ARCHIVE.replace("[ID]", archiveID);
        return this._loadRootArchive(rootArchiveID, masterAccountCredentials)
            .then(() =>
                this.getArchiveQueue(archiveID).enqueue(() => {
                    const url = API_ARCHIVE.replace("[ID]", archiveID);
                    const fetch = getFetchMethod();
                    const fetchOptions = {
                        method,
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            update_id: updateID,
                            archive: encryptedContents
                        })
                    };
                    return fetch(url, fetchOptions);
                })
            )
            .then(handleWriteResponse)
            .then(res => res.json())
            .then(res => {
                const { status } = res;
                if (status !== "ok") {
                    throw new Error(`${errorPrefix} Invalid API response status: ${status}`);
                }
            });
    }

    _initialiseAccount(token) {
        // create a new root archive
    }

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
