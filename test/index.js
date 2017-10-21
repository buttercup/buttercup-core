const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const mocha = require("mocha");

const Buttercup = require("../source/node/index.js");
const iocane = require("iocane");

chai.use(chaiAsPromised);

Object.assign(
    global,
    {
        describe: mocha.describe,
        it: mocha.it,
        beforeEach: mocha.beforeEach,
        afterEach: mocha.afterEach,
        sinon: sinon,
        expect: chai.expect
    },
    Buttercup
);

iocane.config.setDerivedKeyIterationRange(10, 20);
