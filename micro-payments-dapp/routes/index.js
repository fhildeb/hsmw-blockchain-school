var express = require('express');
var session = require('express-session');
var eutils = require('ethereumjs-util');

// database connection
var PS = require('./ps');
var ps = new PS();

// initialize the price for content id 1
ps.setPrice('c_1', '1');

var router = express.Router();
router.use(session({ secret: 'secret' }));

/* GET home page. */
router.get('/', async function (req, res, next) {
  // get session and hash of session ID
  var sess = req.session;
  var shash = eutils.bufferToHex(eutils.keccak(req.sessionID));

  // initialize variables
  var user;
  var loggedin = false;

  // initialize more variables
  var price = ps.getPrice('c_1');
  var payed = false;
  var hasChannel = false;

  // check if a logged out is requested
  if (req.query.l == 'true') {
    sess.destroy();
    res.render('index', { loggedout: true });
  } else {
    // check if user is logged in
    if (sess.user !== undefined) {
      loggedin = true;
      user = sess.user;
    } else {
      // if not logged in check if the signature and user trying to log in are valid
      if (req.query.s !== undefined && req.query.a !== undefined) {
        sigvals = eutils.fromRpcSig(req.query.s);
        prefixedMsg = eutils.keccak(
          Buffer.concat([
            eutils.toBuffer('\x19Ethereum Signed Message:\n32'),
            eutils.toBuffer(shash),
          ]),
        );
        signer = eutils.ecrecover(prefixedMsg, sigvals.v, sigvals.r, sigvals.s);
        signer = eutils.toChecksumAddress(
          eutils.bufferToHex(eutils.pubToAddress(signer)),
        );

        // log in the user
        if (req.query.a == signer) {
          sess.user = signer;
          loggedin = true;
          user = sess.user;
        }
      }
    }

    // if user is logged in or has logged in
    if (loggedin) {
      // check if a new channel is created
      if (req.query.npc !== undefined) {
        // add channel if not yet added
        if (ps.getChannel(user) == undefined) {
          await ps.setChannel(req.query.npc);
        }
      }

      // check if user has a channel
      hasChannel = ps.getChannel(user);

      // check if user has payed for content id 1
      payed = ps.payed('c_1', user);
    }

    res.render('index', {
      loggedin: loggedin,
      shash: shash,
      user: user,
      hasChannel: hasChannel,
      payed: payed,
      price: price,
    });
  }
});

/* POST Handler for payment functionality */
router.post('/', async function (req, res, next) {
  // get the signing account, signing value and signature from http request
  var account = req.body.account;
  var sig = req.body.sig;
  var value = req.body.value;

  // call the pay method in the database
  var result = await ps.pay('c_1', account, sig, value);

  // return the result of payment function
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ pay: result }));
});

module.exports = router;
