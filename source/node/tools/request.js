const nodeFetch = require("node-fetch");

let __fetchMethod;

function getFetchMethod() {
    return __fetchMethod || nodeFetch;
}

function setFetchMethod(fn) {
    __fetchMethod = fn;
}

module.exports = {
    getFetchMethod,
    setFetchMethod
};
