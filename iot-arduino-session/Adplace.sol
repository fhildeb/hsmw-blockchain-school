pragma solidity ^0.4.23;

contract Adplace {
    address public owner;

    mapping(address => string) public adverts;
    mapping(address => uint256) public prices;
    mapping(address => uint256) public balances;
    mapping(uint256 => address) public adspaces;

    uint256 public noAdspaces;

    event Sale(address indexed _id);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        noAdspaces = 0;
    }

    function registerAdvert(uint256 _price) public {
        adspaces[noAdspaces] = msg.sender;
        prices[msg.sender] = _price;
        adverts[msg.sender] = "_";
        noAdspaces++;
    }

    function updatePrice(uint256 _price) public {
        prices[msg.sender] = _price;
    }

    function buyAdvert(address _id, string _advert) public payable {
        require(msg.value == prices[_id]);
        adverts[_id] = _advert;
        balances[_id] = msg.value;
        emit Sale(_id);
    }
}
