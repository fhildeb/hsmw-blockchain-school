async function dapp() {

    // check if web 3 is available
    if (typeof web3=='undefined') {
        $('#content').html('Please use Web3 enabled Browser (like Mist or Metamask Plugin).');

    } else {

        // get web3 object (version 1.0)
        web3 = new Web3(web3.currentProvider);    
        
        // load contract information from truffle
        const contractData = await $.getJSON('/contracts/DataMarket.json');
        const networkId = await web3.eth.net.getId();
        const contract = new web3.eth.Contract(contractData.abi, contractData.networks[networkId].address);
        
        // console.log(contract);
        let description = await contract.methods.description().call();
        let price = await contract.methods.price().call();
        let url = await contract.methods.url().call();
        
        $('#description').html("Data Feed: "+description);
        $('#price').html("Price: "+price.toString());

        // load user accounts
        const userAccounts = await web3.eth.getAccounts();
        const userAccount = userAccounts[0];

        if(typeof userAccount=='undefined'){
            $('#user').html("<br>To buy this feed connect an account with the dapp.");
        } else {
            $('#url').html("Url: <a href='"+url+"?account="+userAccount+"' target='_blank'>"+url+"</a>");
            $('#user').html("<br>Active Account: "+userAccount+"<br><button id='buy'>Buy Feed</button>");
            
            // step 2
            $('#user').append("&nbsp;<button id='showFeed'>Show Feed with Authorization</button>");
            
            // event handler for buy function
            $("#buy").click(function(){
                contract.methods.buyData().send({from:userAccount, value:price});
            });
            
            // event handler for authorisation function
            $("#showFeed").click(async function(){
                let msg = web3.utils.keccak256(Math.random().toString());
                let sig = await web3.eth.sign(msg,userAccount);             
                window.open(url+"?account="+userAccount+"&msg="+msg+"&sig="+sig,"_blank");
            });
        }
    }
        
}
$(document).ready(dapp);

