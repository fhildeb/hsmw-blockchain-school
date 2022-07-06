var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {

  // connect to blockchain
  var Web3 = require('web3');
  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
  
  // load contract
  var fs = require('fs');
  var contractData = JSON.parse(fs.readFileSync('public/contracts/DataMarket.json'));
  var networkId = await web3.eth.net.getId();
  var contract = new web3.eth.Contract(contractData.abi, contractData.networks[networkId].address);
  
  // check if account has paid
  try{
    var account = req.query.account;

    var accValid = await contract.methods.buyers(account).call();
    if(!accValid) throw "forbidden";
    
    var sigValid = await checkSignature(account);
    if(!sigValid) throw "forbidden";

    sendData();
    
  }catch(e){
    res.status(403).send('Forbidden');
  }

  // check if user owns account  
  async function checkSignature(account){
    var utils = require('ethereumjs-util');
    
    try{
      var sig = req.query.sig;
      var msg = req.query.msg;
      var {v,r,s} = utils.fromRpcSig(sig);
      
      var pubKey = utils.ecrecover(utils.toBuffer(msg),v,r,s);
      
      var address = utils.bufferToHex(utils.pubToAddress(pubKey));

      if(address.toString().toLowerCase() == account.toLowerCase()){
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    }catch(e){
      console.log(e);
      return Promise.reject(e);
    }
  }
   
  function sendData(){
    data = {'key':'value'};
    res.setHeader('Content-Type','application/json');
    res.send(JSON.stringify(data));
  }
  
});

module.exports = router;


