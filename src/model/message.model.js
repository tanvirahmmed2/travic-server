const mongoose= require('mongoose')

const messageSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
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
    },
})

const Message= mongoose.model('messages', messageSchema)
module.exports= Message