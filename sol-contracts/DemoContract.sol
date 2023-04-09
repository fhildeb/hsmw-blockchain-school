pragma solidity ^0.5.11;

contract DemoContract
{
    address public owner;
    string public protectedData;
    string public openData;
    
    modifier onlyOwner()
    {
        require(msg.sender == owner);
        _;
    }
    
    constructor() public
    {
        owner = msg.sender;
    }
    
    function setOpenData(string memory _newvalue) public
    {
        openData = _newvalue;
    }
    
    function setProtectedData(string memory _newvalue) onlyOwner public
    {
        protectedData = _newvalue;
    }
    
    function double (uint _value) public pure returns (uint)
    {
        return _value*2;
    }
}