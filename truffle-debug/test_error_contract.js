var ErrorContract = artifacts.require("ErrorContract");

contract("Error Contract", function () {
  it("test the loop function", function () {
    var contract;

    return ErrorContract.deployed()
      .then(function (instance) {
        contract = instance;

        return contract.loop(1, { from: web3.eth.accounts[0] });
      })
      .then(function () {
        return contract.test.call();
      })
      .then(function (value) {
        assert.equal(value, 1);
      });
  });
});