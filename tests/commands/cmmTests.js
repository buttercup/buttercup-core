var cmm = require("__buttercup/classes/commands/command.cmm.js");

module.exports = {
    setUp: function(cb) {
        this.command = new cmm();
        (cb)();
    },

    callbackInjected: {
        callsToCallback: function(test) {
            var callbackCalled = false;
            var callback = function(comment) {
                callbackCalled = true;
            };

            this.command.injectCommentCallback(callback);
            this.command.execute({}, "");

            test.strictEqual(callbackCalled, true, "Calls into callback");
            test.done();
        }
    }
};
