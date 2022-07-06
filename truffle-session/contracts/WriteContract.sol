pragma solidity ^0.5.5;

contract WriteContract
{
    string public test;
    
    constructor() public
    {
        test = "beforeChange";
    }
    
    function changeWord(string memory newWord) public
    {
        test = newWord;
    }
}
