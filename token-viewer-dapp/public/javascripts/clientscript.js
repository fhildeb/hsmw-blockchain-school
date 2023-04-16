window.onload = function (e) {
  var abi = [
    {
      constant: false,
      inputs: [
        {
          name: '_spender',
          type: 'address',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          name: 'success',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_to',
          type: 'address',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          name: 'success',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          name: '_from',
          type: 'address',
        },
        {
          name: '_to',
          type: 'address',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [
        {
          name: 'success',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          name: '_initialSupply',
          type: 'uint256',
        },
        {
          name: '_name',
          type: 'string',
        },
        {
          name: '_symbol',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: '_from',
          type: 'address',
        },
        {
          indexed: true,
          name: '_to',
          type: 'address',
        },
        {
          indexed: false,
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: '_owner',
          type: 'address',
        },
        {
          indexed: true,
          name: '_spender',
          type: 'address',
        },
        {
          indexed: false,
          name: '_value',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      constant: true,
      inputs: [
        {
          name: '',
          type: 'address',
        },
        {
          name: '',
          type: 'address',
        },
      ],
      name: 'allowance',
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
          name: '',
          type: 'address',
        },
      ],
      name: 'balanceOf',
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
      inputs: [],
      name: 'name',
      outputs: [
        {
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
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
  ];

  // TODO: Change token address to specific one
  var tokenAdress = '0xf408bC3B0Bb263589F71004F20DAF4aE63301417';
  var infoDiv = document.getElementById('info');
  var account;

  // check if metamask is available
  if (typeof window.ethereum !== 'undefined') {
    // load web3 client library from metamask
    web3 = new Web3(ethereum);
    console.log('Web3 Api Version: ' + web3.version.api);

    // enable metamask and load account
    ethereum
      .enable()
      .then((a) => {
        account = a[0];
        infoDiv.innerHTML = 'Connected Account: <br> ' + account;

        // load token contract
        return loadContract(tokenAdress, abi);
      })
      .then((tokencontract) => {
        // call method balanceOf from token contract
        tokencontract.methods.balanceOf(account).call((e, balance) => {
          infoDiv.innerHTML +=
            '<br>Balance: ' + balance.toString() + ' Token';
        });
      });      
  } else {
    infoDiv.innerHTML =
      'Installieren Sie bitte <a href="https://metamask.io/">Meta Mask</a>.';
  }

  function loadContract(address, abi) {
    var contract = new web3.eth.Contract(abi, address);
    return new Promise((resolve, reject) => {
      resolve(contract);
    });
  }
  
};
