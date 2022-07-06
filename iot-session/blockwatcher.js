var Web3JS = require("web3");
var Five = require("johnny-five");
var OledJs = require("oled-js");
var Font = require("oled-font-5x7");
// connect to blockchain client
var web3ws = new Web3JS(
  new Web3JS.providers.WebsocketProvider("ws:CUSTOM_PORT")
);
// load board ressources
var board = new Five.Board();
var oled;
board.on("ready", function () {
  // oled parameters
  const opts = { width: 128, height: 64, address: 0x3c };
  // initialize display
  oled = new OledJs(board, Five, opts);
  // clear the display on startup
  oled.clearDisplay(true);
  oled.update();
  // wait for blockheader
  listenToBlockchain();
});
// listen for blockchain events (only works on web socket connections)
function listenToBlockchain() {
  // event listener
  web3ws.eth
    .subscribe("newBlockHeaders")
    .on("data", function (blockHeader) {
      console.log("Block: " + blockHeader.number);
      output(blockHeader);
    })
    .on("error", function (e) {
      console.log("FEHLER: " + e);
    });
}
// output function
function output(block) {
  oled.setCursor(1, 1);
  oled.writeString(Font, 1, "" + block.number, 1, false, 2);
  oled.setCursor(1, 15);
  oled.writeString(Font, 1, "" + block.hash, 1, true, 2);
}
