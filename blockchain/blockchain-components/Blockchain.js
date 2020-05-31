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
        return new Block(0, Date.now(), 'Genesis Block');
    }

    minePendingTxns(minerAddr){
        let newIndex = this.getNewlyAddedBlock().index + 1;
        let block = new Block(newIndex, Date.now(), this.pendingTxns);
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

    getPendingTxns(){
        return this.pendingTxns;
    }
}

module.exports = Blockchain;