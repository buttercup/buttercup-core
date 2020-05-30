function assignObjImmutableProp(obj, name, method) {
    Object.defineProperty(obj, name, {
        value: method,
        writable: false,
        configurable: false,
        enumerable: false
    });
}

module.exports = {
    assignObjImmutableProp
};
