const VError = require("verror");
const AsyncEventEmitter = require("./events/AsyncEventEmitter.js");
const getUniqueID = require("../tools/encoding.js").getUniqueID;
const createCredentials = require("./credentials.js");
const credentialsToSource = require("./archiveManagement/marshalling.js").credentialsToSource;

const DefaultColour = "#000000";
const Status = {
    LOCKED: "locked",
    UNLOCKED: "unlocked",
    PENDING: "pending"
};

function rehydrate(dehydratedString) {
    const { name, id, sourceCredentials, archiveCredentials, type, colour } = JSON.parse(dehydratedString);
    const source = new ArchiveSource(name, sourceCredentials, archiveCredentials, id);
    source.type = type;
    if (colour) {
        source.colour = colour;
    }
    return source;
}

class ArchiveSource extends AsyncEventEmitter {
    constructor(name, sourceCredentials, archiveCredentials, id = getUniqueID()) {
        super();
        if (createCredentials.isSecureString(sourceCredentials) !== true) {
            throw new VError("Failed constructing archive source: Source credentials not in encrypted form");
        }
        if (createCredentials.isSecureString(archiveCredentials) !== true) {
            throw new VError("Failed constructing archive source: Archive credentials not in encrypted form");
        }
        this._name = name;
        this._id = id;
        this._status = Status.LOCKED;
        this._sourceCredentials = sourceCredentials;
        this._archiveCredentials = archiveCredentials;
        this._workspace = null;
        this._colour = DefaultColour;
        this.type = "";
    }

    get colour() {
        return this._colour;
    }

    get description() {
        return {
            name: this.name,
            id: this.id,
            status: this.status,
            type: this.type,
            colour: this.colour
        };
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get status() {
        return this._status;
    }

    get workspace() {
        return this._workspace;
    }

    set colour(newColour) {
        if (/^$/.test(newColour) !== true) {
            throw new VError(`Failed setting colour: Invalid format (expected hex): ${newColour}`);
        }
        this._colour = newColour;
    }

    dehydrate() {
        if (this.status === Status.PENDING) {
            return Promise.reject(new VError(`Failed dehydrating source: Source in pending state: ${this.id}`));
        }
        return Promise.resolve()
            .then(() => {
                const payload = {
                    id: this.id,
                    name: this.name,
                    type: this.type,
                    status: Status.LOCKED
                };
                if (this.status === Status.LOCKED) {
                    payload.sourceCredentials = this._sourceCredentials;
                    payload.archiveCredentials = this._archiveCredentials;
                    return payload;
                }
                return Promise.all([
                    this._sourceCredentials.toSecureString(this._archiveCredentials.password),
                    this._archiveCredentials.toSecureString(this._archiveCredentials.password)
                ]).then(([encSourceCredentials, encArchiveCredentials]) => {
                    payload.sourceCredentials = encSourceCredentials;
                    payload.archiveCredentials = encArchiveCredentials;
                    return payload;
                });
            })
            .then(payload => JSON.stringify(payload))
            .catch(err => {
                throw new VError(err, `Failed dehydrating source: ${this.id}`);
            });
    }

    lock() {
        if (this.status !== Status.UNLOCKED) {
            return Promise.reject(
                new VError(`Failed locking source: Source in invalid state (${this.status}): ${this.id}`)
            );
        }
        this._status = Status.PENDING;
        return Promise.all([
            this._sourceCredentials.toSecureString(this._archiveCredentials.password),
            this._archiveCredentials.toSecureString(this._archiveCredentials.password)
        ])
            .then(([encSourceCredentials, encArchiveCredentials]) => {
                this._status = Status.LOCKED;
                this._workspace = null;
                this._sourceCredentials = encSourceCredentials;
                this._archiveCredentials = encArchiveCredentials;
                return this.dehydrate();
            })
            .then(() => {
                this.emit("sourceLocked", this.description);
            })
            .catch(err => {
                throw new VError(err, `Failed locking source: ${this.id}`);
            });
    }

    unlock(masterPassword) {
        if (this.status !== Status.LOCKED) {
            return Promise.reject(
                new VError(`Failed unlocking source: Source in invalid state (${this.status}): ${this.id}`)
            );
        }
        this._status = Status.PENDING;
        return Promise.all([
            createCredentials.fromSecureString(this._sourceCredentials, masterPassword),
            createCredentials.fromSecureString(this._archiveCredentials, masterPassword)
        ])
            .then(([sourceCredentials, archiveCredentials] = []) => {
                return credentialsToSource(sourceCredentials, archiveCredentials, /* initialise */ false)
                    .then(sourceInfo => {
                        const { workspace, sourceCredentials, archiveCredentials } = sourceInfo;
                        this._workspace = workspace;
                        this._sourceCredentials = sourceCredentials;
                        this._archiveCredentials = archiveCredentials;
                        this._status = Status.UNLOCKED;
                        this.type = sourceCredentials.type;
                    })
                    .catch(err => {
                        throw new VError(err, "Failed mapping credentials to a source");
                    });
            })
            .then(() => {
                this.emit("sourceUnlocked", this.description);
            })
            .catch(err => {
                this._status = Status.LOCKED;
                throw new VError(err, `Failed unlocking source: ${this.id}`);
            });
    }

    updateArchiveCredentials(masterPassword) {
        if (this.status !== SourceStatus.UNLOCKED) {
            return Promise.reject(
                new VError(`Failed updating archive credentials: Source is not unlocked: ${this.id}`)
            );
        }
        const credentials = createCredentials.fromPassword(masterPassword);
        // First update the credentials stored here
        this._archiveCredentials = credentials;
        // Then update the credentials in the workspace
        this.workspace.updatePrimaryCredentials(credentials);
        // Finally, dehydrate the source to save changes in the manager
        return (
            this.dehydrateSource(sourceID)
                // Save the workspace to push the new password to file
                .then(() => this.workspace.save())
        );
    }
}

ArchiveSource.Status = Status;

ArchiveSource.rehydrate = rehydrate;

module.exports = ArchiveSource;
