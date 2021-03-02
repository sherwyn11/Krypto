import SHA256 from "crypto-js/sha256";

class Block{
    constructor(index, timestamp, transactions){
        this.index = index
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateBlockHash();
        this.prevHash = 0;
        this.nonce = 0;
    }

    calculateBlockHash(){
        return SHA256(this.timestamp + this.prevHash + JSON.stringify(this.transactions) + this.nonce).toString()
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
            this.nonce += 1;
            this.hash = this.calculateBlockHash();
        }
        console.log('Block mined!');
    }

    checkValidityOfTxns(){
        for(const txn of this.transactions){
            if(!txn.isTxnValid){
                return false;
            }
        }
        return true;
    }
}

export default Block;
