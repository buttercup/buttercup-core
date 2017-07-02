var lib = require("../source/module.js");
var Westley = lib.Westley;

module.exports = {

    setUp: function(cb) {
        this.westley = new Westley();
        cb();
    },

    _getCommandForName: {

        cachesCommandWhenCalledTwice: function(test) {
            var testCommandKey = 'tgr';

            var firstCall = this.westley._getCommandForKey(testCommandKey),
                secondCall = this.westley._getCommandForKey(testCommandKey);

            firstCall.randomvariable = 'bla';

            test.strictEqual(firstCall.randomvariable,
                secondCall.randomvariable,
                "Randomly assigned variable is the same for both instances");

            test.done();
        },

        cachesCommandWhenCalledThrice: function(test) {
            var testCommandKey = 'tgr';

            var firstCall = this.westley._getCommandForKey(testCommandKey),
                secondCall = this.westley._getCommandForKey(testCommandKey),
                thirdCall = this.westley._getCommandForKey(testCommandKey);

            firstCall.randomvariable = 'bla';

            test.strictEqual(firstCall.randomvariable,
                secondCall.randomvariable,
                "Randomly assigned variable is the same for first and second instance");

            test.strictEqual(firstCall.randomvariable,
                thirdCall.randomvariable,
                "Randomly assigned variable is the same for first and third instance");

            test.strictEqual(secondCall.randomvariable,
                thirdCall.randomvariable,
                "Randomly assigned variable is the same for second and third instance");

            test.done();
        }

    },

    execute: {

        emitsAnEventWhenExecuted: function(test) {
            this.westley.on("commandExecuted", test.done);
            this.westley.execute("cgr 0 1");
        }

    }

};
