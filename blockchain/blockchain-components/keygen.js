const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
 
const key = ec.genKeyPair();

console.log(key.getPublic('hex'));
console.log(key.getPrivate('hex'));