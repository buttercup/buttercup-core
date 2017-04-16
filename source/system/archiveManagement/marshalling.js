"use strict";

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

module.exports = {
    credentialsToDatasources,
    credentialsToSources
};
