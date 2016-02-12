(function(module) {

    "use strict";

    var PROPERTY_NOT_FOUND = new String("NOT_FOUND");

    function resolveProperty(data, key) {
        var keyParts = Array.isArray(key) ? key : key.split("."),
            prop = keyParts.shift();
        if (data.hasOwnProperty(prop)) {
            if (keyParts.length <= 0) {
                return data[prop];
            } else {
                return typeof data[prop] === "object" && data[prop] !== null ?
                    resolveProperty(data[prop], keyParts) :
                    PROPERTY_NOT_FOUND;
            }
        }
        return PROPERTY_NOT_FOUND;
    }

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

    var Model = function(data) {
        this._data = data || {};
    };

    Model.prototype.get = function(key, defaultValue) {
        var value = resolveProperty(this._data, key);
        return value === PROPERTY_NOT_FOUND ? defaultValue : value;
    };

    Model.prototype.getData = function() {
        return this._data;
    };

    Model.prototype.set = function(key, value) {
        setProperty(this._data, key, value);
        return this;
    };

    module.exports = Model;

})(module);
