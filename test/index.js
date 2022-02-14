const { expect } = require("chai");
const sinon = require("sinon");
const { init } = require("../dist/index.node.js");

let closed = false;

init(env => ({
    ...env,
    "env/v1/isClosedEnv": () => closed
}));

Object.assign(global, {
    expect,
    setClosedEnv: isClosed => {
        closed = isClosed;
    },
    sinon
});
