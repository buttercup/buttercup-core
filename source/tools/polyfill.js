function objectValues(obj) {
    return Object
        .keys(obj)
        .map(key => obj[key]);
}

module.exports = {
    objectValues
};
