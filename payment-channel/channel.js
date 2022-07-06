function channel() {
this.abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "closeChannel",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_h",
				"type": "bytes32"
			},
			{
				"name": "_v",
				"type": "uint8"
			},
			{
				"name": "_r",
				"type": "bytes32"
			},
			{
				"name": "_s",
				"type": "bytes32"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "payRecipient",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_timeout",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "channelRecipient",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "channelSender",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "channelTimeout",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_h",
				"type": "bytes32"
			},
			{
				"name": "_v",
				"type": "uint8"
			},
			{
				"name": "_r",
				"type": "bytes32"
			},
			{
				"name": "_s",
				"type": "bytes32"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "checkTicket",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "startDate",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];}
module.exports = channel;
