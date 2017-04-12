"use strict";

const stringHash = require("string-hash");
const Queue = require("promise-queue");

const Archive = require("./Archive.js");
const Workspace = require("./Workspace.js");
const DatasourceAdapter = require("./DatasourceAdapter.js");
const createCredentials = require("./credentials.js");
const getArchiveList = require("../tools/myButtercup/archive.js").getArchiveList;

const STORAGE_KEY_PREFIX = "bcup_archivemgr_";
const STORAGE_KEY_COLLECTION = "bcup_archivemgr__keys_";
const STORAGE_QUEUE_CONCURRENCY = 1;
const STORAGE_QUEUE_LIMIT = Infinity;

function credentialsToDatasources(sourceCredentials) {
    const datasourceDescriptionRaw = sourceCredentials.getValueOrFail("datasource");
    const datasourceDescription = JSON.parse(datasourceDescriptionRaw);
    if (typeof datasourceDescription.type !== "string") {
        throw new Error("Failed creating datasources: Invalid or missing type");
    }
    if (datasourceDescription.type === "mybuttercup") {
        if (typeof datasourceDescription.token !== "string") {
            throw new Error("Failed fetching archives: Invalid or missing access token");
        }
        return getArchiveList(datasourceDescription.token)
            .then(archives => archives.map(function(archiveInfo) {
                const singularCredentials = createCredentials("mybuttercup/archive");
                const singularDescriptionRaw = {
                    type: "mybuttercup/archive",
                    token: datasourceDescription.token,
                    archiveID: archiveInfo.id
                };
                singularCredentials.setValue("datasource", JSON.stringify(singularDescriptionRaw));
                return {
                    datasource: DatasourceAdapter.objectToDatasource(singularDescriptionRaw, singularCredentials),
                    credentials: singularCredentials,
                    name: archiveInfo.name
                };
            }));
    }
    const datasource = DatasourceAdapter.objectToDatasource(datasourceDescription, sourceCredentials);
    return Promise.resolve([
        {
            datasource,
            credentials: sourceCredentials,
            name: sourceCredentials.getValue("name") || ""
        }
    ]);
}

function credentialsToSources(sourceCredentials, archiveCredentials, initialise = false) {
    return credentialsToDatasources(sourceCredentials)
        .then(datasources => Promise.all(datasources.map(function(datasourceInfo) {
            const datasource = datasourceInfo.datasource;
            const defaultArchive = Archive.createWithDefaults();
            return initialise ?
                datasource
                    .save(defaultArchive, archiveCredentials)
                    .then(() => Object.assign(
                        {
                            archive: defaultArchive
                        },
                        datasourceInfo
                    )) :
                datasource.load(archiveCredentials)
                    .then(archive => Object.assign(
                        {
                            archive
                        },
                        datasourceInfo
                    ));
        })))
        .then(configurations => configurations.map(function(config) {
            const workspace = new Workspace();
            workspace.setPrimaryArchive(config.archive, config.datasource, config.credentials);
            return {
                workspace,
                name: config.name,
                parentSourceCredentials: sourceCredentials,
                childSourceCredentials: config.credentials,
                archiveCredentials
            };
        }));
}

function encodeStorageName(name) {
    return stringHash(name).toString();
}

class ArchiveManager {
    
    constructor(storageInterface) {
        this._storageInterface = storageInterface;
        this._sources = {};
        this._storageQueue = new Queue(STORAGE_QUEUE_CONCURRENCY, STORAGE_QUEUE_LIMIT);
    }

    get sources() {
        return this._sources;
    }

    get storageInterface() {
        return this._storageInterface;
    }

    get storageQueue() {
        return this._storageQueue;
    }

    get unlockedSources() {
        return Object.keys(this._sources)
            .map(key => this._sources[key])
            .filter(source => source.status === ArchiveManager.ArchiveStatus.UNLOCKED);
    }

    addSource(name, sourceCredentials, archiveCredentials, initialise = false) {
        return credentialsToSources(sourceCredentials, archiveCredentials, initialise)
            .then(sourcesInfo => {
                sourcesInfo.forEach(sourceInfo => {
                    if (this.sources.hasOwnProperty(sourceInfo.name)) {
                        throw new Error(`Cannot add source: Archive source with this name already exists: ${sourceInfo.name}`);
                    }
                });
                sourcesInfo.forEach(sourceInfo => {
                    this._sources[name] = Object.assign(
                        {
                            status: ArchiveManager.ArchiveStatus.UNLOCKED,
                            type: sourceCredentials.type
                        },
                        sourceInfo
                    );
                    return this.dehydrate();
                });
            });
    }

    dehydrate() {
        return this.storageQueue.add(() => 
            Promise
                .all(this.unlockedSources.map(source => {
                    const archiveCredentials = source.archiveCredentials;
                    return Promise
                        .all([
                            source.parentSourceCredentials.toSecureString(archiveCredentials.password),
                            archiveCredentials.toSecureString(archiveCredentials.password)
                        ])
                        .then(([encParentCreds, encArchiveCreds] = []) => {
                            const packet = {
                                name: source.name,
                                sourceCredentials: encParentCreds,
                                archiveCredentials: encArchiveCreds,
                                type: source.type
                            };
                            const key = `${STORAGE_KEY_PREFIX}${encodeStorageName(source.type + source.name)}`;
                            return this.storageInterface
                                .setValue(key, JSON.stringify(packet))
                                .then(() => key);
                        });
                }))
                .then(keys => {
                    return this.storageInterface.setValue(
                        STORAGE_KEY_COLLECTION,
                        keys.join(",")
                    );
                })
        );
    }

    lock(name) {
        if (this.sources.hasOwnProperty(name) !== true) {
            throw new Error(`Failed to lock: Source not found: ${name}`);
        }
        const source = this.sources[name];
        source.status = ArchiveManager.ArchiveStatus.PROCESSING;
        return this
            .dehydrate()
            .then(() => {
                this.sources[name] = {
                    name: source.name,
                    type: source.type,
                    status: ArchiveManager.ArchiveStatus.LOCKED,
                    sourceCredentials: source.parentSourceCredentials,
                    archiveCredentials: source.archiveCredentials
                };
            });
    }

    rehydrate() {
        this._sources = {};
        return this.storageQueue.add(
            this.storageInterface
                .getValue(STORAGE_KEY_COLLECTION)
                .then(keys => Promise.all(
                    keys.split(",").map(key => this.storageInterface.getValue(key))
                ))
                .then(packets => {
                    packets.forEach(packetRaw => {
                        const packet = JSON.parse(packetRaw);
                        this._sources[packet.name] = {
                            name: packet.name,
                            type: packet.type,
                            status: ArchiveManager.ArchiveStatus.LOCKED,
                            sourceCredentials: packet.sourceCredentials,
                            archiveCredentials: packet.archiveCredentials
                        };
                    })
                })
        );
    }

}

ArchiveManager.ArchiveStatus = Object.freeze({
    UNLOCKED:       "unlocked",
    LOCKED:         "locked",
    PROCESSING:     "processing"
});

module.exports = ArchiveManager;
