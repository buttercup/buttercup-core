const STORAGE_PREFIX = "bcup_archivecache_";

function getSourceOfflineArchive(storage, sourceID) {
    const sourceKey = `${STORAGE_PREFIX}${sourceID}`;
    return storage.getValue(sourceKey);
}

function sourceHasOfflineCopy(storage, sourceID) {
    return getSourceOfflineArchive(storage, sourceID).then(
        archiveContents => !!archiveContents && archiveContents.length > 0
    );
}

function storeSourceOfflineCopy(storage, sourceID, content) {
    const sourceKey = `${STORAGE_PREFIX}${sourceID}`;
    return storage.setValue(sourceKey, content);
}

module.exports = {
    getSourceOfflineArchive,
    sourceHasOfflineCopy,
    storeSourceOfflineCopy
};
