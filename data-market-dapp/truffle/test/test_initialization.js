var DataMarket = artifacts.require('DataMarket');

contract('Data Market Initialisation Test', function () {
  it("variable 'description' should be initialized 'leerer Feed'", function () {
    return DataMarket.deployed()
      .then(function (instance) {
        return instance.description.call();
      })
      .then(function (value) {
        assert.equal(value, 'leerer Feed');
      });
  });

  it("variable 'url' should be initialized ''", function () {
    return DataMarket.deployed()
      .then(function (instance) {
        return instance.url.call();
      })
      .then(function (value) {
        assert.equal(value, '');
      });
  });

  it("variable 'price' should be initialized 0", function () {
    return DataMarket.deployed()
      .then(function (instance) {
        return instance.price.call();
      })
      .then(function (value) {
        assert.equal(value, 0);
      });
  });

  it(
    "variable 'owner' should be initialized " + web3.eth.accounts[4],
    function () {
      return DataMarket.deployed()
        .then(function (instance) {
          return instance.owner.call();
        })
        .then(function (value) {
          assert.equal(value, web3.eth.accounts[4]);
        });
    },
  );
});
