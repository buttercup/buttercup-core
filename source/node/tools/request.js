const { buildAxiosFetch } = require("@lifeomic/axios-fetch");
const axios = require("axios");
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
