async function dapp() {
    // check if web 3 is available
    if (typeof web3 == "undefined") {
      $("#content").html(
        "Please use Web3 enabled Browser"
      );
    } else {
      // get web3 object (version 1.0)
      web3 = new Web3(web3.currentProvider);
  
      // load contract information from truffle
      const contractData = await $.getJSON("/contracts/DataMarket.json");
      const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(
        contractData.abi,
        contractData.networks[networkId].address
      );
  
      // console.log(contract);
      let description = await contract.methods.description().call();
      let price = await contract.methods.price().call();
      let url = await contract.methods.url().call();
  
      $("#description").html("Data Feed: " + description);
      $("#price").html("Price: " + price.toString());
  
      // load user accounts
      const userAccounts = await web3.eth.getAccounts();
      const userAccount = userAccounts[0];
  
      if (typeof userAccount == "undefined") {
        $("#user").html("<br>To buy this feed connect an account with the dapp.");
      } else {
        $("#url").html(
          "Url: <a href='" +
            url +
            "?account=" +
            userAccount +
            "' >" +
            url +
            "</a>"
        );
        $("#user").html(
          "<br>Active Account: " +
            userAccount +
            "<br><br><button id='buy'>Buy Feed</button>"
        );
  
        // step 2
        $("#user").append(
          "&nbsp;<button id='showFeed'>Show Feed with Authorization</button><br><br><div id='alert' style='display: none;'>Sign Functionality is disabled within browser. <br> Please activate signing in MetaMask.</div>"
        );
  
        // event handler for buy function
        $("#buy").click(function () {
          contract.methods.buyData().send({ from: userAccount, value: price });
        });
  
        // event handler for authorisation function
        $("#showFeed").click(async function () {
          try{let msg = web3.utils.keccak256(Math.random().toString());
            let sig = await web3.eth.sign(msg, userAccount);
            document.getElementById("alert").style.display = "none"
            
            /*
            old version, opening in new window
            window.open(
              url + "?account=" + userAccount + "&msg=" + msg + "&sig=" + sig
            );*/
            let url =
    "/mydatafeed/?account=" +
    userAccount +
    "&msg=" +
    msg +
    "&sig=" +
    sig;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to fetch data feed");
      }
      return response.json();
    })
    .then(function (data) {
      // update page with data
      $("#content").html(JSON.stringify(data));
    })
    .catch(function (error) {
      console.error(error);
      $("#content").html("Failed to fetch data feed");
    });
          }catch(error){
            document.getElementById("alert").style.display = "block"
          }
          
        });
      }
    }
  }
  $(document).ready(dapp);
  