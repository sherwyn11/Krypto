import SHA256 from "crypto-js/sha256";
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

class Transaction{
    constructor(from, to, amount){
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.signature = '';
    }

    calculateHash(){
        return SHA256(this.from, this.to, this.amount).toString();
    }

    signTxn(key){
        if(this.from !== key.getPublic('hex')){
            throw new Error('Error: Cannot sign txn!')
        }
        const hashTx = this.calculateHash();
        const signature = key.sign(hashTx, 'base64');
        this.signature = signature.toDER('hex');
    }

    isTxnValid(){
        if(this.from === null){
            return true;
        }
        if(!this.signature || this.signature.length === 0){
            throw new Error('Error: Invalid txn!')
        }
        const publicKey = ec.keyFromPublic(this.from, 'hex');
        publicKey.verify(this.calculateHash(), this.signature);
        return true;
    }
}

export default Transaction;