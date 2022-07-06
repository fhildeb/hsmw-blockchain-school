$(document).ready(function() {
    
    var recipient = "0x...";
    var channelSizeInFinney = "10";
    
    // checks if meta mask is working fine
    var account;
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        // check if an account is available
        web3.eth.getAccounts().then(function(accounts) {
            if (accounts.length > 0) {
                account = accounts[0];
                $('#info').html(account);
                checkLogin();
                // reload page if account or network changes
                web3.currentProvider.publicConfigStore.on('update', (obj)=>{
                    if (obj.selectedAddress !== account.toLowerCase()) {
                        window.location.href = 'http://localhost:3000?l=true';
                    }
                });
            } else {
                $('#info').html('<span style="color:red">Melden Sie sich in Meta Mask an.</span>');
            }
        });

    } else {
        $('#info').html('<span style="color:red">Installieren Sie bitte das Meta Mask Plugin.</span>');
    }

    // checks if the user is not logged in, shows the login button
    function checkLogin() {
        
        // if user is not logged in - show login button
        if (account != undefined && $('#shash').length > 0 && $('#user').val() !== account) {
            $('#info').append('&nbsp;&nbsp;&nbsp;<button id="login">Login</button>');
            $('#login').on('click', function() {
                var shash = $('#shash').val();
                web3.eth.personal.sign(shash, account).then(function(sig) {
                    console.log(shash);
                    console.log(sig);
                    window.location.href = 'http://localhost:3000?s=' + sig + '&a=' + account;
                });
            });
        
        // if user is logged in
        } else if ($('#user').val() == account) {
            $('#info').append('&nbsp;&nbsp;&nbsp;<b>Logged In</b>');
            
            // show create paymentchannel button if not yet available
            if ($('#haschannel').length == 0) {
                $('#info').append('&nbsp;&nbsp;&nbsp;<button id="createPc">Open Payment Channel</button>');
                $('#createPc').on('click', function() {
                    createPaymentChannel();
                });
            } else {
                $('#info').append('&nbsp;&nbsp;&nbsp;<b>ChannelId:'+$('#haschannel').val()+'</b>');
            }
            
            // add event listener for pay button if the button is present
            if ($('#pay').length > 0){
                $('#pay').on('click', function() {
                    var value = parseInt($('#price').val()) + parseInt($('#used').val());
                    var valueWei = new web3.utils.BN(web3.utils.toWei(''+value,'finney'));
                    var msg = web3.utils.soliditySha3(valueWei);
                    web3.eth.personal.sign(msg,account).then(function (sig) {
                        var postData = {account:account, sig:sig, value:value};
                        $.post('/', postData, function (content) {
                            window.location.href = 'http://localhost:3000';
                        }, "json");
                    });
                });
            }
        }
    }
    
    // function to create a payment channel
    function createPaymentChannel() {
        var pcContract = new web3.eth.Contract(channel.abi);
        pcContract.deploy({
            data: channel.bytecode,
            arguments: [recipient, '60']
        }).send({
            from: account,
            gas: '1500000',
            value: web3.utils.toWei(channelSizeInFinney, 'Finney')
        }).on('error', (error) => {
            console.log(error);
        }).on('receipt', (receipt) => {
            window.location.href = 'http://localhost:3000?npc='+receipt.contractAddress;
        });
    }    

});