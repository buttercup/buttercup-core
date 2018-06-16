const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const { configure } = require("iocane");

const { expect } = chai;

chai.use(chaiAsPromised);

Object.assign(global, {
    expect,
    sinon
});

configure().setDerivationRounds(10);
