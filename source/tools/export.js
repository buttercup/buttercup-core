
module.exports = {

    /**
     * Export an archive to Buttercup format
     * @param {Archive} archive The archive to export
     * @returns {Object} The exported object
     */
    exportArchiveToJSON: function(archive) {
        return {
            exported: Date.now(),
            format: archive.getFormat(),
            groups: archive
                .getGroups()
                .map((group) => group.toObject())
        };
    }

};
