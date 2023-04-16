const Channel = require('./channel.js');
const Web3JS = require('web3');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const eutils = require('ethereumjs-util');

const adapter = new FileSync('db.json');
const db = low(adapter);

// TODO: Add infura key
var web3 = new Web3JS(
  new Web3JS.providers.HttpProvider(
    'https://goerli.infura.io/v3/<infura-key>',
  ),
);
var channel = new Channel();

function ps() {
  // adds channel information
  this.setChannel = async function (channeladdress) {
    // load contract
    var pcContract = new web3.eth.Contract(channel.abi, channeladdress);

    // load balance and sender of the contract
    var balance = await web3.eth.getBalance(channeladdress);
    var user = await pcContract.methods.channelSender().call();

    // write into the db
    db.set('channels.' + user + '.address', channeladdress).write();
    db.set(
      'channels.' + user + '.value',
      '' + web3.utils.fromWei(balance, 'finney'),
    ).write();
    db.set(
      'channels.' + user + '.used',
      '' + web3.utils.fromWei('0', 'finney'),
    ).write();

    // ToDo check if recipient is the content provider
    // pcContract.methods.channelRecipient().call().then(console.log);
  };

  // gets channel information
  this.getChannel = function (user) {
    if (db.get('channels').get(user).get('payedAndClosed').value() == true) {
      return undefined;
    }
    return db.get('channels').get(user).value();
  };

  // pays content
  this.pay = async function (id, user, sig, sigValue) {
    if (
      // check if channel has enough funds
      parseInt(db.get('channels.' + user + '.value').value()) >
        parseInt(db.get('content.' + id + '.price').value()) &&
      // and the signed value is old value + price
      parseInt(db.get('channels.' + user + '.used').value()) +
        parseInt(db.get('content.' + id + '.price').value()) ==
        parseInt(sigValue) &&
      // and the signature is correct
      (await this.checkSignature(user, sig, sigValue))
    ) {
      // update the channel information
      db.set('channels.' + user + '.used', sigValue).write();

      // store the signature to close the channel later
      db.set('channels.' + user + '.sig', sig).write();

      // mark the content as payed
      db.set('content.' + id + '.' + user, true).write();

      return true;
    } else {
      return false;
    }
  };

  // checks if the signature is valid
  this.checkSignature = async function (user, sig, sigValue) {
    var userChannel = this.getChannel(user);
    var sigValInWei = web3.utils.toWei(sigValue, 'finney');
    var msg = web3.utils.soliditySha3(sigValInWei);
    var sigvals = eutils.fromRpcSig(sig);
    var pcContract = new web3.eth.Contract(channel.abi, userChannel.address);
    return await pcContract.methods
      .checkTicket(msg, sigvals.v, sigvals.r, sigvals.s, sigValInWei)
      .call();
  };

  // gets information if user payed
  this.payed = function (id, user) {
    return db
      .get('content.' + id)
      .has(user)
      .value();
  };

  // sets price of content
  this.setPrice = function (id, price) {
    db.set('content.' + id + '.price', price).write();
  };

  // gets price of content
  this.getPrice = function (id) {
    return db.get('content.' + id + '.price').value();
  };

  /****
   **
   ** USED FOR ADMIN PAGE
   **
   ****/

  // invalidates a channel when payrecipient function was called sucessfully and channel was closed
  this.payRecipient = function (user) {
    // copy channel to closed channels
    db.set(
      'closedChannels.' + user,
      db.get('channels').get(user).value(),
    ).write();

    // remove channel from open channels
    db.unset('channels.' + user).write();
  };

  // get all open channels
  this.getOpenChannels = function () {
    return db.get('channels').value();
  };

  // get all closed channels
  this.getClosedChannels = function () {
    return db.get('closedChannels').value();
  };
}
module.exports = ps;
