async function dapp() {
  var contract;
  var userAccount;

  // check if web 3 is available
  if (typeof web3 == 'undefined') {
    $('#content').html('Please use Web3 enabled Browser');
  } else {
    // get web3 object (version 1.0)
    web3 = new Web3(web3.currentProvider);

    // load contract information from truffle
    var contractData = await $.getJSON('/contracts/DataMarket.json');
    var networkId = await web3.eth.net.getId();
    contract = new web3.eth.Contract(
      contractData.abi,
      contractData.networks[networkId].address,
    );

    // get the owner of contract
    var owner = await contract.methods.owner().call();

    // load user accounts
    var userAccounts = await web3.eth.getAccounts();
    userAccount = userAccounts[0];

    // check if owner is connected with dapp
    if (userAccount !== owner) {
      $('#content').html(
        'Please connect the dapp with the owners accounts (' + owner + ').',
      );
    } else {
      // show admin buttons
      let description = await contract.methods.description().call();
      let price = await contract.methods.price().call();
      let url = await contract.methods.url().call();

      $('#description').html(
        "Data Feed: <input id='newDesc' type='text' value='" +
          description +
          "'></input><button id='upDesc'>Update Description</button>",
      );
      $('#price').html(
        "Price: <input id='newPrice' type='text' value='" +
          price.toString() +
          "'></input><button id='upPrice'>Update Price</button>",
      );
      $('#url').html(
        "Url: <input id='newUrl' type='text' value='" +
          url +
          "'></input><button id='upUrl'>Update Url</button>",
      );
      createButtonHandler();
    }
  }

  function createButtonHandler() {
    $('#upDesc').click(function () {
      contract.methods
        .setDescription($('#newDesc').val())
        .send({ from: userAccount });
    });
    $('#upPrice').click(function () {
      contract.methods
        .setPrice($('#newPrice').val())
        .send({ from: userAccount });
    });
    $('#upUrl').click(function () {
      contract.methods.setUrl($('#newUrl').val()).send({ from: userAccount });
    });
  }
}
$(document).ready(dapp);
