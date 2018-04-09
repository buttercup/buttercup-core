const { getQueue } = require("../Queue.js");
const { API_ARCHIVE, API_OWN_DIGEST } = require("./locations.js");
const { getFetchMethod } = require("../tools/request.js");

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
    }

    fetchArchive(archiveID) {
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
                    return {
                        archive,
                        updateID
                    };
                });
        });
    }

    getArchiveQueue(archiveID) {
        return getQueue().channel(`mybuttercup:archive:${archiveID}`);
    }

    updateDigest(token) {
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
                        return this._initialiseAccount(token);
                    case "ok": {
                        const rootArchiveID = res.root_archive;
                        this._digests[rootArchiveID] = res;
                    }
                    default:
                        throw new Error(`Digest update failed: Invalid response status: ${status}`);
                }
            });
    }

    _initialiseAccount(token) {}
}

MyButtercupClient.getSharedClient = function getSharedClient() {
    if (!__shared) {
        __shared = new MyButtercupClient();
    }
    return __shared;
};

module.exports = MyButtercupClient;
