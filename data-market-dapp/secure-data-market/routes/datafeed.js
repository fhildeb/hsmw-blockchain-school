var express = require("express");
var router = express.Router();
var utils = require("ethereumjs-util");

router.get("/", async function (req, res, next) {
  try {
  // connect to blockchain
  var Web3 = require("web3");
  var web3 = new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:7545"));

  // load contract
  var fs = require("fs");
  var contractData = JSON.parse(fs.readFileSync("public/contracts/DataMarket.json"));
  var networkId = await web3.eth.net.getId();
  var contractAddress = contractData.networks[networkId].address;
  var contract = new web3.eth.Contract(contractData.abi, contractAddress);

  // check if account has paid
    var account = req.query.account;

    var accValid = await contract.methods.buyers(account).call();
    var sigValid = await checkSignature(account);
    if (accValid && sigValid){
      sendData();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("You do not have access to this content page");
  }

  // check if user owns account
  async function checkSignature(account) {
    try {
      var sig = req.query.sig;
      var msg = req.query.msg;
      var { v, r, s } = utils.fromRpcSig(sig);

      var pubKey = utils.ecrecover(utils.toBuffer(msg), v, r, s);

      var address = utils.bufferToHex(utils.pubToAddress(pubKey));

      if (address.toString().toLowerCase() == account.toLowerCase()) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  function sendData() {
    data = { key: "Here's the secret blogpost" };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data));
  }
});

module.exports = router;
