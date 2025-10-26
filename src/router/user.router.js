const express= require('express')
const { getUser } = require('../controller/user.controller')
const userRouter= express.Router()


userRouter.get('/', getUser)





module.exports= userRouter