var lib = require("__buttercup/module.js"),
  Westley = lib.Westley;

module.exports = {

  setUp: function(cb) {
    this.westley = new Westley();
    (cb)();
  },

  _getCommandForName: {

    cachesCommandWhenCalledTwice: function(test) {
      var testCommandKey = 'tgr';

      var firstCall = this.westley._getCommandForName(testCommandKey),
        secondCall = this.westley._getCommandForName(testCommandKey);

      firstCall.randomvariable = 'bla';

      test.strictEqual(firstCall.randomvariable, secondCall.randomvariable, "Randomly assigned variable is the same for both instances");
      test.done();
    },

    cachesCommandWhenCalledThrice: function(test) {
      var testCommandKey = 'tgr';

      var firstCall = this.westley._getCommandForName(testCommandKey),
        secondCall = this.westley._getCommandForName(testCommandKey),
        thirdCall = this.westley._getCommandForName(testCommandKey);

      firstCall.randomvariable = 'bla';

      test.strictEqual(firstCall.randomvariable, secondCall.randomvariable, "Randomly assigned variable is the same for first and second instance");
      test.strictEqual(firstCall.randomvariable, thirdCall.randomvariable, "Randomly assigned variable is the same for first and third instance");
      test.strictEqual(secondCall.randomvariable, thirdCall.randomvariable, "Randomly assigned variable is the same for second and third instance");
      test.done();
    }

  }

};
