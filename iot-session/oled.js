var Five = require("johnny-five");
var Oled = require("oled-js");
var Font = require("oled-font-5x7");
var board = new Five.Board();
board.on("ready", () => {
  // oled configuration (address may differ 0x3B)
  const opts = { width: 128, height: 64, address: 0x3c };
  var oled = new Oled(board, Five, opts);
  oled.turnOnDisplay();
  oled.setCursor(1, 1);
  oled.writeString(Font, 3, "Hello World", 1, true, 2);
});
