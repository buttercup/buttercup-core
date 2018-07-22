const { escape } = require("querystring");
const Credentials = require("@buttercup/credentials");
const { hasValidSignature } = require("@buttercup/signing");
const { getQueue } = require("../Queue.js");
const Archive = require("../Archive.js");
const {
    API_ARCHIVE,
    API_ARCHIVE_NEW,
    API_OWN_DIGEST,
    API_OWN_KEY,
    API_OWN_ORG,
    ARCHIVE_TYPE_NORMAL,
    ARCHIVE_TYPE_ROOT,
    OAUTH_AUTHORISE_URI,
    OAUTH_CLIENT_ID_BROWSER_EXT,
    OAUTH_REDIRECT_URI
} = require("./symbols.js");
const { getFetchMethod } = require("../tools/request.js");
const MyButtercupRootDatasource = require("./MyButtercupRootDatasource.js");
const { createNewRoot } = require("./init.js");

const NOOP = () => {};

let __shared;

function handleGetResponse(res) {
    if (res.status < 200 || res.status >= 300) {
        throw new Error(`Invalid API response status: ${res.status} ${res.statusText}`);
    }
    return res;
}

function handlePutKeyResponse(res) {
    if (res.status !== 200) {
        throw new Error(`Failed writing public key: Invalid API response status: ${res.status} ${res.statusText}`);
    }
    return res;
}

function handleWriteResponse(res) {
    if (res.status === 400) {
        throw new Error(
            `Invalid API response status: ${res.status} ${
                res.statusText
            } (archive may already exist or information was invalid)`
        );
    } else if (res.status >= 300) {
        throw new Error(`Invalid API response status: ${res.status} ${res.statusText}`);
    }
    return res;
}

class MyButtercupClient {
    static generateAuthorisationURL(clientID) {
        const redir = escape(OAUTH_REDIRECT_URI);
        return `${OAUTH_AUTHORISE_URI}?response_type=token&client_id=${clientID}&redirect_uri=${redir}`;
    }

    constructor() {
        this._digests = {};
        this._rootArchives = {};
    }

    get rootArchives() {
        return this._rootArchives;
    }

    fetchArchive(token, rootArchiveID, archiveID) {
        return Promise.resolve().then(() => {
            if (!rootArchiveID) {
                throw new Error(`Invalid root archive ID: ${rootArchiveID}`);
            }
            if (!archiveID) {
                throw new Error(`Invalid archive ID: ${archiveID}`);
            }
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
                    const [archivePasswordsGroup] = rootArchive.findGroupsByTitle("archives");
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

    loadRootArchive(token, rootID, masterAccountCredentials) {
        const queue = this.getArchiveQueue(rootID);
        if (queue.isRunning) {
            return queue.enqueue(NOOP).then(() => ({ ...this._rootArchives[rootID] }));
        } else if (this._rootArchives.hasOwnProperty(rootID)) {
            return Promise.resolve({ ...this._rootArchives[rootID] });
        }
        return queue.enqueue(() => {
            const datasource = new MyButtercupRootDatasource(token, rootID);
            // @todo use workspace for root merging
            return datasource
                .load(masterAccountCredentials)
                .then(history => Archive.createFromHistory(history))
                .then(archive => {
                    this._rootArchives[rootID] = {
                        archive,
                        datasource
                    };
                    return { ...this._rootArchives[rootID] };
                });
        });
    }

    saveRootArchive(token, rootID, masterAccountCredentials) {
        // @todo use workspace for root merging
        const { archive, datasource } = this._rootArchives[rootID];
        return datasource.save(archive.getHistory(), masterAccountCredentials);
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
                        return this._initialiseAccount(token, masterAccountCredentials).then(() =>
                            this.updateDigest(token, masterAccountCredentials)
                        );
                    case "ok": {
                        const rootArchiveID = res.root_archive;
                        const personalOrgID = res.personal_org_id;
                        this._digests[rootArchiveID] = res;
                        return this.loadRootArchive(token, rootArchiveID, masterAccountCredentials).then(() => ({
                            rootArchiveID,
                            personalOrgID
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
        newUpdateID,
        masterAccountCredentials,
        isNew = false,
        isRoot = false,
        organisationID,
        name = "Untitled"
    } = {}) {
        const fetch = getFetchMethod();
        const method = isNew ? "POST" : "PUT";
        const errorPrefix = "Failed writing archive:";
        if (!token) {
            return Promise.reject(new Error(`${errorPrefix} No token present`));
        }
        if (!rootArchiveID && !isRoot) {
            return Promise.reject(new Error(`${errorPrefix} Root archive ID is required`));
        }
        if (!archiveID && !isNew) {
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
        const initialWork = isRoot
            ? Promise.resolve()
            : this._getOwnOrganisationID(token).then(orgID =>
                  this.loadRootArchive(token, rootArchiveID, masterAccountCredentials)
              );
        return initialWork
            .then(() =>
                this.getArchiveQueue(archiveID).enqueue(() => {
                    const url = isNew ? API_ARCHIVE_NEW : API_ARCHIVE.replace("[ID]", archiveID);
                    const fetch = getFetchMethod();
                    const fetchOptions = {
                        method,
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name,
                            update_id: updateID,
                            new_update_id: newUpdateID,
                            archive: encryptedContents,
                            organisation_id: organisationID,
                            type: isRoot ? ARCHIVE_TYPE_ROOT : ARCHIVE_TYPE_NORMAL
                        })
                    };
                    return fetch(url, fetchOptions);
                })
            )
            .then(handleWriteResponse)
            .then(res => res.json())
            .then(res => {
                const { status, update_id: updateID, archive_id: archiveID } = res;
                if (status !== "ok") {
                    throw new Error(`${errorPrefix} Invalid API response status: ${status}`);
                }
                return {
                    updateID,
                    archiveID
                };
            });
    }

    _getOwnOrganisationID(token) {
        const fetch = getFetchMethod();
        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        return fetch(API_OWN_ORG, fetchOptions)
            .then(handleGetResponse)
            .then(res => res.json())
            .then(resp => resp.org_id);
    }

    _initialiseAccount(token, masterAccountCredentials) {
        // create a new root archive
        return (
            createNewRoot()
                .then(rootArchive => {
                    const [keysGroup] = rootArchive.findGroupsByTitle("keys");
                    const [pubKeyEntry] = keysGroup.findEntriesByProperty("title", "public-key");
                    const pubKey = pubKeyEntry.getProperty("password");
                    return this._setPublicKey(token, pubKey).then(() => rootArchive);
                })
                // write to remote
                .then(rootArchive => {
                    return this._getOwnOrganisationID(token).then(organisationID => {
                        const datasource = new MyButtercupRootDatasource(token, /* root ID: */ null);
                        return datasource.save(rootArchive.getHistory(), masterAccountCredentials, {
                            isNew: true,
                            organisationID
                        });
                    });
                })
        );
    }

    _setPublicKey(token, publicKey) {
        const fetch = getFetchMethod();
        const fetchOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                public_key: publicKey
            })
        };
        return fetch(API_OWN_KEY, fetchOptions).then(handlePutKeyResponse);
    }
}

MyButtercupClient.getSharedClient = function getSharedClient() {
    if (!__shared) {
        __shared = new MyButtercupClient();
    }
    return __shared;
};

module.exports = MyButtercupClient;
