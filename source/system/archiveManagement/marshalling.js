"use strict";

const VError = require("verror");
const Archive = require("../Archive.js");
const Workspace = require("../Workspace.js");
const createCredentials = require("../credentials.js");
const DatasourceAdapter = require("../DatasourceAdapter.js");
const getArchiveList = require("../../tools/myButtercup/archive.js").getArchiveList;

function credentialsToDatasource(sourceCredentials) {
    const datasourceDescriptionRaw = sourceCredentials.getValueOrFail("datasource");
    const datasourceDescription = JSON.parse(datasourceDescriptionRaw);
    if (typeof datasourceDescription.type !== "string") {
        throw new VError("Failed creating datasources: Invalid or missing type");
    }
    // if (datasourceDescription.type === "mybuttercup") {
    //     if (typeof datasourceDescription.token !== "string") {
    //         throw new Error("Failed fetching archives: Invalid or missing access token");
    //     }
    //     return getArchiveList(datasourceDescription.token)
    //         .then(archives => archives.map(function(archiveInfo) {
    //             const singularCredentials = createCredentials("mybuttercup/archive");
    //             const singularDescriptionRaw = {
    //                 type: "mybuttercup/archive",
    //                 token: datasourceDescription.token,
    //                 archiveID: archiveInfo.id
    //             };
    //             singularCredentials.setValue("datasource", JSON.stringify(singularDescriptionRaw));
    //             return {
    //                 datasource: DatasourceAdapter.objectToDatasource(singularDescriptionRaw, singularCredentials),
    //                 credentials: singularCredentials,
    //                 name: archiveInfo.name
    //             };
    //         }));
    // }
    const datasource = DatasourceAdapter.objectToDatasource(datasourceDescription, sourceCredentials);
    return Promise.resolve({
        datasource,
        credentials: sourceCredentials
    });
}

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
