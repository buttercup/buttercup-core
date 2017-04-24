"use strict";

const VError = require("verror");
const Archive = require("../Archive.js");
const Workspace = require("../Workspace.js");
const createCredentials = require("../credentials.js");
const DatasourceAdapter = require("../DatasourceAdapter.js");
const getArchiveList = require("../../tools/myButtercup/archive.js").getArchiveList;

/**
 * Convert credentials of a remote archive to a datasource
 * @param {Credentials} sourceCredentials The remote credentials. The credentials must
 *  have a type field and datasource information field
 * @returns {Promise.<{datasource, credentials}>} A promise that resolves with the datasource and
 *  source credentials
 */
function credentialsToDatasource(sourceCredentials) {
    const datasourceDescriptionRaw = sourceCredentials.getValueOrFail("datasource");
    const datasourceDescription = JSON.parse(datasourceDescriptionRaw);
    if (typeof datasourceDescription.type !== "string") {
        throw new VError("Failed creating datasources: Invalid or missing type");
    }
    const datasource = DatasourceAdapter.objectToDatasource(datasourceDescription, sourceCredentials);
    return Promise.resolve({
        datasource,
        credentials: sourceCredentials
    });
}

/**
 * Convert credentials to a source for the ArchiveManager
 * @param {Credentials} sourceCredentials The remote archive credentials
 * @param {Credentials} archiveCredentials Credentials for unlocking the archive
 * @param {Boolean=} initialise Whether or not to initialise a new archive (defaults to false)
 * @returns {Promise.<Object>} A promise that resolves with an object containing a workspace,
 *  the source credentials and archive credentials
 */
function credentialsToSource(sourceCredentials, archiveCredentials, initialise = false) {
    return credentialsToDatasource(sourceCredentials)
        .then(function __handleInitialisation(result) {
            const datasource = result.datasource;
            const defaultArchive = Archive.createWithDefaults();
            return initialise ?
                datasource
                    .save(defaultArchive, archiveCredentials)
                    .then(() => Object.assign(
                        {
                            archive: defaultArchive
                        },
                        result
                    )) :
                datasource
                    .load(archiveCredentials)
                    .then(archive => Object.assign(
                        {
                            archive
                        },
                        result
                    ));
        })
        .then(function __datasourceToSource(result) {
            const workspace = new Workspace();
            workspace.setPrimaryArchive(result.archive, result.datasource, result.credentials);
            return {
                workspace,
                sourceCredentials,
                archiveCredentials
            };
        });
}

module.exports = {
    credentialsToDatasource,
    credentialsToSource
};
