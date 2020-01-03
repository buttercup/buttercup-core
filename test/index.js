const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
require("@buttercup/app-env/native");
const { getSharedAppEnv } = require("@buttercup/app-env");

const { expect } = chai;

chai.use(chaiAsPromised);

Object.assign(global, {
    expect,
    sinon
});

getSharedAppEnv().getProperty("crypto/v1/setDerivationRounds")(10);
