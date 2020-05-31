const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email!');
            }
        }
    },
    contact: {
        type: String,
        trim: true,
        required: true,
        validate(value){
            if(value.length !== 10){
                throw new Error('Invalid Contact!');
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }],
    publicKey: {
        type: String,
    }
});

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    
    return userObject
}

userSchema.statics.findUserByCredentials = async(email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('No user found with submitted credentials');
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw new Error('No user found with submitted credentials');
    }

    return user;
}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const createdToken = jwt.sign({ publicKey: user.publicKey }, 'secret');
    user.tokens = user.tokens.concat({ token: createdToken });
    await user.save();
    
    return createdToken;
}

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;