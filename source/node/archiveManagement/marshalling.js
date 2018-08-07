const VError = require("verror");
const { objectToDatasource } = require("@buttercup/datasources");
const Credentials = require("@buttercup/credentials");
const Archive = require("../Archive.js");
const Workspace = require("../Workspace.js");

/**
 * Convert credentials of a remote archive to a datasource
 * @param {Credentials} sourceCredentials The remote credentials. The credentials must
 *  have a type field and datasource information field
 * @returns {Promise.<{datasource, credentials}>} A promise that resolves with the datasource and
 *  source credentials
 */
function credentialsToDatasource(sourceCredentials) {
    return Promise.resolve()
        .then(function() {
            const datasourceDescriptionRaw = sourceCredentials.getValueOrFail("datasource");
            const datasourceDescription = JSON.parse(datasourceDescriptionRaw);
            if (typeof datasourceDescription.type !== "string") {
                throw new VError("Invalid or missing type");
            }
            const datasource = objectToDatasource(datasourceDescription, sourceCredentials);
            return {
                datasource,
                credentials: sourceCredentials
            };
        })
        .catch(function __handleCreationError(err) {
            throw new VError(err, "Failed creating datasources");
        });
}

/**
 * Convert credentials to a source for the ArchiveManager
 * @param {Credentials} sourceCredentials The remote archive credentials
 * @param {Credentials} archiveCredentials Credentials for unlocking the archive
 * @param {Boolean=} initialise Whether or not to initialise a new archive (defaults to false)
 * @param {String=} contentOverride Content for overriding the fetch operation in the
 *  datasource, for loading offline content
 * @returns {Promise.<Object>} A promise that resolves with an object containing a workspace,
 *  the source credentials and archive credentials
 */
function credentialsToSource(sourceCredentials, archiveCredentials, initialise = false, contentOverride = null) {
    return credentialsToDatasource(sourceCredentials)
        .then(function __handleInitialisation(result) {
            const datasource = result.datasource;
            const defaultArchive = Archive.createWithDefaults();
            if (typeof contentOverride === "string") {
                datasource.setContent(contentOverride);
            }
            return initialise
                ? datasource.save(defaultArchive.getHistory(), archiveCredentials).then(() =>
                      Object.assign(
                          {
                              archive: defaultArchive
                          },
                          result
                      )
                  )
                : datasource
                      .load(archiveCredentials)
                      .then(history => Archive.createFromHistory(history))
                      .then(archive =>
                          Object.assign(
                              {
                                  archive
                              },
                              result
                          )
                      );
        })
        .then(function __datasourceToSource(result) {
            const workspace = new Workspace();
            workspace.setArchive(result.archive, result.datasource, archiveCredentials);
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
