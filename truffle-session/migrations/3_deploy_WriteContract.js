var WriteContract = artifacts.require("./WriteContract.sol");

module.exports = function(deployer)
{
    deployer.deploy(WriteContract);
};
