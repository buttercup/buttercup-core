const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
require("@buttercup/app-env/web");
const { getSharedAppEnv } = require("@buttercup/app-env");

const { expect } = chai;

chai.use(chaiAsPromised);

Object.assign(window, {
    expect
});

getSharedAppEnv().getProperty("crypto/v1/setDerivationRounds")(10);
