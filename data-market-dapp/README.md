# Data Market

This is a dApp implementing a Data Market, where content is shown after users paid for it with an EVM transaction. It involves the creation and deployment of a smart contract for the Data Market, testing the smart contract, and implementing a web server to facilitate its functionalities.

The Node.js web server delivers three pages, offering an overview of available data feeds, functionality to purchase access, and a dedicated page for the Data Market owner to update prices.

![Show Data](/img/simple-data-market-3.png)

## Simple Data Market

- `backend.js`: The owner's control panel, enabling the owner to update the data feed's description, price, and URL. It also checks if the connected account is the owner of the contract.
- `dapp.js`: Frontend code for the Data Market, allowing users to view the data feed's description, price, and URL, and enabling them to buy access to the data feed.
- `datafeed.js`: Server-side code for the data feed, checking if the connected user has paid for access to the data feed and if they own the connected account. If both conditions are met, the data is sent to the user.
- `DataMarket.sol`: Solidity smart contract for the Data Market, defining the contract's state variables, constructor, and methods for updating the data feed, buying access to the data feed, and cashing out the contract's Ether balance.

### Market Page

![Market Page](/img/simple-data-market-1.png)

### Admin Backend

![Admin Backend](/img/simple-data-market-2.png)

## Secure Data Market

- `dapp_v2.js`: Updated version of `dapp.js` with a new feature: after the user buys the data feed, they have the option to access the data feed with authorization. It can generate a random message, signs it with the user's account, and opens the data feed URL in a new window with the user's account, signed message, and signature as URL parameters. This additional feature enhances the security of the data access, as it allows the data feed to verify the user's ownership of the connected account.
- `datafeed_v2.js`: Updated version of `datafeed.js` with a new feature: It not only checks if the user has paid for access to the data feed, but also if they own the connected account by verifying the signature sent in the URL parameters. This is done using the check signature function. If both conditions are met, the data is sent to the user.

### Updated Market Page

![Updated Market Page](/img/secure-data-market-1.png)

### Signature Handling

![Signature Handling](/img/secure-data-market-1.png)

## Tests & Deployment

> Tests and Deployment can be found within the `truffle` directory

- `test_buy_method.js`: Tests the buy method of the DataMarket smart contract. It checks if the correct amount of Ether is sent, ensuring that the buyer's status is updated and that the contract balance and sender's account balance change accordingly. It also tests the behavior when an incorrect amount of Ether is sent.
- `test_initialization.js`: Tests the initial state of the DataMarket smart contract, making sure that the variables are properly initialized, such as the description, URL, price, and contract owner.
- `test_write_methods.js`: Tests the description method of the DataMarket smart contract. It verifies if the contract owner can successfully change the description and if a non-owner account is restricted from making any changes to the description.

### Install Truffle

```bash
# Install Truffle
npm install truffle -g
```

### Local Testchain

Start Ganache on Chain ID 5777 or edit the development network config within `truffle-config.js`

### Contract Deployment

```bash
# Check network deployments
truffle networks

# Deploy Contracts within migration scripts
truffle deploy --network development
```

### Contract Testing

```bash
truffle test ./test/test_FirstContract.js
```

## Development

> Projects can be found within `simple-data-market` or `secure-data-market` directories

### Preparation

1. Start Ganache
2. Redeploy the contract in `truffle`
3. Copy artifact from `truffle/build/contracts` to
   - `basic-market-dapp/public/contracts`
   - `secure-market-dapp/public/contracts`
4. Import Deployment Account to MetaMask
5. Set up Testnetwork (default 7575) in MetaMask
6. Install dApps within project folders

### Installation

```bash
# Installs all packages
npm i

# Start script running node on/bin/www
npm start

# View on Web
# http://localhost:3000/
``


```
