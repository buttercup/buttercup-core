const { getCredentials } = require("../credentials/channel.js");
const Credentials = require("../credentials/Credentials.js");

const __datasources = {};
const __datasourceFlags = {};
const __postHandlers = [];

/**
 * Convert a Credentials instance to a Datasource
 * @param {Credentials} credentials A Credentials instance that
 *  contains a datasource configuration
 * @returns {TextDatasource}
 * @throws {Error} Throws if no datasource configuration in
 *  credentials
 * @throws {Error} Throws if no type specified in datasource
 *  configuration
 * @throws {Error} Throws if no datasource found for type
 * @private
 */
function credentialsToDatasource(credentials) {
    const { datasource } = getCredentials(credentials.id).data;
    if (!datasource) {
        throw new Error("No datasource configuration in credentials");
    }
    const { type } = datasource;
    if (!type) {
        throw new Error("No datasource type specified in datasource configuration");
    }
    const DSClass = __datasources[type];
    if (!DSClass) {
        throw new Error(`No datasource found for type: ${type}`);
    }
    return new DSClass(prepareDatasourceCredentials(credentials));
}

/**
 * Execute all datasource postprocessors
 * @param {TextDatasource} datasource The datasource instance
 * @private
 */
function fireInstantiationHandlers(type, datasource) {
    __postHandlers.forEach(handler => {
        try {
            handler(type, datasource);
        } catch (err) {
            console.error("Failed executing a datasource instantiation handler for a datasource");
            console.error(err);
        }
    });
}

/**
 * Prepare credentials for passing to a datasource
 * (from VaultSource)
 * @param {Credentials} credentials
 * @returns {Credentials|UnwrappedCredentials}
 * @private
 */
function prepareDatasourceCredentials(credentials, typeOverride = null) {
    const {
        data: { datasource },
        masterPassword
    } = getCredentials(credentials.id);
    const datasourceType = typeOverride || datasource.type || "";
    const { open = false } = __datasourceFlags[datasourceType] || {};
    if (!open) {
        return credentials;
    }
    const newCreds = Credentials.fromCredentials(credentials, masterPassword);
    const newCredPayload = getCredentials(newCreds.id);
    newCredPayload.open = true;
    return newCreds;
}

/**
 * Register a new datasource
 * This is called internally by the built-in datasources, but should be called if a
 * custom datasource is used.
 * @param {String} datasourceType The name (slug) of the datasource
 * @param {Object} DSClass The class for the new datasource
 * @memberof module:Buttercup
 */
function registerDatasource(datasourceType, DSClass, flags = {}) {
    if (__datasources[datasourceType]) {
        throw new Error(`Datasource already registered for type: ${datasourceType}`);
    }
    __datasources[datasourceType] = DSClass;
    __datasourceFlags[datasourceType] = flags;
}

/**
 * @typedef {Object} RegisterDatasourcePostProcessorResult
 * @property {Function} remove - Function to call to remove the handler
 */

/**
 * Register a post-processor for a datasource being instantiated
 * @param {Function} callback The callback to execute with the instantiated datasource
 * @returns {RegisterDatasourcePostProcessorResult} The result of the registration
 * @private
 */
function registerDatasourcePostProcessor(callback) {
    __postHandlers.push(callback);
    return {
        remove: () => {
            const ind = __postHandlers.indexOf(callback);
            if (ind >= 0) {
                __postHandlers.splice(ind, 1);
            }
        }
    };
}

module.exports = {
    credentialsToDatasource,
    fireInstantiationHandlers,
    prepareDatasourceCredentials,
    registerDatasource,
    registerDatasourcePostProcessor
};
