# IoT Arduino Session

This project involves scripts that can run on a small Internet of Things (IoT) device using an Arduino Nano Microcontroller and an OLED display. The IoT device will interact with the Ethereum Ropsten testnet, showcasing the integration of blockchain technology with embedded hardware.

![Arduino Picture](/img/iot-arduino-session.png)
_[Arduino Nano OLED Connect](http://arduino-er.blogspot.com/2015/04/walking-bitmap-on-096-inch-128x64-i2c.html)_

## Setup and Tests

The Arduino is a versatile, open-source microcontroller platform that can interact with various electronic components. The included firmware named `StandardFirmataPlus.ino` is used to flash the microcontroller which allows users to control the Arduino using JavaScript through the Johnny-Five library.

### LED Blink Test

> File: `led.js`

This program serves as a basic test for the Arduino Nano's functionality. The script utilizes the Johnny-Five JavaScript library to control an LED on pin 13 of the Arduino Nano. Upon successful execution, the LED will blink at a 100ms interval, ensuring that the board and its connection to the programming environment are functioning properly.

### OLED Text Display

> File: `oled.js`

This program is designed to test the OLED display's functionality. The script uses the Johnny-Five, oled-js, and oled-font-5x7 libraries to initialize and control the OLED display. When executed, the program will turn on the display, clear its content, and display the letter "O" on it, confirming that the OLED display is properly wired and functioning.

## Blockchain-Based Apps

### Ethereum Block Watcher

> File: `blockwatcher.js`

This program establishes a connection to the blockchain via Infura's WebSocket provider. It listens for new block header events and, upon receiving them, displays the block number and hash on the OLED screen. This program showcases the integration of the Arduino-based IoT device with the Ethereum blockchain.

### Blockchain Advertising

This program revolves around creating an IoT-based advertising banner rental system using the Ethereum Ropsten network. The OLED display of the Arduino becomes a rentable advertising banner.

#### Solidity Contract

> File: `Adplace.sol`

A smart contract on the Ethereum Ropsten testnet governs the rental process, allowing users to register their displays, set prices, and upload images for advertisement. Users can interact with the smart contract through a web frontend or REMIX connected to MetaMask.

Smart Contract Functionality:

- register ad displays with a specified price
- update the price of the ad space
- allow others to buy the ad space by uploading an image

The contract maintains mappings for adverts, prices, balances, and ad spaces, and includes an sale event that is emitted when an ad space is successfully purchased.

#### Arduino Listener

> File: `adwatcher.js`

The ad watcher itself just connects to the smart contract on Ropsten and listens for all sale events emitted by the Adplace. Upon detecting a relevant event, it retrieves the base64-encoded image data associated with the advertisement, decodes it, and writes it to a file. The program then updates the OLED display with the newly uploaded advertisement image.

It utilizes the Johnny-Five library for Arduino communication, the Web3 library for blockchain interaction, and the png-to-lcd library for image conversion to such a small OLED pixel screen.

## Development

1. Search for `TODO:` within the project and exchange your MetaMask address
2. Install dependencies using `npm i` within the `iot-arduino-session` folder
3. Start Arduino IDE and connect the microcontroller via USB cable
4. Flash Arduino Firmware with `StandardFirmataPlus.ino`
5. Run JavaScript files like `node adwatcher.js`
