# Smart Contract Experimentation

## Ballots

- `Ballot.sol`: Simple voting system that allows users to create a new ballot with a specified number of proposals. The chairperson, who creates the contract, has the power to give the right to vote to other users. Users can delegate their votes to others or vote on a specific proposal themselves. The contract also provides a function to check the winning proposal based on the highest vote count.
- `BallotTest.sol`: Test suite for the Ballot contract. It uses the Remix testing framework to create an instance of the Ballot contract and test the winningProposal function. The test checks if the winning proposal is as expected and returns a boolean value indicating the test result.

## Samples

- `DemoContract.sol`: Demonstrates a simple access control mechanism. The contract has an owner, openData, and protectedData variables. The contract has a modifier, onlyOwner, which restricts access to certain functions only to the contract's owner. The setOpenData function can be called by anyone to change the openData variable, while the setProtectedData function can only be called by the contract's owner. The contract also has a utility function, double, which returns the double of an input value.

- `FirstContract.sol`: Simple contract that initializes a public string variable.

## ERC20

- `FelixToken.sol`: Implementation of a basic ERC-20 token. The contract has functions for transferring tokens between addresses, approving an address to spend tokens on behalf of the token owner, and checking allowances. The contract also has events for token transfers and approvals. The constructor initializes the token's name, symbol, and total supply and assigns the entire initial supply to the contract's creator.

## Payment Channel

Implementation of a unidirectional off-chain payment channel between two parties, a channel sender and a channel recipient. When the contract is created, the sender specifies the recipient, a timeout duration, and deposits funds into the contract.

The contract provides ticket checks, which verify the messages, funds, and signatures associated with a payment. It also allows the channel recipient to claim a payment. The recipient must provide a valid signed message, along with the value being transferred. If the ticket check returns true, the contract transfers the specified amount to the channel recipient, then closes the channel and sends any remaining funds back to the channel sender.

Finally the channel sender is able to close the channel if the timeout duration has passed. It ensures that only the channel sender can close the channel and that the timeout condition is met. When the channel is closed, any remaining funds are sent back to the channel sender.
