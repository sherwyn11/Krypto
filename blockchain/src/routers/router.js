const express = require('express');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const auth = require('../middleware/auth');
const Blockchain = require('../../blockchain-components/Blockchain');
require('../db/mongoose');

const blockchain = new Blockchain();

const router = new express.Router();

router.get('/test', (req, res) => {
    res.status(200).send('Working!');
});

router.post('/signup', async(req, res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const contact = req.body.contact;
        const password = req.body.password;
        
        const key = ec.genKeyPair();
        const publicKey = key.getPublic();

        const user = new User({
            name,
            email,
            contact,
            password,
            publicKey
        });

        await user.save()
        const token = await user.generateAuthToken();            
        res.status(200).send('Data saved successfully!\n Token Generated: ' + token);
        
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router