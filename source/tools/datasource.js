module.exports = {

    /**
     * Extract the datasource properties from an exported string
     * @param {string} dsString The exported string from `toString()`
     * @returns {Object} All properties in an object
     */
    extractDSStrProps: function(dsString) {
        let items = dsString.split(","),
            obj = {};
        items.forEach(function(item) {
            let parts = item.split("=");
            obj[parts[0]] = parts[1];
        });
        return obj;
    }

};
