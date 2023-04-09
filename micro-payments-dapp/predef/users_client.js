$(document).ready(function() {
    // checks if meta mask is working fine
    var account;
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
        // check if an account is available
        web3.eth.getAccounts().then(function(accounts) {
            if (accounts.length > 0) {
                account = accounts[0];
                $('#info').html(account);
                // reload page if account or network changes
                web3.currentProvider.publicConfigStore.on('update', (obj) => {
                    if (obj.selectedAddress !== account.toLowerCase()) {
                        window.location.href = 'http://localhost:3000/users?l=true';
                    }
                });
            } else {
                $('#info').html('<span style="color:red">Melden Sie sich in Meta Mask an.</span>');
            }
        });

    } else {
        $('#info').html('<span style="color:red">Installieren Sie bitte das Meta Mask Plugin.</span>');
    }

    // event handler for login button
    if ($('#login').length > 0) {
        $('#login').on('click', function() {
            var shash = $('#shash').val();
            web3.eth.personal.sign(shash, account).then(function(sig) {
                console.log(shash);
                console.log(sig);
                window.location.href = 'http://localhost:3000/users?s=' + sig;
            });
        });
    }

    // create event handler for channel buttons
    if ($('#noChannels').length > 0) {
        for (var i = 1; i <= $('#noChannels').val(); i++) {
            createCheckSigButtonEvent(i);
            createPayRecipientButton_Event(i);
        }
    }

    // check signature button
    function createCheckSigButtonEvent(channelId) {
        if ($('#checkSigButton_' + channelId).length > 0) {
            $('#checkSigButton_' + channelId).on('click', function() {
                var pcContract = new web3.eth.Contract(channel.abi, $('#address_' + channelId).val());
                var methodParams = getMethodParams($('#sig_' + channelId).val(),$('#used_' + channelId).val());
                pcContract.methods.checkTicket(methodParams.msg,methodParams.v,methodParams.r,methodParams.s,methodParams.value).call(console.log);
            });
        }
    }

    // close channel button
    function createPayRecipientButton_Event(channelId) {
        if ($('#payRecipientButton_' + channelId).length > 0) {
            $('#payRecipientButton_' + channelId).on('click', function() {
                var pcContract = new web3.eth.Contract(channel.abi, $('#address_' + channelId).val());
                var methodParams = getMethodParams($('#sig_' + channelId).val(),$('#used_' + channelId).val());
                pcContract.methods.payRecipient(
                    methodParams.msg,
                    methodParams.v,
                    methodParams.r,
                    methodParams.s,
                    methodParams.value
                ).send({
                    from:account
                }).on('receipt', (receipt) => {
                    // mark channel as closed in database
                    var postData = {user:$('#sender_' + channelId).val(), trx:receipt.transactionHash};
                    $.post('/users/payrecipient', postData, function (content) {
                        window.location.href = 'http://localhost:3000/users';
                    }, "json");
                });
            });
        }
    }
    
    // get the v r s values from signature
    function getMethodParams(sig,value){
        var valueInWei = web3.utils.toWei(value,'finney');
        var msg = web3.utils.soliditySha3(valueInWei);
        var r = "0x" + sig.slice(2, 66);
        var s = "0x" + sig.slice(66, 130);
        var v = "0x" + sig.slice(130, 132);
        v = web3.utils.toDecimal(v);
        return {msg:msg,v:v,r:r,s:s,value:valueInWei};
    }
    
});