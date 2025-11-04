const express= require('express')
const { getUser, registerUser, loginUser, saveTour, protectedUser, logoutUser, updateProfile } = require('../controller/user.controller')
const { isLogin } = require('../middleware/Authenticator')
const userRouter= express.Router()


userRouter.get('/', getUser)
userRouter.get('/protected', isLogin, protectedUser)
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/save',isLogin , saveTour)
userRouter.post('/logout', isLogin, logoutUser)
userRouter.post('/updateprofile', isLogin, updateProfile)





module.exports= userRouter