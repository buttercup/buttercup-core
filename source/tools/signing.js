(function(module) {

    "use strict";

    var BUTTERCUP_FORMAT = "buttercup/a",
        BUTTERCUP_SIGNATURE = "b~>" + BUTTERCUP_FORMAT;

    var lib = module.exports = {

        getFormat: function() {
            return BUTTERCUP_FORMAT;
        },

        getSignature: function() {
            return BUTTERCUP_SIGNATURE;
        },

        hasValidSignature: function(text) {
            return text.indexOf(BUTTERCUP_SIGNATURE) === 0;
        },

        sign: function(text) {
            return (lib.hasValidSignature(text)) ? text : BUTTERCUP_SIGNATURE + text;
        },

        stripSignature: function(text) {
            var sigLen = BUTTERCUP_SIGNATURE.length;
            return text.substr(sigLen, text.length - sigLen);
        }

    };

})(module);
