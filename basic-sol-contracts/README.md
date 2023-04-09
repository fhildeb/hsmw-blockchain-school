# Smart Contract Experimentation

## Ballots

- `Ballot.sol`: Voting system that allows users to create a new ballot with a specified number of proposals. The chairperson, who creates the contract, has the power to give the right to vote to other users. Users can delegate their votes to others or vote on a specific proposal themselves. The contract also provides a function to check the winning proposal based on the highest vote count.
- `BallotTest.sol`: Test suite for the Ballot contract. It uses the Remix testing framework to create an instance of the Ballot contract and test the winningProposal function. The test checks if the winning proposal is as expected and returns a boolean value indicating the test result.

## Samples

- `FirstContract.sol`: Simple contract that initializes a public string variable.
- `DemoContract.sol`: Simple access control mechanism restricting access to certain functions to the contract owner.

## ERC20

- `FelixToken.sol`: Basic ERC-20 token to transfer tokens between addresses, approving an address to spend tokens on behalf of the token owner, and checking allowances. The contract also has events for token transfers and approvals, a name, symbol, and total supply. The entire initial supply is given to the contract creator.
