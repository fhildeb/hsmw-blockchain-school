var express = require('express');
var session = require('express-session');
var eutils = require('ethereumjs-util');
var PS = require('./ps');

var ps = new PS();

var router = express.Router();
// generate session
router.use(session({ secret: 'secret' }));

// TODO: Add your admin account address from MetaMask
var admin = '0x87E01F75d7aC18D6afeBA63192B6CBeB391a57A8';

/* GET home page. */
router.get('/', function (req, res, next) {
  // get session and hash of session ID
  var sess = req.session;
  var shash = eutils.bufferToHex(eutils.keccak(req.sessionID));

  var loggedin = false;
  var openChannels;
  var closedChannels;

  // check if a log out is requested
  if (req.query.l == 'true') {
    sess.destroy();
    res.render('users', { loggedout: true });
  } else {
    // check if user is logged in
    if (sess.admin == true) {
      loggedin = true;
    } else {
      // if not logged in check if the signature is valid and from admin account
      if (req.query.s !== undefined) {
        sigvals = eutils.fromRpcSig(req.query.s);
        prefixedMsg = eutils.keccak(
          Buffer.concat([
            Buffer.from('\x19Ethereum Signed Message:\n32', 'utf8'),
            eutils.toBuffer(shash),
          ]),
        );
        signer = eutils.ecrecover(prefixedMsg, sigvals.v, sigvals.r, sigvals.s);
        signer = eutils.toChecksumAddress(
          eutils.bufferToHex(eutils.pubToAddress(signer)),
        );

        // log in the admin
        if (signer == admin) {
          sess.admin = true;
          loggedin = true;
        }
      }
    }

    // if the admin is logged in load the open channels
    if (loggedin) {
      openChannels = ps.getOpenChannels();
      closedChannels = ps.getClosedChannels();
    }

    res.render('users', {
      shash: shash,
      loggedin: loggedin,
      openChannels: openChannels,
      closedChannels: closedChannels,
    });
  }
});

/* POST Handler for payment functionality */
router.post('/payrecipient', async function (req, res, next) {
  var user = req.body.user;
  //ToDo validate trx
  var trx = req.body.trx;

  ps.payRecipient(user);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({}));
});

module.exports = router;
