pragma solidity ^0.4.23;

contract DataMarket {
    
    address public owner;
    string public description;
    string public url;
    uint public price;
    mapping(address=>bool) public buyers;
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    constructor(string _desc, string _url, uint _price) public {
        owner = msg.sender;
        price = _price;
        url = _url;
        description = _desc;
    }
    
    function setDescription(string _newDesc) public onlyOwner{
        description = _newDesc;
    }

    function setPrice(uint _newPrice) public onlyOwner{
        price = _newPrice;
    }

    function setUrl(string _newUrl) public onlyOwner{
        url = _newUrl;
    }

    function buyData() public payable {
        require(msg.value == price);
        buyers[msg.sender] = true;
    }
    
    function cashOut() public onlyOwner {
        owner.transfer(address(this).balance);
    }
    
}
