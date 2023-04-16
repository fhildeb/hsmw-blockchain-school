# Truffle Debug

This session focused on setting up and testing around with the Truffle framework. It demonstrated the process of setting up a personal test blockchain with Ganache, configuring Truffle, deploying and testing a dummy contract, and debugging. The project includes multiple test cases to ensure that the smart contracts function as expected.

## Folders

- `contracts`: Smart Contracts
- `migrations`: Deployment Scripts
- `tests`: Test Scripts

## Development

### Installation

```bash
# Install Truffle
npm install truffle -g
```

### Ganache

Start Ganache on Chain ID 5777 or edit the development network config within `truffle-config.js`

### Deployment

```bash
# Check network deployments
truffle networks

# Deploy Contracts within migration scripts
truffle deploy --network development
```

### Testing

```bash
truffle test ./test/test_FirstContract.js
```
