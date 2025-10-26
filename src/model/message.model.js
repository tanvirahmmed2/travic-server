const mongoose= require('mongoose')

const messageSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    subject:{
        type: String,
        required: true,
        trim: true
    },
    message:{
        type: String,
        required: true,
        trim: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        trim: true
    },
})

const Message= mongoose.model('messages', messageSchema)
module.exports= Message