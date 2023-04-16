# Unidirectional Payment Channel dApp

The project is an Ethereum-based payment channel dApp interacting with the Ethereum testnetwork through Infura. Within the payment channel, participants can lock-in and trade tokens for a certain time period. The smart contract includes functions to create and close the channel, pay the recipient, as well as to check the status and details. Everything is handled directly onchain. An alternative can be found within the micro payments dApp.

## Payment Channel Tickets

Tickets form the basis for payment channels. Once connected to MetaMask, the user can create a signed ticket including the hash of the value being sent, the signature, and the value in Wei. Tickets can be seen as withdrawal permissions to guarantee the recipient that he can get money from the payment channel without having to carry out a paid transaction on the blockchain.

## Smart Contract

> File: `PaymentChannel.sol`

The contract is an implementation of a unidirectional off-chain payment channel between two parties, a channel sender and a channel recipient. When the contract is created, the sender specifies the recipient, a timeout duration, and deposits funds into the contract.

The contract provides ticket checks, which verify the messages, funds, and signatures associated with a payment. It also allows the channel recipient to claim a payment. The recipient must provide a valid signed message, along with the value being transferred. If the ticket check returns true, the contract transfers the specified amount to the channel recipient, then closes the channel and sends any remaining funds back to the channel sender.

Finally the channel sender is able to close the channel if the timeout duration has passed. It ensures that only the channel sender can close the channel and that the timeout condition is met. When the channel is closed, any remaining funds are sent back to the channel sender.

## Development

### Preparation

1. Create Infura Account
2. Set up an API key for Infura Ropsten
3. Deploy related Contracts on Rposten

### Ajustments

Search for `TODO:` and adjust:

- Infura API Keys to your personal endpoint
- EOA or Smart Contract addresses

### Installation

```bash
# Installs all packages
npm i

# Start script running node on/bin/www
npm start
```
