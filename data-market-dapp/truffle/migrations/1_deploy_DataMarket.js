var DataMarket = artifacts.require("./DataMarket.sol");

module.exports = function(deployer, network, accounts) 
{
  deployer.deploy(DataMarket,"leerer Feed","",0,{from: accounts[0]});
};