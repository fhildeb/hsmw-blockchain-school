var Five = require("johnny-five");
var board = new Five.Board();
 
board.on("ready", function() {
  var led = new Five.Led(13);
  led.blink(100);
});