# Micropayment Channel dApp

This project is a micropayment system utilizing Ethereum payment channels for content access control. It allows users to access specific content on a website by opening a payment channel with the content provider and signing off transactions within the channel.

![Login](/img/micropayment-dapp-1.png)

## Description

The dApp uses MetaMask as a browser plugin to interact with the Ethereum blockchain, enabling users to open smart contract channels, sign transactions, and make payments. The backend handles channel management, content pricing, and tracking user payments.

Users can log in using their Ethereum addresses and access content after paying the required amount. The payment channels can be closed by the recipient (content provider) once the channel balance is confirmed.

### User Interface

Users can open payment channels and make signatures to the database while signing with their Ethereum accounts.

![Opening Channel](/img/micropayment-dapp-2.png)
![Payed Channel](/img/micropayment-dapp-3.png)

### Admin Panel

Admins can check the signatures of the payment channels and close them if wanted.

![Admin Pannel](/img/micropayment-dapp-4.png)

## Off-Chain Data Storage

Within the Payment Channel dApp, the data is directly written within the smart contract and very expensive. This step is skipped within the micropayment project. The corresponding logic must now be implemented by the webservice itself, using a database in form of a JSON file, which gets overwritten in each step. Only the opening and closing will be recorded on chain.

- DB stores the open payment channel information
- DB stores who bought which content
- DB stores the corresponding withdrawal permissions for redemption

## Development

### Preparation

1. Create Infura Account
2. Set up an API key for Infura Goerli Testnet

### Ajustments

Search for `TODO:` and adjust:

- Infura API Keys to your personal endpoint
- EOA Admin addresses

### Installation

```bash
# Installs all packages
npm i

# Start script running node on/bin/www
npm start

# View on Web
# http://localhost:3000/
```
