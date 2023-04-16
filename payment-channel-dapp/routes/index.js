var express = require('express');
var router = express.Router();
var Web3JS = require('web3');
var web3 = new Web3JS(
  // TODO: Adjust Infura Key
  new Web3JS.providers.HttpProvider(
    'https://goerli.infura.io/v3/<infura-key>',
  ),
);
var abi = [
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
      { name: '_h', type: 'bytes32' },
      { name: '_v', type: 'uint8' },
      { name: '_r', type: 'bytes32' },
      { name: '_s', type: 'bytes32' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'payRecipient',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_timeout', type: 'uint256' },
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'constructor',
  },
  {
    constant: true,
    inputs: [],
    name: 'channelRecipient',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'channelSender',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'channelTimeout',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '_h', type: 'bytes32' },
      { name: '_v', type: 'uint8' },
      { name: '_r', type: 'bytes32' },
      { name: '_s', type: 'bytes32' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'checkTicket',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'startDate',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
// TODO: Ajust Address of Payment Channel Contract 
var address = '0x10d64ff9CF17aA5178196536fE177276c6f6120a';
var pc = new web3.eth.Contract(abi, address);
/* GET home page. */
router.get('/', function (req, res, next) {
  var balance;
  var recipient;
  var sender;
  var start;
  var timeout;
  var amount;
  web3.eth
    .getBalance(address)
    .then(function (_balance) {
      balance = web3.utils.fromWei(_balance, 'Finney');
      return pc.methods.startDate().call();
    })
    .then(function (_start) {
      start = _start;
      return pc.methods.channelSender().call();
    })
    .then(function (_sender) {
      sender = _sender;
      return pc.methods.channelRecipient().call();
    })
    .then(function (_recipient) {
      recipient = _recipient;
      return pc.methods.channelTimeout().call();
    })
    .then(function (_timeout) {
      timeout = _timeout;
      res.render('index', {
        title: 'Payment Channel dApp',
        e: null,
        recipient: recipient,
        sender: sender,
        start: start,
        timeout: timeout,
        balance: balance,
      });
    })
    .catch(function (error) {
      console.log('E');
      res.render('index', { title: 'Payment Channel dApp', e: error });
    });
});
module.exports = router;
