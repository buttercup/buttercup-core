const { expect } = require("chai");
const { init } = require("../../source/index.web.js");
const { getSharedAppEnv } = require("../../source/env/appEnv.js");

init();

Object.assign(window, {
    expect
});

getSharedAppEnv().getProperty("crypto/v1/setDerivationRounds")(10);
