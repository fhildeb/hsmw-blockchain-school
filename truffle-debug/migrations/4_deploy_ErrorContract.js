var ErrorContract = artifacts.require("./ErrorContract.sol");

module.exports = function(deployer)
{
    deployer.deploy(ErrorContract);
};
