const express = require('express');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const auth = require('../middleware/auth');
const Blockchain = require('../../blockchain-components/Blockchain');
const Transaction = require('../../blockchain-components/Transaction');
const User = require('../models/user');
require('../db/mongoose');

const blockchain = new Blockchain(2);
const router = new express.Router();

router.get('/api/get-blockchain', auth, async(req, res) => {

    // const blockchain = new Blockchain(2);

    try{
        ////////// Test //////////
        const key = ec.keyFromPrivate('11acb4073315d67e1b4267e86d844c727d343dfb86c4d51aa2344bedf5dc848c');
        const pub = key.getPublic('hex');
        const tx1 = new Transaction(pub, '04e7b55c1bfa3ecc08f629da01e5ee4d0e310b5f1c41cc48f77e1c0e4a445cf0be449905b552075b4848997268c05ed580243dedb1df4c93955905c6807d7d50d7', 10);
        tx1.signTxn(key);
        blockchain.addTxn(tx1);
        console.log('Started mining...')
        blockchain.minePendingTxns(pub);
        ////////// Test //////////


        console.log(blockchain.chain)
        res.status(200).send({ blockchain: blockchain.chain });
    }catch(e){
        console.log(e)
        res.status(500).send({e});
    }
});

router.get('/api/get-key', auth, (req, res) => {
    try{
        res.status(200).send({ publicKey: req.user.publicKey });
    }catch(e){
        console.log(e)
        res.status(500).send({e});
    }
});

router.post('/api/create-txn', auth, (req, res) => {
    try{
        const from_addr = req.body.my_addr;
        const to_addr = req.body.recv_addr;
        const amount = Number(req.body.amount);
        const tx = new Transaction(from_addr, to_addr, amount);
        console.log(tx)
        const key = ec.keyFromPublic(from_addr, 'hex');
        tx.signTxn(key);
        blockchain.addTxn(tx);

        console.log(blockchain.getPendingTxns());
        res.status(200).send({msg: 'Txn successful!'})
    }catch(e){
        console.log(e);
        res.status(500).send({e :'Error'})
    }
});

module.exports = router;