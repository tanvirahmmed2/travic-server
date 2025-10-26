const express= require('express')
const { getMessage, newMessage, removeMessage } = require('../controller/message.controller')
const messageRouter= express.Router()


messageRouter.get('/', getMessage)
messageRouter.post('/newmessage', newMessage)
messageRouter.delete('/remove', removeMessage)





module.exports= messageRouter