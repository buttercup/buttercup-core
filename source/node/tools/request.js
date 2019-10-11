const axios = require("axios");
const { buildAxiosFetch } = require("./axios-fetch");
const nodeFetch = buildAxiosFetch(axios);

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
