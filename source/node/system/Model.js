"use strict";

/**
 * @type {String}
 * @private
 * @static
 */
const PROPERTY_NOT_FOUND = new String("NOT_FOUND"); //eslint-disable-line no-new-wrappers

/**
 * Resolve a property on an object (key resolution)
 * @param {Object} data The object to resolve on
 * @param {string} key The key to resolve on data
 * @returns {string|*} Returns the found property value, or PROPERTY_NOT_FOUND
 * @private
 * @static
 * @memberof Model
 */
function resolveProperty(data, key) {
    var keyParts = Array.isArray(key) ? key : key.split("."),
        prop = keyParts.shift();
    if (data.hasOwnProperty(prop)) {
        if (keyParts.length <= 0) {
            return data[prop];
        } else {
            return typeof data[prop] === "object" && data[prop] !== null
                ? resolveProperty(data[prop], keyParts)
                : PROPERTY_NOT_FOUND;
        }
    }
    return PROPERTY_NOT_FOUND;
}

/**
 * Set a property value
 * @param {Object} data The object to set a property on
 * @param {string} key The key to set
 * @param {*} value The value to set
 * @memberof Model
 * @private
 * @static
 */
function setProperty(data, key, value) {
    var keyParts = Array.isArray(key) ? key : key.split("."),
        prop = keyParts.shift();
    if (keyParts.length > 0) {
        data[prop] = typeof data[prop] === "object" ? data[prop] : {};
        setProperty(data[prop], keyParts, value);
    } else {
        data[prop] = value;
    }
}

/**
 * Data modelling helper
 * @class Model
 * @param {Object} data
 */
class Model {
    constructor(data) {
        this._data = data || {};
    }

    /**
     * Get a value for a property.
     *  eg. model.get("some.deep.property", 19);
     * @param {string} key The key to get the value for. Splits by period '.' for sub-objects.
     * @param {*=} defaultValue A default value to return if the property is not found
     * @returns {*}
     * @memberof Model
     * @public
     * @instance
     */
    get(key, defaultValue) {
        var value = resolveProperty(this.getData(), key);
        return value === PROPERTY_NOT_FOUND ? defaultValue : value;
    }

    /**
     * Get the wrapped object
     * @returns {Object}
     * @memberof Model
     * @public
     * @instance
     */
    getData() {
        return this._data;
    }

    /**
     * Set a property
     * @param {string} key The location (property) at which to set a value (eg. "some.nested.prop")
     * @param {string|number|Object|*} value The value to set
     * @returns {Model} Returns self
     * @memberof Model
     * @public
     * @instance
     */
    set(key, value) {
        setProperty(this._data, key, value);
        return this;
    }
}

module.exports = Model;
