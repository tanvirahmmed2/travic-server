const express= require('express')
const { getMessage } = require('../controller/message.controller')
const messageRouter= express.Router()


messageRouter.get('/', getMessage)





module.exports= messageRouter