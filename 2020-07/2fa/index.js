var tfa = require('2fa');

var secret = '';
// lets generate a new key for a user
// tfa.generateKey(length (optional), cb)
tfa.generateKey(32, function(err, key) {
  secret = key;
  console.log(key);

  var counter = Math.floor(Date.now() / 1000 / 30);

  // generate a valid code (in real-life this will be user-input)
  var code = tfa.generateCode(secret, counter)

  console.log('code', code);

});
