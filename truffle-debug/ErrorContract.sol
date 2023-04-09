pragma solidity ^0.4.24;

contract ErrorContract {
  
    uint public test;
  
    constructor() public {
        test = 0;
    }
  
    function loop(uint _x) public {
        while(true) {
            test = _x; 
        }
    }      
}