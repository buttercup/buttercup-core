import { expect } from "chai";
import { init } from "../../source/index.web";
import { getSharedAppEnv } from "../../source/env/appEnv";

init();

Object.assign(window, {
    expect
});

getSharedAppEnv().getProperty("crypto/v1/setDerivationRounds")(10);
