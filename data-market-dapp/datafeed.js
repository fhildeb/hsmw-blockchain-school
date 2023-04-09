var express = require("express");
var router = express.Router();

router.get("/", async function (req, res, next) {
  // connect to blockchain
  var Web3 = require("web3");
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

  // load contract
  var fs = require("fs");
  var contractData = JSON.parse(
    fs.readFileSync("public/contracts/DataMarket.json")
  );
  var networkId = await web3.eth.net.getId();
  var contract = new web3.eth.Contract(
    contractData.abi,
    contractData.networks[networkId].address
  );

  // check if account has paid
  try {
    var account = req.query.account;
    var accValid = await contract.methods.buyers(account).call();
    if (!accValid) throw "forbidden";

    sendData();
  } catch (e) {
    res.status(403).send("Forbidden");
  }

  function sendData() {
    data = { key: "value" };
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(data));
  }
});

module.exports = router;
