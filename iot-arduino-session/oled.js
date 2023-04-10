var Five = require('johnny-five');
var Oled = require('oled-js');
var Font = require('oled-font-5x7');
 
var board = new Five.Board();
 
board.on('ready', () => {
 
  // oled configuration (address may differ 0x3B)
  const opts = {width: 128, height: 64, address: 0x3C};
  var oled = new Oled(board, Five, opts);
 
  oled.turnOnDisplay();
  oled.setCursor(1, 1);
  oled.clearDisplay();
  oled.writeString(Font, 60, 'O', 1, true, 2);
 
});