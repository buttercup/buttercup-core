const { expect } = require("chai");
const sinon = require("sinon");
const { init } = require("../dist/index.node.js");

init();

Object.assign(global, {
    expect,
    sinon
});
