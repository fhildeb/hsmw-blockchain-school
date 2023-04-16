var DataMarket = artifacts.require('DataMarket');

contract('Data Market Buy Method Test', function () {
  var etherInContract;
  var etherInAccount;
  var gas;
  var contract;
  var testDataPrice = web3.toWei(2, 'finney');
  var testGasPrice = web3.toWei(2, 'Gwei');

  it('sending the required amount of ether swiches entry in buyers mapping from false to true', function () {
    return DataMarket.deployed()
      .then(function (instance) {
        contract = instance;

        // set variable price to new value
        return contract.setPrice(testDataPrice, { from: web3.eth.accounts[4] });
      })
      .then(function () {
        // query value of variable price
        return contract.price.call();
      })
      .then(function (value) {
        // check if price has changed to value of testDataPrice
        assert.equal(value, testDataPrice);

        // query value of mapping buyers of account[5]
        return contract.buyers.call(web3.eth.accounts[5]);
      })
      .then(function (value) {
        // check if value of mapping buyers of account[5] is false
        assert.equal(value, false);

        // store amount of ether in contract before "buyData" is called
        etherInContract = web3.eth.getBalance(contract.address);

        // store amount of ether in account[5] before "buyData" is called
        etherInAccount = web3.eth.getBalance(web3.eth.accounts[5]);

        // send 1 ether to the contract
        return contract.buyData({
          from: web3.eth.accounts[5],
          value: testDataPrice,
          gasPrice: testGasPrice,
        });
      })
      .then(function (trx) {
        // store the amount of gas used in transaction
        gas = trx.receipt.gasUsed;

        // query value of mapping buyers of account[5]
        return contract.buyers.call(web3.eth.accounts[5]);
      })
      .then(function (value) {
        // check if value of mapping buyers of account[5] is true
        assert.equal(value, true);
      });
  });

  it('sending the required amount of ether increases the amount of ether in the contract by that number', function () {
    assert.equal(
      etherInContract.plus(testDataPrice).toString(),
      web3.eth.getBalance(contract.address).toString(),
    );
  });

  it('sending the required amount of ether decreases the amount of ether in senders account by that number plus transaction costs', function () {
    let trxCost = web3.toBigNumber(testGasPrice).times(gas);
    assert.equal(
      etherInAccount.minus(testDataPrice).minus(trxCost).toString(),
      web3.eth.getBalance(web3.eth.accounts[5]).toString(),
    );
  });

  it("sending the wroung amount of ether doesn't change entry in buyers mapping from false to true", function () {
    // query value of mapping buyers of account[6]
    return contract.buyers
      .call(web3.eth.accounts[6])
      .then(function (value) {
        // check if value of mapping buyers of account[6] is false
        assert.equal(value, false);

        // query value of variable price
        return contract.price.call();
      })
      .then(function (value) {
        // assert that new test price differs from variable price in contract
        let wrongTestPrice = web3.toWei(1, 'finney');
        assert.notEqual(wrongTestPrice, value.toString());

        // store amount of ether in contract before "buyData" is called
        etherInContract = web3.eth.getBalance(contract.address);

        // store amount of ether in account[5] before "buyData" is called
        etherInAccount = web3.eth.getBalance(web3.eth.accounts[6]);

        // try to buy data with wrong amount of ether
        return contract.buyData({
          from: web3.eth.accounts[6],
          value: wrongTestPrice,
          gasPrice: testGasPrice,
        });
      })
      .then(function () {
        // !Important! the test should never reach this line because the require line should throw an exception
        assert.equal(1, 0, 'Error: No Exception was thrown');

        // here is the error handler for the exception
      })
      .catch(function (e) {
        gas = e.receipt.gasUsed;

        // query value of mapping buyers of account[6]
        return contract.buyers.call(web3.eth.accounts[6]);
      })
      .then(function (value) {
        // check if value of mapping buyers of account[6] is still false
        assert.equal(value, false);
      });
  });

  it("sending the wrong amount of ether doesn't increases the amount of ether in the contract by that number", function () {
    assert.equal(
      etherInContract.toString(),
      web3.eth.getBalance(contract.address).toString(),
    );
  });

  it("sending the required amount of ether doesn't decreases the amount of ether in senders account by that number plus transaction costs", function () {
    let trxCost = web3.toBigNumber(testGasPrice).times(gas);
    assert.equal(
      etherInAccount.minus(trxCost).toString(),
      web3.eth.getBalance(web3.eth.accounts[6]).toString(),
    );
  });
});
