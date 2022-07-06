pragma solidity ^0.4.23;

contract Adplace {

  address public owner;

  mapping(address=>string) public adverts;
  mapping(address=>uint) public prices;
  mapping(address=>uint) public balances;
  mapping(uint=>address) public adspaces;
  
  uint public noAdspaces;
  
  event Sale(
    address indexed _id
  );
    
  modifier onlyOwner() {
      require(msg.sender == owner);
      _;
  }

  constructor() public {
    noAdspaces = 0;
  }

  function registerAdvert(uint _price) public {
    adspaces[noAdspaces] = msg.sender;
    prices[msg.sender] = _price;
    adverts[msg.sender] = '_';
    noAdspaces++;
  }

  function updatePrice(uint _price) public {
    prices[msg.sender] = _price;
  }

  function buyAdvert(address _id, string _advert) public payable{
    require(msg.value == prices[_id]);
    adverts[_id] = _advert;
    balances[_id] = msg.value;
    emit Sale(_id);
  }  

}