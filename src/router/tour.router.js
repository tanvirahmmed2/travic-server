const express= require('express')
const { getTour, newTour, removeTour } = require('../controller/tour.controller')
const upload = require('../config/multer')
const tourRouter= express.Router()



tourRouter.get('/', getTour)
tourRouter.post('/new', upload.single('image'), newTour),
tourRouter.delete('/remove', removeTour)




module.exports= tourRouter