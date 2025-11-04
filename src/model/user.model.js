const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true
    },
    email: {
        type: String, required: true, trim: true
    },
    phone: {
        type: String, default: null, trim: true
    },
    password: {
        type: String, required: true, trim: true,
    },
    resetToken: {
        type: String, default: null, trim: true
    },
    tokenExpireAt: {
        type: Date, default: null, trim: true
    },
    address: {
        type: String, default: null, trim: true
    },
    role: {
        type: String, default: 'user', trim: true, enum: ['user', 'admin']
    },
    isBanned:{type: Boolean, default:false},
    saved: [
        {
            title: { type: String, trim: true },
            tourId: { type: String, trim: true },
        }
    ],
    order: [
        {
            title: { type: String, trim: true },
            tourId: { type: String, trim: true },
            payment: { type: String, trim: true },
        }
    ],
    
})

const User = mongoose.model('users', userSchema)
module.exports = User