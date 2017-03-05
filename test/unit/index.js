"use strict";

var chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    sinon = require("sinon"),
    mocha = require("mocha");

var Buttercup = require("../../source/module.js");

chai.use(chaiAsPromised);

Object.assign(
    global,
    {
        describe:           mocha.describe,
        it:                 mocha.it,
        beforeEach:         mocha.beforeEach,
        afterEach:          mocha.afterEach,
        sinon:              sinon,
        expect:             chai.expect
    },
    Buttercup
);
