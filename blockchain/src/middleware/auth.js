const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({'email': decodedToken.email, 'tokens.token': token})
        if(!user){
            throw new Error('No user found');
        }
        req.user = user;
        req.token = token;
        next();

    }catch(e){
        res.status(401).send('Unauthenticated user found! Please aunthenticate!')
    }
}

module.exports = auth;