pragma solidity ^0.5.0;
   
contract PaymentChannel {
   
    address payable public channelSender;
    address payable public channelRecipient;
    uint public startDate;
    uint public channelTimeout;
   
    constructor(address payable _to, uint _timeout) public payable {
        channelRecipient = _to;
        channelSender = msg.sender;
        startDate = now;
        channelTimeout = _timeout;
    }
   
    function checkTicket(
        bytes32 _h,
        uint8 _v,
        bytes32 _r,
        bytes32 _s,
        uint _value
    )
    public view
    returns (bool)
    {
        // check message
        require(_h == keccak256(abi.encodePacked(_value)));
   
        // check funds
        require(_value <= address(this).balance);
   
        // check signatures
        _h = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _h));
        require(ecrecover(_h, _v, _r, _s) == channelSender);
 
        // checks completed successfull
        return true;
    }
   
    function payRecipient(
        bytes32 _h,
        uint8 _v,
        bytes32 _r,
        bytes32 _s,
        uint _value
    )
    public
    {
        // only recipient
        require(msg.sender == channelRecipient);
   
        // check ticket
        require(checkTicket(_h,_v,_r,_s,_value));
   
        // transfer funds
        channelRecipient.transfer(_value);
          
        // close channel and transfer remaining funds to sender
        selfdestruct(channelSender);
    }
   
    function closeChannel() public {
        // only Sender
        require(msg.sender == channelSender);
   
        // check if timeout is reached
        require(startDate + channelTimeout < now);
   
        // close channel and transfer remaining funds to sender
        selfdestruct(channelSender);
    }
}