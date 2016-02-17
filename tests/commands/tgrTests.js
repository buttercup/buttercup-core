module.exports = {
  failMe: {
    failmeplease: function(test) {
      test.fail();
      test.done();
    }
  }
};
