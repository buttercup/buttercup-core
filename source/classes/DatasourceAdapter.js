"use strict";

var __datasources = {};

var adapter = module.exports = {

    /**
     * Create a datasource from an object
     * The object must have the required properties (as output by the corresponding
     * `toObject` call of the datasource).
     * @param {Object} obj The object
     * @param {Credentials=} hostCredentials Credentials instance for remote host
     *  authentication (not required for File/Text datasources)
     * @returns {null|TextDatasource} A datasource instance or null of none found
     */
    objectToDatasource: function(obj, hostCredentials) {
        let { type } = obj;
        if (!type) {
            throw new Error("No type specified");
        }
        let DSClass = __datasources[type];
        if (DSClass && DSClass.fromObject) {
            return DSClass.fromObject(obj, hostCredentials);
        }
        return null;
    },

    /**
     * Register a new datasource
     * This is called internally by the built-in datasources, but should be called if a
     * custom datasource is used.
     * @param {String} datasourceType The name (slug) of the datasource
     * @param {Object} DSClass The class for the new datasource
     * @throws {Error} Throws if the `datasourceType` has already been registered
     */
    registerDatasource: function(datasourceType, DSClass) {
        if (__datasources[datasourceType]) {
            throw new Error("Datasource already registered: " + datasourceType);
        }
        __datasources[datasourceType] = DSClass;
    },

    /**
     * Create a datasource from a string
     * @see objectToDatasource
     * @param {String} str The string representation of a datasource, as output by
     *  the `toString` method on the corresponding datasource
     * @param {Credentials=} hostCredentials The remote authentication credentials
     * @returns {null|TextDatasource} A new datasource instance or null of not found
     */
    stringToDatasource: function(str, hostCredentials) {
        return adapter.objectToDatasource(JSON.parse(str), hostCredentials);
    }

};
