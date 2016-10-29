"use strict";

module.exports = {

    isArray: function(item) {
        return Object.prototype.toString.call(item) === "[object Array]";
    }

};
