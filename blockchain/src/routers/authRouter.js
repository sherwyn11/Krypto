const express = require('express');

const router = new express.Router();

router.post('/signup', async(req, res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const contact = req.body.contact;
        const password = req.body.password;
        
        const key = ec.genKeyPair();
        const publicKey = key.getPublic('hex');

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
        res.status(500).send(e);
    }
});


module.exports = router;