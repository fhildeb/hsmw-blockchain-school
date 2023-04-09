# NEM Blockchain Atomic Swap

The Atomic Swap project is an implementation of a decentralized ticket exchange system using the NEM blockchain. It facilitates a secure and trustless way for users to buy and sell event tickets with XEM cryptocurrency.

## Files

### Initialization

- `createAccount.ts`: Generates a new NEM account with a unique private key and address. It displays the account information, including the private key and the prettified address, in the console.
- `registerMosaic.ts`: Defines and creates a mosaic representing the event ticket. It includes the creation of a mosaic definition transaction, a mosaic supply change transaction, and an aggregate transaction to wrap them both.
- `registerNamespace.ts`: Registers a root namespace for the organization. It creates and signs a register namespace transaction, then announces the transaction to the network.

### Signing

- `automaticSigning.ts`: Handles the automatic signing of aggregate bonded transactions. It listens for incoming transactions, validates them, and cosigns the transaction if the validation is successful.

### Swap Envelope

- `creatingEscrow.ts`: Sets up an escrow transaction to securely facilitate the exchange of tickets for XEM between the ticket buyer and the seller. It creates an aggregate bonded transaction and locks the funds, ensuring a trustless transaction process.
- `sendingTransfer.ts`: Creates a transfer transaction to send the ticket mosaic to the buyer. It signs the transaction using the seller's private key and announces the transaction to the network.

## License

Copyright (c) 2018 NEM
Licensed under the [Apache License 2.0](LICENSE)

## External

- [NEM Docs](https://nemtech.github.io)
- [NodeJS](https://nodejs.org/en/download/)
