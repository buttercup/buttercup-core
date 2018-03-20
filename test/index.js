const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const iocane = require("iocane");

const { expect } = chai;

chai.use(chaiAsPromised);

Object.assign(global, {
    expect,
    sinon
});

iocane.config.setDerivedKeyIterationRange(10, 20);
