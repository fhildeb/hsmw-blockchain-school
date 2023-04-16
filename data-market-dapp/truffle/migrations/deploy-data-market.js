var DataMarket = artifacts.require("./DataMarket.sol");

module.exports = function(deployer) 
{
  deployer.deploy(DataMarket,"leerer Feed","",0,{from: web3.eth.accounts[4]});
};