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

// var context = require.context('./', true, /\.spec\.js$/);
// context
//     .keys()
//     .forEach(filename => {
//         const ns =
//             filename
//             .replace(/^\.\//, '')
//             .replace(/\.spec\.js$/, '');
//         describe(ns, () => {
//             context(filename);
//         });
//     });
