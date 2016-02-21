(function(module) {

    "use strict";

    var EntryProperty = {
        Password:                     "password",
        Title:                         "title",
        Username:                     "username"
    };

    module.exports = {

        getValidProperties: function() {
            var props = [];
            for (var keyName in EntryProperty) {
                if (EntryProperty.hasOwnProperty(keyName)) {
                    props.push(EntryProperty[keyName]);
                }
            }
            return props;
        },

        isValidProperty: function(name) {
            for (var keyName in EntryProperty) {
                if (EntryProperty.hasOwnProperty(keyName)) {
                    if (EntryProperty[keyName] === name) {
                        return true;
                    }
                }
            }
            return false;
        }

    };

})(module);
