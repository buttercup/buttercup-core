(function(module) {

    "use strict";

    var ManagedEntry = require("__buttercup/classes/ManagedEntry.js"),
        ManagedGroup = require("__buttercup/classes/ManagedGroup.js"),
        images = require("__buttercup/data/images.js");

    var ENTRY_DEFAULT_IMAGE =                   "key";

    /**
     * Design related tools
     * @module design
     */
    var design = module.exports = {

        getEntryImageDetails: function(entry) {
            if (entry && entry.getAttribute) {
                var imageName = entry.getAttribute(ManagedEntry.Attributes.Icon) || ENTRY_DEFAULT_IMAGE;
                return design.getImageData(imageName);
            }
            throw new Error("Invalid entry: unable to get entry image details");
        },

        getImageData: function(imageName) {
            var imageData = images[imageName];
            if (imageData) {
                return {
                    name: imageName,
                    image: imageData
                };
            } else {
                throw new Error("Invalid image: " + imageName);
            }
        },

        getImageNames: function() {
            return Object.keys(images);
        }

    };

})(module);
