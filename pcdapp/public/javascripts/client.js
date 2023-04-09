$(document).ready(function() {
 
    var account;
 
    if (typeof window.ethereum !== 'undefined') {
 
        // load web3 client library from metamask
        web3 = new Web3(ethereum);
        console.log("Web3 Api Version: " + web3.version);
 
        $('#info').html('Ethereum Provider gefunden.<br><br>');
 
        // enable metamask and load account
        ethereum.enable().then((a) => {
            account = a[0];
            $('#info').append(' ' + account + ' mit Dapp verknüpft');
        });
 
    } else {
        $('#info').html('Installieren Sie bitte <a href="https://metamask.io/">Meta Mask</a>.');
    }
 
    $('#createSig').on('click', function() {
 
        $('#ticketinfo').html('');
 
        var value = new web3.utils.BN(web3.utils.toWei($('#value').val(), 'finney'));
        var msg = web3.utils.soliditySha3(value);
 
        web3.eth.personal.sign(msg, account).then(function(sig) {
 
            var r = "0x" + sig.slice(2, 66);
            var s = "0x" + sig.slice(66, 130);
            var v = "0x" + sig.slice(130, 132);
            v = web3.utils.toDecimal(v);
            if (v == 0 || v == 1) v += 27;
 
            $('#ticketinfo').html('<h3>Signatur:</h3>_h: <input type="text" size="64" value="' + msg + '"><br>_v: <input type="text" size="64" value="' + v + '"><br>_r: <input type="text" size="64" value="' + r + '"><br>_s: <input type="text" size="64" value="' + s + '"><br>_value (in Wei): <input type="text" size="50" value="' + value + '">');
 
        });
    });
 
});