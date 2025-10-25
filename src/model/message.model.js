const mongoose= require('mongoose')

const messageSchema= new mongoose.Schema({

})

const Message= mongoose.model('messages', messageSchema)
module.exports= Message