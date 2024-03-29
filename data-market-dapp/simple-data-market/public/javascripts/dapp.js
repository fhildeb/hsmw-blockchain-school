async function dapp() {
  // check if web 3 is available
  if (typeof web3 == 'undefined') {
    $('#content').html('Please use Web3 enabled Browser');
  } else {
    // get web3 object (version 1.0)
    web3 = new Web3(web3.currentProvider);

    // load contract information from truffle
    const contractData = await $.getJSON('/contracts/DataMarket.json');
    const networkId = await web3.eth.net.getId();
    const contract = new web3.eth.Contract(
      contractData.abi,
      contractData.networks[networkId].address,
    );

    // console.log(contract);
    let description = await contract.methods.description().call();
    let price = await contract.methods.price().call();
    let url = await contract.methods.url().call();

    $('#description').html('Data Feed: ' + description);
    $('#price').html('Price: ' + price.toString());

    // load user accounts
    const userAccounts = await web3.eth.getAccounts();
    const userAccount = userAccounts[0];

    if (typeof userAccount == 'undefined') {
      $('#user').html('<br>To buy this feed connect an account with the dapp.');
    } else {
      $('#url').html(
        "Url: <a href='" +
          url +
          '?account=' +
          userAccount +
          "'>" +
          url +
          '</a>',
      );
      $('#user').html(
        '<br>Active Account: ' +
          userAccount +
          "<br><br><button id='buy'>Buy Feed</button>",
      );

      // event handler for buy function
      $('#buy').click(function () {
        contract.methods.buyData().send({ from: userAccount, value: price });
      });
    }
  }
}
$(document).ready(dapp);
