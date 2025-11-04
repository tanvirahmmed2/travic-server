const express= require('express')
const { getMessage, newMessage, removeMessage } = require('../controller/message.controller')
const { isLogin, isAdmin } = require('../middleware/Authenticator')
const messageRouter= express.Router()


messageRouter.get('/',isLogin, isAdmin, getMessage)
messageRouter.post('/newmessage', newMessage)
messageRouter.delete('/remove', isLogin, isAdmin, removeMessage)





module.exports= messageRouter