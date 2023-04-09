var DataMarket = artifacts.require("DataMarket");

contract("Data Market Write Methods Test", function () {
  it(
    "variable 'description' should be changed from 'leerer Feed' to 'test' by " +
      web3.eth.accounts[4],
    function () {
      var contract;
      return DataMarket.deployed()
        .then(function (instance) {
          contract = instance;

          // query value of variable description
          return contract.description.call();
        })
        .then(function (value) {
          // check if variable description is 'leerer Feed'
          assert.equal(value, "leerer Feed");

          // try to change the value of variable description to 'test'
          return contract.setDescription("test", {
            from: web3.eth.accounts[4],
          });
        })
        .then(function () {
          // query value of variable description
          return contract.description.call();
        })
        .then(function (value) {
          // check if variable description is now 'test'
          assert.equal(value, "test");
        });
    }
  );

  it(
    "variable 'description' should NOT be changed from 'test' to 'test2' by " +
      web3.eth.accounts[3],
    function () {
      var contract;
      return DataMarket.deployed()
        .then(function (instance) {
          contract = instance;

          // query value of variable description
          return contract.description.call();
        })
        .then(function (value) {
          // check if variable description is 'test'
          assert.equal(value, "test");

          // try to change the value of variable description to 'test2' from account[3]
          return contract.setDescription("test2", {
            from: web3.eth.accounts[3],
          });
        })
        .then(function () {
          // !Important! the test should never reach this line because the modfier should throw an exception
          assert.equal(1, 0, "Error: No Exception was thrown");

          // here is the error handler for the exception
        })
        .catch(function () {
          // query value of variable description
          return contract.description.call();
        })
        .then(function (value) {
          // check if variable description still is 'test' and didn't change
          assert.equal(value, "test");
        });
    }
  );
});
