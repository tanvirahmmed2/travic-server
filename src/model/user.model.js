const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type: String, required: true, trim:true
    },
    email: {
        type: String, required: true, trim: true
    },
    password:{
        type: String, required: true, trim: true,
    },
    resetToken:{
        type: String, default: null, trim: true
    },
    tokenExpireAt:{
        type: Date, default: null, trim: true
    },
    saved:[
        {
            title: {type: String, trim: true},
            packageId: {type: String, trim: true},
        }
    ],
    order:[
        {
            title: {type: String, trim: true},
            packageId: {type: String, trim: true},
            payment:{type: String, trim: true},
        }
    ]
})

const User= mongoose.model('users', userSchema)
module.exports= User