# Token Viewer dApp

This dApp is a Ethereum token viewer application built using JavaScript and the Web3.js library on top of the Pug framework. The main purpose of this application is to demonstrate how to interact with an ERC20 token smart contract on the Ethereum blockchain to retrieve the token balance of a connected MetaMask account.

## One Pager Concept

The application has a single HTML page to display the account address and the token balance. The script enables the connection with MetaMask, and the user's account address is retrieved.

![Token Viewer](/img/token-viewer-dapp.png)

## ERC20 Integration

The ABI of the ERC20 token smart contract and the contract address are defined within the dApp. The ABI contains the standard methods for interacting with ERC20 tokens, such as balanceOf, transfer, transferFrom, and approve. It also includes the name, symbol, and totalSupply methods to fetch the token's metadata.

## Development

### Preparation

1. Create Infura Account
2. Set up an API key for Infura Goerli
3. Redeploy Token Contract on Testnet

> Goerli ERC20: `0xf408bC3B0Bb263589F71004F20DAF4aE63301417`

### Ajustments

Search for `TODO:` and adjust:

- Infura API Keys to your personal endpoint
- EOA or Smart Contract addresses

### Installation

### Installation

```bash
# Installs all packages
npm i

# Start script running node on/bin/www
npm start

# View on Web
# http://localhost:3000/
```
