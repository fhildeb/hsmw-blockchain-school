$(document).ready(function () {
    var account;
    if (typeof web3 !== "undefined") {
      $("#info").html("Ethereum Provider gefunden.<br><br>");
      web3 = new Web3(web3.currentProvider);
      // pruefung ob account verbunden
      web3.eth.getAccounts().then(function (accounts) {
        if (accounts.length > 0) {
          account = accounts[0];
          $("#info").append(" " + account + " mit Dapp verknüpft");
        } else {
          $("#info").append(
            '<span style="color:red"> Noch kein Account mit Dapp verknüpft. Melden Sie sich in Meta Mask an.</span>'
          );
        }
      });
    } else {
      $("#info").html(
        '<span style="color:red">Installieren Sie bitte das Meta Mask Plugin.</span>'
      );
    }
    $("#createSig").on("click", function () {
      $("#ticketinfo").html("");
      var value = new web3.utils.BN(
        web3.utils.toWei($("#value").val(), "finney")
      );
      var msg = web3.utils.soliditySha3(value);
      web3.eth.personal.sign(msg, account).then(function (sig) {
        var r = "0x" + sig.slice(2, 66);
        var s = "0x" + sig.slice(66, 130);
        var v = "0x" + sig.slice(130, 132);
        v = web3.utils.toDecimal(v);
        if (v == 0 || v == 1) v += 27;
        $("#ticketinfo").html(
          '<h3>Signatur:</h3>_h: <input type="text" size="64" value="' +
            msg +
            '"><br>_v: <input type="text" size="64" value="' +
            v +
            '"><br>_r: <input type="text" size="64" value="' +
            r +
            '"><br>_s: <input type="text" size="64" value="' +
            s +
            '"><br>_value (in Wei): <input type="text" size="50" value="' +
            value +
            '">'
        );
      });
    });
  });
  