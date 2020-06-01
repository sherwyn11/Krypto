const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
 
const key = ec.genKeyPair();
const pri = key.getPrivate('hex');
const pub = key.getPublic('hex');

// console.log(ec.keyFromPrivate(pri, 'hex'))
// console.log(ec.keyFromPublic(pub, 'hex'))


console.log(key.getPublic('hex'));
console.log(key.getPrivate('hex'));