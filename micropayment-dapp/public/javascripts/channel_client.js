var channel = {
  abi: [
    {
      constant: false,
      inputs: [],
      name: 'closeChannel',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_h',
          type: 'bytes32',
        },
        {
          name: '_v',
          type: 'uint8',
        },
        {
          name: '_r',
          type: 'bytes32',
        },
        {
          name: '_s',
          type: 'bytes32',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'payRecipient',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          name: '_to',
          type: 'address',
        },
        {
          name: '_timeout',
          type: 'uint256',
        },
      ],
      payable: true,
      stateMutability: 'payable',
      type: 'constructor',
    },
    {
      constant: true,
      inputs: [],
      name: 'channelRecipient',
      outputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'channelSender',
      outputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'channelTimeout',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          name: '_h',
          type: 'bytes32',
        },
        {
          name: '_v',
          type: 'uint8',
        },
        {
          name: '_r',
          type: 'bytes32',
        },
        {
          name: '_s',
          type: 'bytes32',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'checkTicket',
      outputs: [
        {
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'startDate',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  ],
  bytecode:
    '608060405260405160408061071d8339810180604052604081101561002357600080fd5b81019080805190602001909291908051906020019092919050505081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055504260028190555080600381905550505061063f806100de6000396000f3fe60806040526004361061007d576000357c01000000000000000000000000000000000000000000000000000000009004806304758e7914610082578063075aa0c4146100d95780630b97bc86146101305780632ef2d55e1461015b578063522dd3ad14610186578063b28aea5614610204578063e76449741461021b575b600080fd5b34801561008e57600080fd5b50610097610281565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100e557600080fd5b506100ee6102a7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561013c57600080fd5b506101456102cc565b6040518082815260200191505060405180910390f35b34801561016757600080fd5b506101706102d2565b6040518082815260200191505060405180910390f35b34801561019257600080fd5b506101ea600480360360a08110156101a957600080fd5b8101908080359060200190929190803560ff1690602001909291908035906020019092919080359060200190929190803590602001909291905050506102d8565b604051808215151515815260200191505060405180910390f35b34801561021057600080fd5b50610219610453565b005b34801561022757600080fd5b5061027f600480360360a081101561023e57600080fd5b8101908080359060200190929190803560ff1690602001909291908035906020019092919080359060200190929190803590602001909291905050506104fc565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b60035481565b60008160405160200180828152602001915050604051602081830303815290604052805190602001208614151561030e57600080fd5b3073ffffffffffffffffffffffffffffffffffffffff1631821115151561033457600080fd5b8560405160200180807f19457468657265756d205369676e6564204d6573736167653a0a333200000000815250601c018281526020019150506040516020818303038152906040528051906020012095506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660018787878760405160008152602001604052604051808581526020018460ff1660ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa15801561041a573d6000803e3d6000fd5b5050506020604051035173ffffffffffffffffffffffffffffffffffffffff1614151561044657600080fd5b6001905095945050505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104ae57600080fd5b42600354600254011015156104c257600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561055857600080fd5b61056585858585856102d8565b151561057057600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156105d8573d6000803e3d6000fd5b506000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16fffea165627a7a72305820cf7d48966543426a542dc51695038715d896de017144279ae1a26f7421532d060029',
};

function loadPaymentChannel(address) {
  //return web3.eth.contract(channelABI).at(address);
}
