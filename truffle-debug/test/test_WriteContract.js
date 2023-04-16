var WriteTestContract = artifacts.require('WriteContract');

contract('Write Test Contract', function () {
  it("Variable test == 'beforeChange'", function () {
    return WriteTestContract.deployed()
      .then(
        //Variable aufrufen
        function (instance) {
          return instance.test.call();
        },
      )
      .then(
        //Variable vergleichen
        function (value) {
          assert.equal(
            value,
            'beforeChange',
            "Variable 'test' war nicht 'beforeChange'" + 'test: ' + value,
          );
        },
      );
  });

  it("Variable wird zu 'afterChange' geändert", function () {
    var contract;
    return WriteTestContract.deployed()
      .then(
        //Account abfragen
        function (instance) {
          contract = instance;
          return web3.eth.personal.getAccounts();
        },
      )
      .then(
        //Wort ändern
        function (accounts) {
          return contract.changeWord('afterChange', { from: accounts[0] });
        },
      )
      .then(
        //Wort aufrufen
        function () {
          return contract.test.call();
        },
      )
      .then(
        //Wort vergleichen
        function (value) {
          assert.equal(
            value,
            'afterChange',
            "variable 'test' was not 'foo'",
            "'test' was:" + value,
          );
        },
      );
  });
});
