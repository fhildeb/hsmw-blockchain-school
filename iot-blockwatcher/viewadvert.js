var Web3JS = require ('web3');
var five = require("johnny-five");
var fs = require('fs');
var OledJs = require('oled-js');
var ptl = require('png-to-lcd');
var font = require('oled-font-5x7');
 
const adspaceid = '0x47EB4a2f88e6D2580259FFe71c063Cff0918Fc6a';
 
var web3ws = new Web3JS(new Web3JS.providers.WebsocketProvider("wss://ropsten.infura.io/ws"));
var oled;
 
// load board ressources
var board = new five.Board();
board.on("ready", function() {
 
    //oled parameters
    const opts = {
        width: 128,
        height: 64,
        address: 0x3C
    };
 
    //initialize display
    oled = new OledJs(board, five, opts);
    oled.clearDisplay(true);
    oled.update();
 
    //wait for sale event
    listenToBlockchain();
});
 
// load blockchain
function listenToBlockchain() {
    loadContract((contract)=>{
        loadImageFromBlockchain(contract, adspaceid);
    });
}
 
// load contract
async function loadContract(cb) {
    // load contract information
    var contractData = JSON.parse(fs.readFileSync('Adplace.json'));
 
    // load network id of remote client
    var networkId = await web3ws.eth.net.getId();
 
    // load contract and call callback
    cb(new web3ws.eth.Contract(contractData.abi,contractData.networks[networkId].address));
}
 
// update function
async function loadImageFromBlockchain(contract, adspaceid) {
 
    // load encoded image data from contract
    var b64string = await contract.methods.adverts(adspaceid).call();
 
    // decode image data and write image file
    fs.writeFileSync('advert.png', Buffer.from(b64string, 'base64'));
 
    // update display
    updateDisplay('advert.png',false);
}
 
// function update display
function updateDisplay(file,dither) {
    ptl(file,dither,function(e,b){
        oled.buffer = b;
        oled.update();
    });
}