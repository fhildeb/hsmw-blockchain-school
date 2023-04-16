$(document).ready(function () {
  // TODO: Recipient has to be admin account address
  // Add your admind address from MetaMask
  var recipient = '0x87E01F75d7aC18D6afeBA63192B6CBeB391a57A8';
  var channelSizeInFinney = '10';

  // checks if meta mask is working fine
  var account;
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    // check if an account is available
    web3.eth.getAccounts().then(function (accounts) {
      if (accounts.length > 0) {
        account = accounts[0];
        $('#info').html(account);
        checkLogin();
        // reload page if account or network changes
        if (
          web3.currentProvider.publicConfigStore &&
          typeof web3.currentProvider.publicConfigStore.on === 'function'
        ) {
          web3.currentProvider.publicConfigStore.on('update', (obj) => {
            if (obj.selectedAddress !== account.toLowerCase()) {
              window.location.href = 'http://localhost:3000?l=true';
            }
          });
        }
      } else {
        $('#info').html(
          '<span style="color:red">Melden Sie sich in Meta Mask an.</span>',
        );
      }
    });
  }

  // checks if the user is not logged in, shows the login button
  function checkLogin() {
    // if user is not logged in - show login button
    if (
      account != undefined &&
      $('#shash').length > 0 &&
      $('#user').val() !== account
    ) {
      $('#info').append(
        '&nbsp;&nbsp;&nbsp;<br><br><button id="login">Login</button><br>',
      );
      $('#login').on('click', function () {
        try {
          var shash = $('#shash').val();
          web3.eth.personal.sign(shash, account).then(function (sig) {
            console.log(shash);
            console.log(sig);
            window.location.href =
              'http://localhost:3000?s=' + sig + '&a=' + account;
          });
        } catch (error) {
          console.log(error);
        }
      });

      // if user is logged in
    } else if ($('#user').val() == account) {
      $('#info').append('&nbsp;&nbsp;&nbsp;<br><b>Logged In</b><br>');

      // show create paymentchannel button if not yet available
      if ($('#haschannel').length == 0) {
        $('#info').append(
          '&nbsp;&nbsp;&nbsp;<button id="createPc">Open Payment Channel</button>',
        );
        $('#createPc').on('click', function () {
          createPaymentChannel();
        });
      } else {
        $('#info').append(
          '&nbsp;&nbsp;&nbsp;<br><b>ChannelId:' +
            $('#haschannel').val() +
            '</b><br>',
        );
      }

      // add event listener for pay button if the button is present
      if ($('#pay').length > 0) {
        $('#pay').on('click', function () {
          var value = parseInt($('#price').val()) + parseInt($('#used').val());
          var valueWei = new web3.utils.BN(
            web3.utils.toWei('' + value, 'finney'),
          );
          var msg = web3.utils.soliditySha3(valueWei);
          web3.eth.personal.sign(msg, account).then(function (sig) {
            var postData = { account: account, sig: sig, value: value };
            $.post(
              '/',
              postData,
              function (content) {
                window.location.href = 'http://localhost:3000';
              },
              'json',
            );
          });
        });
      }
    }
  }

  // function to create a payment channel
  function createPaymentChannel() {
    var pcContract = new web3.eth.Contract(channel.abi);
    pcContract
      .deploy({
        data: channel.bytecode,
        arguments: [recipient, '60'],
      })
      .send({
        from: account,
        gas: '1500000',
        value: web3.utils.toWei(channelSizeInFinney, 'Finney'),
      })
      .on('error', (error) => {
        console.log(error);
      })
      .on('receipt', (receipt) => {
        window.location.href =
          'http://localhost:3000?npc=' + receipt.contractAddress;
      });
  }
});
