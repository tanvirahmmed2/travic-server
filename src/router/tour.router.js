const express= require('express')
const { getTour, newTour, removeTour } = require('../controller/tour.controller')
const upload = require('../config/multer')
const { isLogin, isAdmin } = require('../middleware/Authenticator')
const tourRouter= express.Router()



tourRouter.get('/', getTour)
tourRouter.post('/new',isLogin, isAdmin, upload.single('image'), newTour),
tourRouter.delete('/remove',isLogin, isAdmin, removeTour)




module.exports= tourRouter