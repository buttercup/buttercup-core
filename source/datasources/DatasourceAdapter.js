const __datasources = {};
const __postHandlers = [];

/**
 * Execute all datasource postprocessors
 * @param {TextDatasource} datasource The datasource instance
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
 * Create a datasource from an object
 * The object must have the required properties (as output by the corresponding
 * `toObject` call of the datasource).
 * @param {Object} obj The object
 * @param {Credentials=} hostCredentials Credentials instance for remote host
 *  authentication (not required for File/Text datasources)
 * @returns {null|TextDatasource} A datasource instance or null of none found
 * @public
 */
function objectToDatasource(obj, hostCredentials) {
    const { type } = obj;
    if (!type) {
        throw new Error("No type specified");
    }
    const DSClass = __datasources[type];
    if (DSClass && DSClass.fromObject) {
        return DSClass.fromObject(obj, hostCredentials);
    }
    return null;
}

/**
 * Register a new datasource
 * This is called internally by the built-in datasources, but should be called if a
 * custom datasource is used.
 * @param {String} datasourceType The name (slug) of the datasource
 * @param {Object} DSClass The class for the new datasource
 * @public
 */
function registerDatasource(datasourceType, DSClass) {
    __datasources[datasourceType] = DSClass;
}

/**
 * @typedef {Object} RegisterDatasourcePostProcessorResult
 * @property {Function} remove - Function to call to remove the handler
 */

/**
 * Register a post-processor for a datasource being instantiated
 * @param {Function} callback The callback to execute with the instantiated datasource
 * @returns {RegisterDatasourcePostProcessorResult} The result of the registration
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

/**
 * Create a datasource from a string
 * @see objectToDatasource
 * @param {String} str The string representation of a datasource, as output by
 *  the `toString` method on the corresponding datasource
 * @param {Credentials=} hostCredentials The remote authentication credentials
 * @returns {null|TextDatasource} A new datasource instance or null of not found
 * @public
 */
function stringToDatasource(str, hostCredentials) {
    return objectToDatasource(JSON.parse(str), hostCredentials);
}

module.exports = {
    fireInstantiationHandlers,
    objectToDatasource,
    registerDatasource,
    registerDatasourcePostProcessor,
    stringToDatasource
};
