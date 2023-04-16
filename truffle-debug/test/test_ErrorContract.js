var ErrorTestContract = artifacts.require('ErrorContract');

contract('Error Test Contract', function () {
  it('test the loop function', function () {
    var contract;
    return ErrorTestContract.deployed()
      .then(
        //Loop aufrufen
        function (instance) {
          contract = instance;
          return contract.loop(1);
        },
      )
      .then(
        //Test aufrufen
        function () {
          return contract.test.call();
        },
      )
      .then(
        //Wert Vergleichen
        function (value) {
          assert.equal(value, 1);
        },
      );
  });
});
