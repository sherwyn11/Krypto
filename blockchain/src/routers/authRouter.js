const express = require('express');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const User = require('../models/user');
require('../db/mongoose');

const router = new express.Router();

router.post('/auth/signup', async(req, res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const contact = req.body.contact;
        const password = req.body.password;
        
        const key = ec.genKeyPair();
        console.log(key)
        const publicKey = key.getPublic('hex').toString();

        const user = new User({
            name,
            email,
            contact,
            password,
            publicKey
        });

        await user.save();
        const token = await user.generateAuthToken();            

        res.status(200).send({
            msg: 'Saved Successfully!',
            token: token,
            publicKey: publicKey
        });
        
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
});


module.exports = router;