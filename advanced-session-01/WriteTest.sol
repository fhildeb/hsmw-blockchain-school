pragma solidity ^0.4.23;

contract WriteTest {
  
    string public test;
  
    constructor() public {
        test = "";
    }

    function writeTest(string newValue) public {
        test = newValue;
    }
}
