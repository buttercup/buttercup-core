"use strict";

const VError = require("VError");
const createCredentials = require("./credentials.js");
const credentialsToSource = require("./archiveManagement/marshalling.js").credentialsToSource;
const getUniqueID = require("../tools/encoding.js").getUniqueID;

const STORAGE_KEY_PREFIX = "bcup_archivemgr_";
const STORAGE_KEY_COLLECTION = "bcup_archivemgr__keys_";

const SourceStatus = {
    LOCKED:     "locked",
    UNLOCKED:   "unlocked",
    PENDING:    "pending"
};

class ArchiveManager {

    constructor(storageInterface) {
        this._storageInterface = storageInterface;
        this._sources = [];
    }

    get sources() {
        return this._sources;
    }

    get storageInterface() {
        return this._storageInterface;
    }

    get unlockedSources() {
        return this.sources.map(source => source.status === SourceStatus.UNLOCKED);
    }

    addSource(name, sourceCredentials, archiveCredentials, initialise = false) {
        return credentialsToSource(sourceCredentials, archiveCredentials, initialise)
            .then(sourceInfo => {
                const id = getUniqueID();
                this._sources.push(Object.assign(
                    sourceInfo,
                    {
                        name,
                        id,
                        status: SourceStatus.UNLOCKED,
                        type: sourceCredentials.type
                    }
                ));
                return id;
            })
            .catch(function(err) {
                throw new VError(err, "Failed adding source");
            });
    }

    indexOfSource(id) {
        return this.sources.findIndex(source => source.id === id);
    }

    lock(id) {
        let source;
        return Promise
            .resolve()
            .then(() => {
                const index = this.indexOfSource(id);
                if (index < 0) {
                    throw new VError("Source not found for ID");
                }
                source = this.sources[index];
                if (source.status !== SourceStatus.UNLOCKED) {
                    throw new VError(`Source state invalid: ${source.status}`);
                }
                source.status = SourceStatus.PENDING;
            })
            .then(() => Promise.all([
                source.sourceCredentials.toSecureString(source.archiveCredentials.password),
                source.archiveCredentials.toSecureString(source.archiveCredentials.password)
            ]))
            .then(([encParentCreds, encArchiveCreds] = []) => {
                this._replace(source.id, {
                    id: source.id,
                    name: source.name,
                    type: source.type,
                    status: SourceStatus.LOCKED,
                    sourceCredentials: encParentCreds,
                    archiveCredentials: encArchiveCreds
                });
            })
            .catch(function __handleLockError(err) {
                if (source) {
                    source.status = SourceStatus.UNLOCKED;
                }
                throw new VError(err, `Failed to lock source with ID: ${id}`);
            });
    }

    unlock(id, masterPassword) {
        let source;
        return Promise
            .resolve()
            .then(() => {
                const index = this.indexOfSource(id);
                if (index < 0) {
                    throw new VError("Source not found for ID");
                }
                source = this.sources[index];
                if (source.status !== SourceStatus.LOCKED) {
                    throw new VError(`Source state invalid: ${source.status}`);
                }
                source.status = SourceStatus.PENDING;
                return Promise.all([
                    createCredentials.fromSecureString(source.sourceCredentials, masterPassword),
                    createCredentials.fromSecureString(source.archiveCredentials, masterPassword)
                ]);
            })
            .then(([sourceCredentials, archiveCredentials] = []) => {
                return credentialsToSource(sourceCredentials, archiveCredentials, /* initialise */ false)
                    .then(sourceInfo => {
                        this._replace(source.id, Object.assign(
                            sourceInfo,
                            {
                                id: source.id,
                                status: SourceStatus.UNLOCKED,
                                type: sourceCredentials.type
                            }
                        ))
                    })
                    .catch(function __handleCredentialsMapError(err) {
                        throw new VError(err, "Failed mapping credentials to a source");
                    });
            })
            .catch(function(err) {
                throw new VError(err, `Failed to unlock source with ID: ${id}`);
            });
    }

    _replace(id, source) {
        const index = this.indexOfSource(id);
        if (index < 0) {
            throw new VError(`Failed replacing source: Source not found`);
        }
        this.sources[index] = source;
    }

}

ArchiveManager.SourceStatus = SourceStatus;

module.exports = ArchiveManager;
