pragma solidity ^0.5.0;
 
contract ErrorContract
{ 
    uint public test;
    
    constructor() public
    {
        test = 0;
    }
 
    function loop(uint _x) public
    {
        while(true)
        {
            test = _x;
        }
    }
}