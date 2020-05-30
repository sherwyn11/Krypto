const Block = require('./Block');
const SHA256 = require("crypto-js/sha256");
const Transaction = require('./Transaction');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Blockchain{
    constructor(difficulty){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
        this.pendingTxns = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block('30/05/2020', 'Genesis Block');
    }

    minePendingTxns(minerAddr){
        let block = new Block(Date.now(), this.pendingTxns);
        block.prevHash = this.getNewlyAddedBlock().hash;
        block.mineBlock(this.difficulty);
        this.chain.push(block);

        this.pendingTxns = [
            new Transaction(null, minerAddr, this.miningReward)
        ]
    }

    addTxn(transaction){
        if(!transaction.from || !transaction.to){
            throw new Error('Error: Invalid Txn!');
        }
        if(!transaction.isTxnValid()){
            throw new Error('Error: Invalid Txn!');
        }
        return this.pendingTxns.push(transaction)
    }

    getNewlyAddedBlock(){
        return this.chain[this.chain.length - 1];
    }

    getBalance(addr){
        var balance = 0;

        for(let i = 1; i < this.chain.length; i ++){
            const currentBlock = this.chain[i];
            for(const txn of currentBlock.transactions){
                if(txn.from == addr){
                    balance -= txn.amount;
                }
                if(txn.to == addr){
                    balance += txn.amount;
                }
            }
        }

        return balance;
    }

    isBlockchainValid(){
        for(let i = 1; i < this.chain.length; i ++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];
            // console.log('Saved hash', currentBlock.hash);
            // console.log('Current Block is: ',currentBlock)
            // console.log('Calculated hash', SHA256(currentBlock.timestamp + currentBlock.prevHash + JSON.stringify(currentBlock.transactions) + currentBlock.nonce).toString());
            if(prevBlock.hash !== currentBlock.prevHash){
                return false;
            }
            if(currentBlock.calculateBlockHash() !== currentBlock.hash){
                return false;
            }
            if(!currentBlock.checkValidityOfTxns){
                return false;
            }
        }
        return true;
    }
}

const key = ec.keyFromPrivate('11acb4073315d67e1b4267e86d844c727d343dfb86c4d51aa2344bedf5dc848c');
const pub = key.getPublic('hex');

var test = new Blockchain(2)
const tx1 = new Transaction(pub, '04e7b55c1bfa3ecc08f629da01e5ee4d0e310b5f1c41cc48f77e1c0e4a445cf0be449905b552075b4848997268c05ed580243dedb1df4c93955905c6807d7d50d7', 10);
tx1.signTxn(key);
test.addTxn(tx1);
console.log('Started mining...')
test.minePendingTxns(pub);
// console.log(test.getBalance(pub));
// test.minePendingTxns(pub);
// console.log(test.getBalance(pub));
console.log(test.isBlockchainValid());
// console.log(JSON.stringify(test.chain, null, 4));
test.chain[1].transactions[0].amount = 400;
console.log(JSON.stringify(test.chain, null, 4));

console.log(test.isBlockchainValid());

