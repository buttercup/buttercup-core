const { assignObjImmutableProp } = require("./prop.js");

/**
 * @typedef {Object} AppEnv
 */

/**
 * Internal private API
 * @typedef {Object} AppEnvIntPrv
 * @property {Object} properties Index of set environment properties
 */

/**
 * @typedef {Object} GetPropertyOptions
 * @property {*=} defaultValue The default value to return (default: null)
 * @property {Boolean=} failIfNotExist Fail if the property doesn't exist (default: true)
 */

/**
 * Get a property from the environment
 * @param {String} propertyName The property to fetch
 * @param {GetPropertyOptions=} options
 * @this AppEnvIntPrv
 * @returns {*}
 * @name getProperty
 * @memberof AppEnv
 */
function __getProperty(propertyName, options = {}) {
    const { defaultValue = null, failIfNotExist = true } = options;
    if (typeof this.properties[propertyName] !== "undefined") {
        return this.properties[propertyName];
    }
    if (failIfNotExist) {
        throw new Error(`Unable to get application environment property: '${propertyName}' does not exist`);
    }
    return defaultValue;
}

/**
 * Detect if the environment has a property set
 * @param {String} propertyName The property to check
 * @this AppEnvIntPrv
 * @returns {Boolean} True if the property has been set
 * @name hasProperty
 * @memberof AppEnv
 */
function __hasProperty(propertyName) {
    return typeof this.properties[propertyName] !== "undefined";
}

/**
 * Set several properties on the environment
 * @param {Object<String, Function|*>} propertyList The items to set
 * @this AppEnvIntPrv
 * @name setProperties
 * @memberof AppEnv
 * @see setProperty
 */
function __setProperties(propertyList) {
    const setProp = __setProperty.bind(this);
    for (const propertyName in propertyList) {
        setProp(propertyName, propertyList[propertyName]);
    }
}

/**
 * Set a property on the environment
 * @param {String} propertyName The property to set
 * @param {Function|*} propertyValue The value to set
 * @this AppEnvIntPrv
 * @name setProperty
 * @memberof AppEnv
 */
function __setProperty(propertyName, propertyValue) {
    if (typeof this.properties[propertyName] !== "undefined") {
        throw new Error(`Unable to set application environment property: '${propertyName}' already exists`);
    }
    assignObjImmutableProp(this.properties, propertyName, propertyValue);
}

/**
 * Create a new application environment
 * @returns {AppEnv}
 */
function createAppEnv() {
    const env = {};
    const privateEnv = {
        properties: {}
    };
    assignObjImmutableProp(env, "getProperty", __getProperty.bind(privateEnv));
    assignObjImmutableProp(env, "hasProperty", __hasProperty.bind(privateEnv));
    assignObjImmutableProp(env, "setProperties", __setProperties.bind(privateEnv));
    assignObjImmutableProp(env, "setProperty", __setProperty.bind(privateEnv));
    return env;
}

module.exports = {
    createAppEnv
};
