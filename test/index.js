const { expect } = require("chai");
const sinon = require("sinon");
const { init } = require("../source/index.node.js");

init();

Object.assign(global, {
    expect,
    sinon
});
