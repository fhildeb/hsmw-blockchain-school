pragma solidity ^0.5.0;

contract WriteTest {
  
    string public test;
  
    constructor() public {
        test = "";
    }

    function writeTest(string memory newValue) public {
        test = newValue;
    }
}
