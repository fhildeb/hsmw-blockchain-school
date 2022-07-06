pragma solidity ^0.5.11;
contract FelixToken 
{
    event Transfer(address indexed _from, address indexed _to, uint _value);
    event Approval(address indexed _owner, address indexed _spender, uint _value);
    
    string public name;
    string public symbol;
    uint public totalSupply;
    
    mapping(address => uint) public balanceOf;
    mapping(address => mapping (address => uint256)) public allowance;
    
    constructor (uint _initialSupply, string memory _name, string memory _symbol) public
    {
        totalSupply = _initialSupply;
        name = _name;
        symbol = _symbol;
        balanceOf[msg.sender] = _initialSupply;
    }
    
    function transfer(address _to, uint _value) public returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);
        require(balanceOf[_to] + _value > balanceOf[_to]);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint _value) public returns (bool success)
    {
        require(allowance[_from][msg.sender] >= _value);
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value > balanceOf[_to]);
        allowance[_from][msg.sender] -= _value;
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        
        emit Transfer(_from, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint _value) public returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
}