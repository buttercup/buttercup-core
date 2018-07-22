const VError = require("verror");
const { TextDatasource, registerDatasource } = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");
const { getSharedClient } = require("./MyButtercupClient.js");
const { generateNewUpdateID } = require("./helpers.js");
const { generateRandomString } = require("../tools/random.js");

class MyButtercupDatasource extends TextDatasource {
    constructor(token, archiveID) {
        super();
        this._token = token;
        this._archiveID = archiveID;
        this._updateID = null;
        this._rootArchiveID = null;
    }

    load(masterAccountCredentials) {
        const client = getSharedClient();
        return client
            .updateDigest(this._token, masterAccountCredentials)
            .then(({ rootArchiveID }) => {
                this._rootArchiveID = rootArchiveID;
                return client.fetchArchive(this._token, rootArchiveID, this._archiveID);
            })
            .then(({ archive, masterPassword, updateID }) => {
                this._updateID = updateID;
                this.setContent(archive);
                return super.load(Credentials.fromPassword(masterPassword));
            });
    }

    save(history, masterAccountCredentials) {
        const client = getSharedClient();
        const isNew = !this._archiveID;
        return this._getArchiveCredentials(masterAccountCredentials)
            .then(privateCredentials => super.save(history, privateCredentials))
            .then(encryptedContents => {
                return client
                    .updateDigest(this._token, masterAccountCredentials)
                    .then(({ rootArchiveID, personalOrgID }) =>
                        client.writeArchive({
                            token: this._token,
                            rootArchiveID,
                            archiveID: this._archiveID,
                            encryptedContents,
                            updateID: isNew ? generateNewUpdateID() : this._updateID,
                            newUpdateID: isNew ? null : generateNewUpdateID(),
                            masterAccountCredentials,
                            isNew,
                            isRoot: false,
                            // @todo this will have to point dynamically:
                            organisationID: personalOrgID
                        })
                    );
            })
            .then(({ updateID, archiveID }) => {
                this._updateID = updateID;
                this._archiveID = archiveID;
                if (isNew) {
                    // update the entry in the root archive
                    return this._updateNewArchiveID(archiveID, masterAccountCredentials).then(() =>
                        client.saveRootArchive(this._token, this._rootArchiveID, masterAccountCredentials)
                    );
                }
            });
    }

    _getArchiveCredentials(masterAccountCredentials) {
        const isNew = !this._archiveID;
        const generateRandomString = getRandomStringGenerator();
        const client = getSharedClient();
        if (isNew) {
            // generate and save new creds for a new archive
            return generateRandomString(32)
                .then(newPassword => Credentials.fromPassword(newPassword))
                .then(newCreds => {
                    return client
                        .updateDigest(this._token, masterAccountCredentials)
                        .then(({ rootArchiveID }) => {
                            this._rootArchiveID = rootArchiveID;
                            const { archive } = client.rootArchives[rootArchiveID];
                            let [archivesGroup] = archive.findGroupsByTitle("archives");
                            if (!archivesGroup) {
                                archivesGroup = archive.createGroup("archives");
                            }
                            // delete old entries
                            const newEntries = archivesGroup.findEntriesByProperty("title", "__new_archive__");
                            newEntries.forEach(entry => {
                                entry.delete();
                            });
                            // create placeholder entry
                            const placeholder = archivesGroup.createEntry("__new_archive__");
                            placeholder.setProperty("password", newCreds.password);
                        })
                        .then(() => client.saveRootArchive(this._token, this._rootArchiveID, masterAccountCredentials))
                        .then(() => newCreds);
                });
        }
        // fetch old creds
        return client
            .loadRootArchive(this._token, this._rootArchiveID, masterAccountCredentials)
            .then(({ archive }) => {
                const [archivesGroup] = archive.findGroupsByTitle("archives");
                if (!archivesGroup) {
                    throw new VError("No archives group found in root archive");
                }
                const [targetEntry] = archivesGroup.findEntriesByProperty("title", this._archiveID);
                if (!targetEntry) {
                    throw new VError("No associated root entry found for loaded archive");
                }
                return Credentials.fromPassword(targetEntry.getProperty("password"));
            })
            .catch(err => {
                throw new VError(err, "Failed fetching credentials for MyButtercup archive");
            });
    }

    _updateNewArchiveID(archiveID, masterAccountCredentials) {
        const client = getSharedClient();
        return client
            .loadRootArchive(this._token, this._rootArchiveID, masterAccountCredentials)
            .then(({ archive }) => {
                const [archivesGroup] = archive.findGroupsByTitle("archives");
                if (!archivesGroup) {
                    throw new VError("No archives group found in root archive");
                }
                const targetEntries = archivesGroup.findEntriesByProperty("title", "__new_archive__");
                if (targetEntries.length > 1) {
                    throw new VError("More than 1 pending new archives found");
                }
                const [targetEntry] = targetEntries;
                if (!targetEntry) {
                    throw new VError("No associated root entry found for new archive");
                }
                targetEntry.setProperty("title", archiveID.toString());
            })
            .catch(err => {
                throw new VError(err, "Failed updating credentials for MyButtercup archive");
            });
    }
}

registerDatasource("mybuttercup", MyButtercupDatasource);

module.exports = MyButtercupDatasource;
