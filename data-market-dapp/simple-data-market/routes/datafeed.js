var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    // connect to blockchain
    var Web3 = require('web3');
    var web3 = new Web3(
      new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545'),
    );

    // load contract
    var fs = require('fs');
    var contractData = JSON.parse(
      fs.readFileSync('public/contracts/DataMarket.json'),
    );
    var networkId = await web3.eth.net.getId();
    var contractAddress = contractData.networks[networkId].address;
    var contract = new web3.eth.Contract(contractData.abi, contractAddress);

    // check if account has paid
    var account = req.query.account;
    var accValid = await contract.methods.buyers(account).call();
    if (!accValid) {
      res.send('You do not have access to this content page');
    } else {
      sendData();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('Could not connect to blockchain');
  }

  function sendData() {
    data = { key: "Here's the blogpost" };
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  }
});

module.exports = router;
